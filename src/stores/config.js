import { defineStore } from 'pinia'
import VueCookies from 'vue-cookies'

export const useConfigStore = defineStore({
  id: 'config',
  state: () => ({
    website: {
      id: 'e93e073a-1f69-4cbc-8934-f9e1611e65bb',
      emailSecret: '',
      ticketSecret: '',
      valid: null,
      staging: 'e93e073a-1f69-4cbc-8934-f9e1611e65bb',
      options: {
        autoload: true, // Autoloads Crisp once Crisp is configured. Default: true
        tokenId: null, // Session continuty token. Default: null
        locale: null, // Sets a custom locale (en, fr, de, ...) Default: null
        sessionMerge: false, // Enables session merge. Default: false
        cookieDomain: null, // Enforces a custom domain for Cookie storage. Default: null
        cookieExpire: null, // Enforces a custom expire time for Cookie storage. Default: null
        lockMaximized: false, // Prevents chatbox from being closed. Default: false
        lockFullview: false, // Enforces chatbox fullscreen mode. Default: false
        safeMode: false, // Enforces chatbox safe mode. Default: false
        clientUrl: 'https://client.crisp.chat/l.js' // Use a custom chatbox loader URL. Default: https://client.crisp.chat/l.js
      },
      config: {
        website: 'N/A',
        domain: 'N/A',
        mailer: 'N/A',
        settings: {
          logo: 'https://i.pinimg.com/originals/5d/81/48/5d8148b9fb894dcbd46614312066b236.jpg',
          rating: null,
          transcript: null,
          enrich: null,
          junk_filter: null,
          tile: 'N/A',
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
          status_health_dead: null,
          check_domain: null,
          color_theme: 'N/A',
          text_theme: 'default',
          welcome_message: 'default',
          locale: 'N/A',
          allowed_pages: ['N/A'],
          blocked_pages: ['N/A'],
          blocked_countries: ['N/A'],
          blocked_locales: ['N/A'],
          blocked_ips: ['N/A']
        },
        operators: {},
        plugins: {},
        online: null,
        trial: null,
        channels: {
          email: 'N/A',
          phone: 'N/A',
          messenger: 'N/A',
          telegram: 'N/A',
          twitter: 'N/A',
          whatsapp: 'N/A',
          instagram: 'N/A',
          helpdesk: 'N/A',
          status: 'N/A'
        }
      }
    }
  }),

  getters: {
    getWebsite: (state) => {
      return state.website
    }
  },

  actions: {
    setWebsiteConfig(configData) {
      const deepMerge = (target, source) => {
        if (source && typeof source === 'object') {
          for (const key in source) {
            const sourceValue = source[key]
            if (sourceValue !== null && sourceValue !== undefined && sourceValue !== '') {
              if (typeof sourceValue !== 'object' || Array.isArray(sourceValue)) {
                target[key] = sourceValue
              } else {
                if (!target[key] || typeof target[key] !== 'object') {
                  target[key] = {}
                }
                deepMerge(target[key], sourceValue)
              }
            }
          }
        }
        return target
      }

      this.website.config = deepMerge(this.website.config, configData)
    },
    setWebsiteOptions(options) {
      this.website.options = {
        ...this.website.options,
        ...options
      }
    },
    setWebsiteValidity(value) {
      this.website.valid = value
    },
    setWebsiteIdAndSecrets(value) {
      this.website.id = value
      VueCookies.set('website_id', value)

      const savedSecrets = JSON.parse(localStorage.getItem('secrets'))
      if (savedSecrets && savedSecrets[value]) {
        const { emailSecret, ticketSecret } = savedSecrets[value]
        this.website.emailSecret = emailSecret
        this.website.ticketSecret = ticketSecret
      } else {
        this.website.emailSecret = ''
        this.website.ticketSecret = ''
      }
    },
    updateSecrets(emailSecret, ticketSecret) {
      this.website.emailSecret = emailSecret
      this.website.ticketSecret = ticketSecret

      const secretsMap = JSON.parse(localStorage.getItem('secrets')) || {}
      secretsMap[this.website.id] = { emailSecret, ticketSecret }
      localStorage.setItem('secrets', JSON.stringify(secretsMap))
    },

    initializeStore() {
      const savedWebsiteId = VueCookies.get('website_id')
      if (savedWebsiteId) {
        this.website.id = savedWebsiteId
      }

      const savedSecrets = JSON.parse(localStorage.getItem('secrets'))
      if (savedSecrets && savedSecrets[this.website.id]) {
        const { emailSecret, ticketSecret } = savedSecrets[this.website.id]
        this.website.emailSecret = emailSecret
        this.website.ticketSecret = ticketSecret
      }

      this.$subscribe((mutation, state) => {
        VueCookies.set('website_id', state.website.id)

        const secretsMap = JSON.parse(localStorage.getItem('secrets')) || {}
        secretsMap[state.website.id] = {
          emailSecret: state.website.emailSecret,
          ticketSecret: state.website.ticketSecret
        }
        localStorage.setItem('secrets', JSON.stringify(secretsMap))
      })
    }
  }
})
