import { defineStore } from "pinia";

export const useSettingsStore = defineStore({
  id: "settings",
  state: () => ({
    preferences: {
      themeDetect: {
        // theme auto-detection
        id: "preference-theme_detect",
        label: "Auto-detect theme preference",
        default: true,
      },
      themeSelected: {
        // currently selected theme
        id: "prererence-theme_selected",
        label: "Theme currently active",
        default: "light",
      },
      localStorageClear: {
        // calls localStorage.clear() when Crisp session is reset
        id: "preference-storage",
        label: "Clear localStorage on session reset",
        default: true,
      },
      gtmEnable: {
        // enable GTM when the app loads
        id: "preference-gtm_enable",
        label: "Enable Google Tag Manager",
        default: false,
      },
      gtmId: {
        // set GTM container ID
        id: "preference-gtm_id",
        label: "Set the GTM Container ID",
        desc: "GTM Container ID",
        default: "",
      },
      mainWebsite: {
        // set the sandbox's main website_id
        id: "preference-main_website",
        label: "Current main website: ",
        default: {
          id: "e93e073a-1f69-4cbc-8934-f9e1611e65bb",
          name: "Staging",
        },
      },
    },
    options: {
      sessionMerge: {
        // Enables session merge. Default: false
        id: "setting-merge",
        label: "Merge token ID session when logging in",
        default: true,
      },
      lockMaximized: {
        // Prevents chatbox from being closed. Default: false
        id: "setting-maximized",
        label: "Prevent chatbox from being closed",
        default: false,
      },
      lockFullview: {
        // Enforces chatbox fullscreen mode. Default: false
        id: "setting-fullview",
        label: "Enforce chatbox fullscreen mode",
        default: false,
      },
      safeMode: {
        // Enforces chatbox safe mode. Default: false
        id: "setting-safemode",
        label: "Activate the safeMode (no errors returned)",
        default: false,
      },
      cookieExpire: {
        // Enforces a custom expire time for Cookie storage. Default: null
        id: "setting-cookie",
        desc: "Cookie expiration timer",
        label: "Set Cookie expiration date (default is 6 months)",
        default: null,
      },
      locale: {
        // Sets a custom locale (en, fr, de, ...) Default: null
        id: "setting-locale",
        desc: "Chatbox locale",
        label: "Set chatbox language",
        default: null,
        languages: {
          "Auto-detect": null,
          Afrikaans: "af",
          Arabic: "ar",
          "Arabic (United Arab Emirates)": "ar-AE",
          "Arabic (Saudi Arabia)": "ar-SA",
          "Arabic (Yemen)": "ar-YE",
          Armenian: "hy",
          Azerbaijani: "az",
          Basque: "eu",
          Bengali: "bn",
          Bulgarian: "bg",
          Catalan: "ca",
          "Chinese (Simplified)": "zh-CN",
          "Chinese (Traditional)": "zh-TW",
          "Chinese (Hong-Kong)": "zh-HK",
          Croatian: "hr",
          Czech: "cs",
          Danish: "da",
          Dutch: "nl",
          "Dutch (Belgium)": "nl-BE",
          English: "en",
          Esperanto: "eo",
          Estonian: "et",
          Faroese: "fo",
          Finnish: "fi",
          French: "fr",
          Georgian: "ka",
          German: "de",
          Greek: "el",
          Gujarati: "gu",
          Hebrew: "he",
          Hindi: "hi",
          Hungarian: "hu",
          Icelandic: "is",
          Indonesian: "id",
          Italian: "it",
          Japanese: "ja",
          Korean: "ko",
          Latvian: "lv",
          Lithuanian: "lt",
          Malay: "ms",
          Malayalam: "ml",
          Mongolian: "mn",
          Nepali: "ne",
          Norwegian: "no",
          Pashto: "ps",
          Persian: "fa",
          Polish: "pl",
          Portuguese: "pt",
          "Portuguese (Brazil)": "pt-BR",
          Romanian: "ro",
          Russian: "ru",
          Serbian: "sr",
          "Serbian (Cyrilic)": "sr-Cyrl",
          Slovak: "sk",
          Slovenian: "sl",
          Spanish: "es",
          Swedish: "sv",
          Thai: "th",
          Tamil: "ta",
          Turkish: "tr",
          Ukrainian: "uk",
          Vietnamese: "vi",
        },
      },
    },
    callbacks: {
      onSessionLoaded: {
        // Executed once the Crisp session is loaded
        id: "callback-session-loaded",
        label: "Console callback on session loaded",
        default: false,
      },
      onChatInitiated: {
        // Executed once the chat was initiated from the user
        id: "callback-chat-initiated",
        label: "Console callback on chat initiated",
        default: false,
      },
      onChatOpened: {
        // Executed once the chat was opened
        id: "callback-chat-opened",
        label: "Console callback on chat opened",
        default: false,
      },
      onChatClosed: {
        // Executed once the chat was closed
        id: "callback-chat-closed",
        label: "Console callback on chat closed",
        default: false,
      },
      onMessageSent: {
        // Executed once a message is submitted by the visitor
        id: "callback-message-sent",
        label: "Console callback on message sent",
        default: false,
      },
      onMessageReceived: {
        // Executed once a message is received by the visitor
        id: "callback-message-received",
        label: "Console callback on message received",
        default: false,
      },
      onNicknameChanged: {
        // Executed once user's nickname is changed
        id: "callback-nickname-changed",
        label: "Console callback on nickname changed",
        default: false,
      },
      onEmailChanged: {
        // Executed once user's email is changed
        id: "callback-email-changed",
        label: "Console callback on email changed",
        default: false,
      },
      onPhoneChanged: {
        // Executed once user's phone is changed
        id: "callback-phone-changed",
        label: "Console callback on phone changed",
        default: false,
      },
      onAvatarChanged: {
        // Executed once user's avatar is changed
        id: "callback-avatar-changed",
        label: "Console callback on avatar changed",
        default: false,
      },
      onMessageComposeSent: {
        // Executed once a message compose event is submitted by the visitor
        id: "callback-compose-sent",
        label: "Console callback on message compose sent",
        default: false,
      },
      onMessageComposeReceived: {
        // Executed once a message compose event is received by the visitor
        id: "callback-compose-received",
        label: "Console callback on message compose received",
        default: false,
      },
      onWebsiteAvailabilityChanged: {
        // Executed once the website's availability has changed
        id: "callback-availability-changed",
        label: "Console callback on website availability changed",
        default: false,
      },
      onHelpdeskQueried: {
        // Executed once a helpdesk search has been queried by the visitor
        id: "callback-helpdesk-queried",
        label: "Console callback on helpdesk search queried",
        default: false,
      },
    },
  }),

  getters: {
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
        `App error [useSettingsStore]: Setting ${setting} does not exist.`
      );
      return undefined;
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
  },
});
