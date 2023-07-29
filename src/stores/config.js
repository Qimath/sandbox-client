import { watch } from "vue";
import { defineStore } from "pinia";

export const useConfigStore = defineStore({
  id: "config",
  state: () => ({
    id: "e93e073a-1f69-4cbc-8934-f9e1611e65bb",
    validity: null,
    cache: {
      secrets: {
        "e93e073a-1f69-4cbc-8934-f9e1611e65bb": {
          email: "fb022812aab8a23f1e944a74015ba827",
          ticket:
            "ab38ebbe00272af93805b3e0bc84467308872044c28af2508546fe631f8e0540",
        },
      },
      websites: [],
    },
    config: {
      website: "N/A",
      domain: "N/A",
      mailer: "N/A",
      settings: {
        logo: "https://i.pinimg.com/originals/5d/81/48/5d8148b9fb894dcbd46614312066b236.jpg",
        rating: null,
        transcript: null,
        enrich: null,
        junk_filter: null,
        tile: "N/A",
        wait_game: null,
        last_operator_face: null,
        ongoing_operator_face: null,
        activity_metrics: null,
        operator_privacy: null,
        availability_tooltip: null,
        hide_vacation: null,
        hide_on_away: null,
        hide_on_mobile: null,
        position_reverse: null,
        email_visitors: null,
        phone_visitors: null,
        force_identify: null,
        ignore_privacy: null,
        visitor_compose: null,
        file_transfer: null,
        helpdesk_link: null,
        helpdesk_only: null,
        status_health_dead: null,
        check_domain: null,
        color_theme: "N/A",
        text_theme: "default",
        welcome_message: "default",
        locale: "N/A",
        allowed_pages: ["N/A"],
        blocked_pages: ["N/A"],
        blocked_countries: ["N/A"],
        blocked_locales: ["N/A"],
        blocked_ips: ["N/A"],
      },
      operators: {},
      plugins: {},
      online: null,
      trial: null,
      channels: {
        email: "N/A",
        phone: "N/A",
        messenger: "N/A",
        telegram: "N/A",
        twitter: "N/A",
        whatsapp: "N/A",
        instagram: "N/A",
        helpdesk: "N/A",
        status: "N/A",
      },
    },
  }),

  getters: {
    getWebsiteId: (state) => {
      return state.id;
    },
    getWebsiteValidity: (state) => {
      return state.validity;
    },
    getCachedSecrets: (state) => (id) => {
      return state.cache.secrets[id];
    },
    getCachedWebsites: (state) => () => {
      return state.cache.websites;
    },
    getConfig: (state) => {
      return state.config;
    },
  },

  actions: {
    setWebsiteId(value) {
      this.id = value;
    },
    setWebsiteValidity(value) {
      this.validity = value;
    },
    setSecrets(id, email, ticket) {
      if (this.cache.secrets[id]) {
        this.cache.secrets[id] = {
          ...this.cache.secrets[id],
          email,
          ticket,
        };
      } else {
        this.cache.secrets[id] = { email, ticket };
      }
    },
    setCachedWebsites() {
      const websiteId = this.id;
      const websiteName = this.config.website;

      const existingWebsiteIndex = this.cache.websites.findIndex(
        (website) => website.id === websiteId
      );

      if (existingWebsiteIndex !== -1) {
        this.cache.websites.splice(existingWebsiteIndex, 1);
      } else if (this.cache.websites.length === 5) {
        this.cache.websites.pop();
      }

      this.cache.websites.unshift({ id: websiteId, name: websiteName });
    },
    setWebsiteConfig(configData) {
      const deepMerge = (target, source) => {
        if (source && typeof source === "object") {
          for (const key in source) {
            const sourceValue = source[key];
            if (
              sourceValue !== null &&
              sourceValue !== undefined &&
              sourceValue !== ""
            ) {
              if (
                typeof sourceValue !== "object" ||
                Array.isArray(sourceValue)
              ) {
                target[key] = sourceValue;
              } else {
                if (!target[key] || typeof target[key] !== "object") {
                  target[key] = {};
                }
                deepMerge(target[key], sourceValue);
              }
            }
          }
        }
        return target;
      };

      this.config = deepMerge(this.config, configData);
    },
    setWebsiteValidity(value) {
      this.validity = value;
    },
    delSecrets() {
      this.cache.secrets = {};
    },
    delCachedWebsite(id) {
      const websiteIndex = this.cache.websites.findIndex(
        (website) => website.id === id
      );

      if (websiteIndex !== -1) {
        this.cache.websites.splice(websiteIndex, 1);
      }
    },
    initializeStore() {
      // Load data from localStorage
      const websiteId = localStorage.getItem("website_id");
      const websiteCache = localStorage.getItem("website_cache");

      if (websiteId) {
        this.id = websiteId;
      }

      if (websiteCache) {
        this.cache = JSON.parse(websiteCache);
      }

      // Set up watchers to sync changes back to localStorage
      watch(
        () => this.id,
        (newId) => {
          localStorage.setItem("website_id", newId);
        }
      );

      watch(
        () => this.cache,
        (newCache) => {
          localStorage.setItem("website_cache", JSON.stringify(newCache));
        },
        { deep: true }
      );
    },
  },
});
