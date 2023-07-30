import { watch } from "vue";
import { defineStore } from "pinia";
import { getUser, syncUserSettings } from "@/hooks/identity.js";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    account: {
      login: null,
      id: "N/A",
      nickname: "N/A",
      email: "N/A",
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
      localStorageClear: true,
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
      const user = getUser();

      const syncLocalStorage = (newTheme) => {
        localStorage.setItem("theme", newTheme);
      };

      if (user) {
        // populate store with identity storage when the app loads
        const user_metadata = user.user_metadata || {};

        this.account.login = true;
        this.account.id = user.id;
        this.account.email = user.email;
        this.account.nickname =
          user_metadata.account && user_metadata.account.nickname
            ? user_metadata.account.nickname
            : "N/A";

        this.options = user_metadata.options
          ? { ...this.options, ...user_metadata.options }
          : this.options;
        this.preferences = user_metadata.preferences
          ? { ...this.preferences, ...user_metadata.preferences }
          : this.preferences;
        this.callbacks = user_metadata.callbacks
          ? { ...this.callbacks, ...user_metadata.callbacks }
          : this.callbacks;

        // synch identity storage whenever store states are updated
        watch(() => this.options, syncUserSettings, { deep: true });
        watch(() => this.preferences, syncUserSettings, { deep: true });
        watch(() => this.callbacks, syncUserSettings, { deep: true });
      } else {
        this.account.login = false;

        // Pull themeSelected from localStorage if user isn't authenticated
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
          this.preferences.themeSelected = storedTheme;
        }

        // Set themeSelected in localStorage whenever it is updated
        watch(() => this.preferences.themeSelected, syncLocalStorage, {
          deep: true,
        });
      }
    },
  },
});
