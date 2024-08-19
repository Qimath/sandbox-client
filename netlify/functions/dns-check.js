import dns from "dns/promises";

class DnsChecker {
  constructor(domain, websiteId, requiredRecords) {
    this.domain = domain;
    this.websiteId = websiteId;
    this.requiredRecords = requiredRecords;
    this.retrievedRecords = {};
    this.hasIssues = false;
    this.results = [];
  }

  async resolve() {
    try {
      const recordPromises = this.requiredRecords.map((record) =>
        this.processRecord(record)
      );
      await Promise.all(recordPromises);
    } catch (error) {
      console.error("Error resolving DNS records:", error);
    }

    this.evaluateResults();
    this.sortResults();
    return this.generateResponse();
  }

  async processRecord(record) {
    const targets = this.getTargetsToCheck(record);
    for (const target of targets) {
      let addresses = await this.resolveDns(target, record.type);
      if (this.isValidRecord(addresses)) {
        this.storeRecord(record.name, target, record.type, addresses);
        return;
      }

      // DMARC fallback: Check TXT record if CNAME is not found
      if (
        record.name === "dmarc-cname" &&
        this.isDmarcFallbackNeeded(addresses)
      ) {
        addresses = await this.resolveDns(target, "TXT");
        if (this.isValidRecord(addresses) && this.isDmarcTxtValid(addresses)) {
          this.storeRecord(record.name, target, "TXT", addresses);
          return;
        }
      }
    }
    this.storeRecord(record.name, targets[0], record.type, ["No record found"]);
  }

  getTargetsToCheck(record) {
    const baseTarget = record.target
      ? `${record.target}.${this.domain}`
      : this.domain;
    const targets = [baseTarget];

    if (record.name === "dmarc-cname") {
      const orgDomain = this.getOrganizationalDomain();
      if (orgDomain)
        targets.push(
          record.target ? `${record.target}.${orgDomain}` : orgDomain
        );
    }

    if (record.name === "caa") {
      const subDomains = this.getSubDomains();
      targets.push(...subDomains);
    }

    return targets;
  }

  getOrganizationalDomain() {
    const parts = this.domain.split(".");
    return parts.length > 2 ? parts.slice(-2).join(".") : null;
  }

  getSubDomains() {
    const parts = this.domain.split(".");
    return parts.map((_, i) => parts.slice(i).join(".")).slice(1);
  }

  async resolveDns(domain, type) {
    try {
      return await dns.resolve(domain, type);
    } catch (err) {
      return err.code === "ENOTFOUND" || err.code === "ENODATA"
        ? ["No record found"]
        : Promise.reject(err);
    }
  }

  isValidRecord(addresses) {
    return (
      addresses && addresses.length > 0 && addresses[0] !== "No record found"
    );
  }

  isDmarcFallbackNeeded(addresses) {
    return addresses.includes("No record found");
  }

  isDmarcTxtValid(addresses) {
    return addresses.some((address) => /^v=DMARC1/.test(address));
  }

  storeRecord(name, location, type, values) {
    if (!this.retrievedRecords[name]) {
      this.retrievedRecords[name] = [];
    }
    const formattedValues = this.formatRecordValues(type, values);
    formattedValues.forEach((value) => {
      if (location) {
        this.retrievedRecords[name].push({ location, type, value });
      } else {
        console.error(
          `Undefined location for record: ${name}, ${type}, ${value}`
        );
      }
    });
  }

  formatRecordValues(type, values) {
    return values.map((value) => {
      if (Array.isArray(value)) return value.join(" ");
      if (typeof value === "object") return this.formatObjectValue(type, value);
      return value;
    });
  }

  formatObjectValue(type, value) {
    if (type === "MX") return `${value.priority} ${value.exchange}`;
    if (type === "CAA") return this.formatCaaValue(value);
    return value;
  }

  formatCaaValue(value) {
    const critical =
      value.critical !== undefined ? value.critical : "undefined";
    const tag = value.issue
      ? "issue"
      : value.issuewild
      ? "issuewild"
      : "undefined";
    const recordValue = value.issue || value.issuewild || "undefined";
    return `${critical} ${tag} "${recordValue}"`;
  }

  evaluateResults() {
    this.requiredRecords.forEach((record) => {
      const retrieved = this.retrievedRecords[record.name] || [];
      const match = this.evaluateRecord(record, retrieved);
      this.results.push(match);
      if (!match.found) this.hasIssues = true;
    });
  }

  evaluateRecord(record, retrieved) {
    if (record.type === "MX") {
      return this.evaluateMxRecord(record, retrieved);
    } else if (record.name === "caa") {
      return this.evaluateCaaRecord(record, retrieved);
    } else {
      return this.evaluateGenericRecord(record, retrieved);
    }
  }

  evaluateMxRecord(record, retrieved) {
    const expectedMatch = retrieved.find((r) =>
      record.regex.test(r.value.split(" ")[1])
    );
    if (!expectedMatch) return this.createResult(false, record, retrieved);

    const expectedPriority = parseInt(expectedMatch.value.split(" ")[0], 10);
    const higherPriorityExists = retrieved.some((r) => {
      const priority = parseInt(r.value.split(" ")[0], 10);
      return (
        priority < expectedPriority && !record.regex.test(r.value.split(" ")[1])
      );
    });

    return this.createResult(!higherPriorityExists, record, retrieved);
  }

