import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    account: {
      email: '',
      appToken: ''
    },
    preferences: {
      themeDetect: {
        id: 'preference-theme',
        label: 'Auto-detect theme preference',
        value: false
      },
      themeSelected: {
        id: 'selected-theme',
        value: 'light'
      },
      localStorageClear: {
        id: 'preference-storage',
        label: 'Clear localStorage on session reset',
        value: true
      },
      gtm: {
        id: 'preference-gtm',
        label: 'Enable Google Tag Manager',
        value: true
      }
    },
    settings: {
      sessionMerge: {
        id: 'setting-merge',
        label: 'Merge token ID session when logging in',
        value: true
      },
      lockMaximized: {
        id: 'setting-maximized',
        label: 'Prevent chatbox from being closed',
        value: false
      },
      lockFullview: {
        id: 'setting-fullview',
        label: 'Enforce chatbox fullscreen mode',
        value: false
      },
      safeMode: {
        id: 'setting-safemode',
        label: 'Activate the safeMode (no errors returned)',
        value: false
      },
      cookieExpire: {
        id: 'setting-cookie',
        name: 'Cookie expiration timer',
        label: 'Set Cookie expiration date (default is 6 months)',
        value: null
      },
      locale: {
        id: 'setting-locale',
        name: 'Chatbox locale',
        label: 'Set chatbox language',
        value: null,
        options: {
          'Auto-detect': null,
          Afrikaans: 'af',
          Arabic: 'ar',
          'Arabic (United Arab Emirates)': 'ar-AE',
          'Arabic (Saudi Arabia)': 'ar-SA',
          'Arabic (Yemen)': 'ar-YE',
          Armenian: 'hy',
          Azerbaijani: 'az',
          Basque: 'eu',
          Bengali: 'bn',
          Bulgarian: 'bg',
          Catalan: 'ca',
          'Chinese (Simplified)': 'zh-CN',
          'Chinese (Traditional)': 'zh-TW',
          'Chinese (Hong-Kong)': 'zh-HK',
          Croatian: 'hr',
          Czech: 'cs',
          Danish: 'da',
          Dutch: 'nl',
          'Dutch (Belgium)': 'nl-BE',
          English: 'en',
          Esperanto: 'eo',
          Estonian: 'et',
          Faroese: 'fo',
          Finnish: 'fi',
          French: 'fr',
          Georgian: 'ka',
          German: 'de',
          Greek: 'el',
          Gujarati: 'gu',
          Hebrew: 'he',
          Hindi: 'hi',
          Hungarian: 'hu',
          Icelandic: 'is',
          Indonesian: 'id',
          Italian: 'it',
          Japanese: 'ja',
          Korean: 'ko',
          Latvian: 'lv',
          Lithuanian: 'lt',
          Malay: 'ms',
          Malayalam: 'ml',
          Mongolian: 'mn',
          Nepali: 'ne',
          Norwegian: 'no',
          Pashto: 'ps',
          Persian: 'fa',
          Polish: 'pl',
          Portuguese: 'pt',
          'Portuguese (Brazil)': 'pt-BR',
          Romanian: 'ro',
          Russian: 'ru',
          Serbian: 'sr',
          'Serbian (Cyrilic)': 'sr-Cyrl',
          Slovak: 'sk',
          Slovenian: 'sl',
          Spanish: 'es',
          Swedish: 'sv',
          Thai: 'th',
          Tamil: 'ta',
          Turkish: 'tr',
          Ukrainian: 'uk',
          Vietnamese: 'vi'
        }
      }
    },
    callbacks: {
      onSessionLoaded: {
        id: 'callback-session-loaded',
        label: 'Console callback on session loaded',
        value: false
      },
      onChatInitiated: {
        id: 'callback-chat-initiated',
        label: 'Console callback on chat initiated',
        value: false
      },
      onChatOpened: {
        id: 'callback-chat-opened',
        label: 'Console callback on chat opened',
        value: false
      },
      onChatClosed: {
        id: 'callback-chat-closed',
        label: 'Console callback on chat closed',
        value: false
      },
      onMessageSent: {
        id: 'callback-message-sent',
        label: 'Console callback on message sent',
        value: false
      },
      onMessageReceived: {
        id: 'callback-message-received',
        label: 'Console callback on message received',
        value: false
      },
      onNicknameChanged: {
        id: 'callback-nickname-changed',
        label: 'Console callback on nickname changed',
        value: false
      },
      onEmailChanged: {
        id: 'callback-email-changed',
        label: 'Console callback on email changed',
        value: false
      },
      onPhoneChanged: {
        id: 'callback-phone-changed',
        label: 'Console callback on phone changed',
        value: false
      },
      onAvatarChanged: {
        id: 'callback-avatar-changed',
        label: 'Console callback on avatar changed',
        value: false
      }
    }
  }),

  getters: {
    getSettingById: (state) => (id) => {
      const allSettings = { ...state.preferences, ...state.settings, ...state.callbacks }
      return Object.values(allSettings).find((setting) => setting.id === id)
    }
  },

  actions: {
    updateSettingValue(id, value) {
      for (let key in this.preferences) {
        if (this.preferences[key].id === id) {
          this.preferences[key].value = value
          return
        }
      }

      for (let key in this.settings) {
        if (this.settings[key].id === id) {
          this.settings[key].value = value
          return
        }
      }

      for (let key in this.callbacks) {
        if (this.callbacks[key].id === id) {
          this.callbacks[key].value = value
          return
        }
      }

      console.error(`Setting with ID "${id}" not found.`)
    },
    initializeStore() {
      // Get the saved state from localStorage
      const savedState = localStorage.getItem('user')

      if (savedState) {
        const parsedSavedState = JSON.parse(savedState)

        // restore settings state from localStorage
        for (const key in this.settings) {
          if (
            parsedSavedState.settings &&
            parsedSavedState.settings[this.settings[key].id] &&
            parsedSavedState.settings[this.settings[key].id].hasOwnProperty('value')
          ) {
            this.settings[key].value = parsedSavedState.settings[this.settings[key].id].value
          }
        }

        // restore preferences state from localStorage
        for (const key in this.preferences) {
          if (
            parsedSavedState.preferences &&
            parsedSavedState.preferences[this.preferences[key].id] &&
            parsedSavedState.preferences[this.preferences[key].id].hasOwnProperty('value')
          ) {
            this.preferences[key].value =
              parsedSavedState.preferences[this.preferences[key].id].value
          }
        }

        // restore callbacks state from localStorage
        for (const key in this.callbacks) {
          if (
            parsedSavedState.callbacks &&
            parsedSavedState.callbacks[this.callbacks[key].id] &&
            parsedSavedState.callbacks[this.callbacks[key].id].hasOwnProperty('value')
          ) {
            this.callbacks[key].value = parsedSavedState.callbacks[this.callbacks[key].id].value
          }
        }
      }

      // Setup a store subscription to persist the state in localStorage whenever it changes
      this.$subscribe((_, state) => {
        const savedSettings = {}
        const savedPreferences = {}
        const savedCallbacks = {}

        for (const key in state.settings) {
          savedSettings[state.settings[key].id] = { value: state.settings[key].value }
        }

        for (const key in state.preferences) {
          savedPreferences[state.preferences[key].id] = { value: state.preferences[key].value }
        }

        for (const key in state.callbacks) {
          savedCallbacks[state.callbacks[key].id] = { value: state.callbacks[key].value }
        }

        // Persist settings, preferences and callbacks in localStorage
        localStorage.setItem(
          'user',
          JSON.stringify({
            settings: savedSettings,
            preferences: savedPreferences,
            callbacks: savedCallbacks
          })
        )
      })
    }
  }
})
