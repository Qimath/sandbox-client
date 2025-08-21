import { watch } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    account: {
      login: null,
      provider: "",
      id: "N/A",
      nickname: "N/A",
      email: "N/A",
      avatar: window.location.origin + "/images/avatars/profile.jpg",
    },
    options: {
      autoload: true,
      tokenId: null,
      locale: null,
      sessionMerge: false,
      cookieDomain: null,
      cookieExpire: null,
      lockMaximized: false,
      lockFullview: false,
      safeMode: false,
      clientUrl: "https://client.crisp.chat/l.js",
    },
    preferences: {
      themeDetect: false,
      themeSelected: "light",
      localStorageClear: false,
      gtmEnable: false,
      gtmId: "",
      mainWebsite: {
        id: "e93e073a-1f69-4cbc-8934-f9e1611e65bb",
        name: "Staging",
      },
    },
    callbacks: {
      onSessionLoaded: false,
      onChatInitiated: false,
      onChatOpened: false,
      onChatClosed: false,
      onMessageSent: false,
      onMessageReceived: false,
      onNicknameChanged: false,
      onEmailChanged: false,
      onPhoneChanged: false,
      onAvatarChanged: false,
      onMessageComposeSent: false,
      onMessageComposeReceived: false,
      onWebsiteAvailabilityChanged: false,
      onHelpdeskQueried: false,
    },
  }),

  getters: {
    getAccount: (state) => () => {
      return state.account;
    },
    getPreferences: (state) => () => {
      return state.preferences;
    },
    getOptions: (state) => () => {
      return state.options;
    },
    getCallbacks: (state) => () => {
      return state.callbacks;
    },
    getSetting: (state) => (setting) => {
      if (state.options.hasOwnProperty(setting)) {
        return state.options[setting];
      }
      if (state.preferences.hasOwnProperty(setting)) {
        return state.preferences[setting];
      }
      if (state.callbacks.hasOwnProperty(setting)) {
        return state.callbacks[setting];
      }
      console.error(
        `App error [useUserStore]: Setting ${setting} does not exist.`
      );
      return undefined;
    },
  },
  actions: {
    setAccount(key, value) {
      this.account[key] = value;
    },
    setMainWebsite(id, name) {
      this.websites.main = { id, name };
    },
    setSetting(setting, value) {
      if (setting in this.options) {
        this.options[setting] = value;
      } else if (setting in this.preferences) {
        this.preferences[setting] = value;
      } else if (setting in this.callbacks) {
        this.callbacks[setting] = value;
      } else {
        console.error(
          `App error [useUserStore]: Setting ${setting} does not exist.`
        );
        throw new Error(`Setting ${setting} does not exist.`);
      }
    },
    async initializeStore() {
      // Load settings from localStorage if present
      const storedOptions = localStorage.getItem("user_options");
      const storedPreferences = localStorage.getItem("user_preferences");
      const storedCallbacks = localStorage.getItem("user_callbacks");

      if (storedOptions) {
        try {
          this.options = { ...this.options, ...JSON.parse(storedOptions) };
        } catch (e) {}
      }
      if (storedPreferences) {
        try {
          this.preferences = {
            ...this.preferences,
            ...JSON.parse(storedPreferences),
          };
        } catch (e) {}
      }
      if (storedCallbacks) {
        try {
          this.callbacks = {
            ...this.callbacks,
            ...JSON.parse(storedCallbacks),
          };
        } catch (e) {}
      }

      // Watch and persist changes to localStorage
      watch(
        () => this.options,
        (val) => {
          localStorage.setItem("user_options", JSON.stringify(val));
        },
        { deep: true }
      );
      watch(
        () => this.preferences,
        (val) => {
          localStorage.setItem("user_preferences", JSON.stringify(val));
        },
        { deep: true }
      );
      watch(
        () => this.callbacks,
        (val) => {
          localStorage.setItem("user_callbacks", JSON.stringify(val));
        },
        { deep: true }
      );
    },
  },
});