  evaluateCaaRecord(record, retrieved) {
    const unrestricted =
      retrieved.length === 0 ||
      retrieved.every((r) => r.value === "No record found");
    const match =
      unrestricted || retrieved.some((r) => record.regex.test(r.value));
    return this.createResult(match, record, retrieved);
  }

  evaluateGenericRecord(record, retrieved) {
    let match = retrieved.find((r) => record.regex.test(r.value));
    if (!match && record.name === "dmarc-cname") {
      match = retrieved.find(
        (r) => r.type === "TXT" && /^v=DMARC1/.test(r.value)
      );
    }
    return this.createResult(!!match, record, retrieved);
  }

  createResult(found, record, retrieved) {
    return {
      found,
      expected: {
        type: record.type,
        target: record.target ? `${record.target}.${this.domain}` : this.domain,
        value: record.expect,
      },
      retrieved: retrieved.map((r) => ({
        type: r.type,
        target: r.location || "undefined target",
        value: r.value,
      })),
    };
  }

  sortResults() {
    const order = ["TXT", "CNAME", "MX", "CAA"];
    this.results.sort(
      (a, b) => order.indexOf(a.expected.type) - order.indexOf(b.expected.type)
    );
  }

  generateResponse() {
    return {
      success: !this.hasIssues,
      data: this.results,
    };
  }
}

// Subclasses for each DNS type

class StatusDns extends DnsChecker {
  constructor(domain, websiteId) {
    super(domain, websiteId, [
      {
        name: "website-id",
        type: "TXT",
        target: "_crisp",
        expect: `crisp-website-id=${websiteId}`,
        regex: new RegExp(`^crisp-website-id=${websiteId}$`),
      },
      {
        name: "status-cname",
        type: "CNAME",
        target: "",
        expect: "custom.crisp.watch.",
        regex: new RegExp(`^custom\\.crisp\\.watch\\.?$`),
      },
      {
        name: "caa",
        type: "CAA",
        target: "",
        expect: 'issue "letsencrypt.org"',
        regex: new RegExp('issue "letsencrypt.org"'),
      },
    ]);
  }
}

class HelpdeskDns extends DnsChecker {
  constructor(domain, websiteId) {
    super(domain, websiteId, [
      {
        name: "website-id",
        type: "TXT",
        target: "_crisp",
        expect: `crisp-website-id=${websiteId}`,
        regex: new RegExp(`^crisp-website-id=${websiteId}$`),
      },
      {
        name: "status-cname",
        type: "CNAME",
        target: "",
        expect: "custom.crisp.help.",
        regex: new RegExp(`^custom\\.crisp\\.help\\.?$`),
      },
      {
        name: "caa",
        type: "CAA",
        target: "",
        expect: 'issue "letsencrypt.org"',
        regex: new RegExp('issue "letsencrypt.org"'),
      },
    ]);
  }
}

class EmailDns extends DnsChecker {
  constructor(domain, websiteId) {
    super(domain, websiteId, [
      {
        name: "email-id",
        type: "TXT",
        target: "_crisp",
        expect: `crisp-website-id=${websiteId}`,
        regex: new RegExp(`^crisp-website-id=${websiteId}$`),
      },
      {
        name: "spf",
        type: "TXT",
        target: "",
        expect: "v=spf1 redirect=_spf.crisp.email",
        regex: new RegExp(`^v=spf1 redirect=_spf\\.crisp\\.email$`),
      },
      {
        name: "mx",
        type: "MX",
        target: "",
        expect: "inbound.crisp.email.",
        regex: new RegExp(`^inbound\\.crisp\\.email\\.?$`),
      },
      {
        name: "dmarc-cname",
        type: "CNAME", // Start with CNAME, fallback to TXT in resolveRecord
        target: "_dmarc",
        expect: "_dmarc.crisp.email.",
        regex: new RegExp(`^_dmarc\\.crisp\\.email\\.?$`),
      },
      {
        name: "dkim",
        type: "CNAME",
        target: "crisp._domainkey",
        expect: "crisp._domainkey.crisp.email.",
        regex: new RegExp(`^crisp\\._domainkey\\.crisp\\.email\\.?$`),
      },
      {
        name: "links-cname",
        type: "CNAME",
        target: "links",
        expect: "links.custom.crisp.email.",
        regex: new RegExp(`^links\\.custom\\.crisp\\.email\\.?$`),
      },
      {
        name: "caa",
        type: "CAA",
        target: "",
        expect: 'issue "letsencrypt.org"',
        regex: new RegExp('issue "letsencrypt.org"'),
      },
    ]);
  }
}

export async function handler(event, context) {
  try {
    const { domain, websiteId, type } = JSON.parse(event.body);

    if (!domain || !websiteId || !type) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Missing domain, websiteId, or type in the request body",
        }),
      };
    }

    let dnsChecker;
    switch (type) {
      case "status":
        dnsChecker = new StatusDns(domain, websiteId);
        break;
      case "helpdesk":
        dnsChecker = new HelpdeskDns(domain, websiteId);
        break;
      case "email":
        dnsChecker = new EmailDns(domain, websiteId);
        break;
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ error: `Invalid type: ${type}` }),
        };
    }

    const results = await dnsChecker.resolve();
    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } catch (err) {
    console.error("Error in request processing:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Request processing error: " + err.message,
      }),
    };
  }
}
