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
      await Promise.all(
        this.requiredRecords.map((record) => this.resolveRecord(record))
      );
    } catch (error) {
      console.error("Error resolving DNS records:", error);
    }
    this.compareRecords();
    this.sortResults();
    return {
      success: !this.hasIssues,
      data: this.results,
    };
  }

  async resolveRecord(record) {
    const targetsToCheck = [];

    targetsToCheck.push(
      record.target ? `${record.target}.${this.domain}` : this.domain
    );

    if (record.name === "dmarc-cname" || record.name === "spf") {
      const parts = this.domain.split(".");
      if (parts.length > 2) {
        const organizationalDomain = parts.slice(-2).join(".");
        if (record.target) {
          targetsToCheck.push(`${record.target}.${organizationalDomain}`);
        } else {
          targetsToCheck.push(organizationalDomain);
        }
      }
    }

    let addresses = [];
    for (const targetDomain of targetsToCheck) {
      addresses = await this.resolveDns(targetDomain, record.type);
      if (
        addresses &&
        addresses.length > 0 &&
        addresses[0] !== "No record found"
      ) {
        this.addRecord(record.name, targetDomain, record.type, addresses);
        return;
      }

      if (
        record.name === "dmarc-cname" &&
        addresses.includes("No record found")
      ) {
        addresses = await this.resolveDns(targetDomain, "TXT");
        if (
          addresses &&
          addresses.length > 0 &&
          addresses[0] !== "No record found"
        ) {
          record.type = "TXT";
          this.addRecord(record.name, targetDomain, "TXT", addresses);
          return;
        }
      }
    }

    this.addRecord(record.name, targetsToCheck[0], record.type, [
      "No record found",
    ]);
  }

  resolveDns(domain, type) {
    return dns.resolve(domain, type).catch((err) => {
      if (err.code === "ENOTFOUND" || err.code === "ENODATA") {
        return ["No record found"];
      }
      throw err;
    });
  }

  addRecord(name, location, type, values) {
    if (!this.retrievedRecords[name]) {
      this.retrievedRecords[name] = [];
    }

    const formattedValues = values.map((value) => {
      if (Array.isArray(value)) return value.join(" ");
      if (typeof value === "object" && type === "MX")
        return `${value.priority} ${value.exchange}`;
      return value;
    });

    formattedValues.forEach((value) => {
      if (location) {
        this.retrievedRecords[name].push({ location, type, value });
      } else {
        console.error(
          `Attempted to add a record with an undefined location (target): ${name}, ${type}, ${value}`
        );
      }
    });
  }

  compareRecords() {
    this.requiredRecords.forEach((record) => {
      const retrieved = this.retrievedRecords[record.name] || [];
      let match = retrieved.find((r) =>
        record.type === "MX"
          ? record.regex.test(r.value.split(" ")[1])
          : record.regex.test(r.value)
      );

      if (!match && record.name === "dmarc-cname") {
        match = retrieved.find(
          (r) => r.type === "TXT" && /^v=DMARC1/.test(r.value)
        );
        if (match) {
          this.results.push({
            found: true,
            expected: {
              type: "CNAME",
              target: record.target
                ? `${record.target}.${this.domain}`
                : this.domain,
              value: record.expect,
            },
            retrieved: [
              {
                type: "TXT",
                target: match.location,
                value: match.value,
              },
            ],
          });
          return;
        }
      }

      if (!match) {
        this.results.push({
          found: false,
          expected: {
            type: record.type,
            target: record.target
              ? `${record.target}.${this.domain}`
              : this.domain,
            value: record.expect,
          },
          retrieved: retrieved.map((r) => ({
            type: r.type,
            target: r.location || "undefined target",
            value: r.value,
          })),
        });
        this.hasIssues = true;
      } else {
        this.results.push({
          found: true,
          expected: {
            type: record.type,
            target: record.target
              ? `${record.target}.${this.domain}`
              : this.domain,
            value: record.expect,
          },
          retrieved: retrieved.map((r) => ({
            type: r.type,
            target: r.location || "undefined target",
            value: r.value,
          })),
        });
      }
    });
  }

  sortResults() {
    const order = ["TXT", "CNAME", "MX"];
    this.results.sort(
      (a, b) => order.indexOf(a.expected.type) - order.indexOf(b.expected.type)
    );
  }
}

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

    const dnsClasses = {
      status: StatusDns,
      helpdesk: HelpdeskDns,
      email: EmailDns,
    };
    const DnsClass = dnsClasses[type];

    if (!DnsClass) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Invalid type: ${type}` }),
      };
    }

    const dnsChecker = new DnsClass(domain, websiteId);
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
