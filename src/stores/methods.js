import { defineStore } from 'pinia'

export const useMethodsStore = defineStore({
  id: 'methods',
  state: () => ({
    nickname: {
      id: 'session-nickname',
      label: 'Nickname',
      icon: 'badge'
    },
    email: {
      id: 'session-email',
      label: 'Email address',
      icon: 'mail'
    },
    phone: {
      id: 'session-phone',
      label: 'Phone number',
      icon: 'call'
    },
    company: {
      id: 'session-company',
      label: 'Company',
      icon: 'work'
    },
    avatar: {
      id: 'session-avatar',
      label: 'Avatar',
      icon: 'landscape'
    },
    data: {
      id: 'session-data',
      label: 'Custom data',
      dataKey: {
        label: 'Data key',
        icon: 'join_left'
      },
      dataValue: {
        label: 'Data value',
        icon: 'join_right'
      }
    },
    segment: {
      id: 'session-segment',
      label: 'Segment',
      icon: 'sell'
    },
    event: {
      id: 'event',
      label: 'Event',
      icon: 'celebration'
    },
    trigger: {
      id: 'trigger',
      label: 'Trigger',
      icon: 'notifications'
    },
    sendMessage: {
      id: 'send-message',
      label: 'Send message',
      icon: 'send'
    },
    showMessage: {
      id: 'show-message',
      label: 'Show message',
      icon: 'mark_as_unread'
    }
  }),

  getters: {
    getMethodById: (state) => (id) => {
      return Object.values(state).find((method) => method.id === id)
    }
  },

  actions: {}
})
