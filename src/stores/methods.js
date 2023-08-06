import { defineStore } from "pinia";

export const useMethodsStore = defineStore({
  id: "methods",
  state: () => ({
    nickname: {
      id: "session-nickname",
      label: "Nickname",
      icon: "badge",
    },
    email: {
      id: "session-email",
      label: "Email address",
      icon: "mail",
    },
    phone: {
      id: "session-phone",
      label: "Phone number",
      icon: "call",
    },
    company: {
      id: "session-company",
      label: "Company",
      icon: "work",
    },
    avatar: {
      id: "session-avatar",
      label: "Avatar",
      icon: "landscape",
    },
    data: {
      id: "session-data",
      label: "Custom data",
      dataKey: {
        label: "Data key",
        icon: "join_left",
      },
      dataValue: {
        label: "Data value",
        icon: "join_right",
      },
    },
    segment: {
      id: "session-segment",
      label: "Segment",
      icon: "sell",
    },
    event: {
      id: "event",
      label: "Event",
      icon: "celebration",
    },
    trigger: {
      id: "trigger",
      label: "Trigger",
      icon: "notifications",
    },
    sendMessage: {
      id: "send-message",
      label: "Send message",
      icon: "send",
    },
    showMessage: {
      id: "show-message",
      label: "Show message",
      icon: "mark_as_unread",
    },
    showChatbox: {
      id: "show-chatbox",
      label: "Show chatbox",
    },
    hideChatbox: {
      id: "hide-chatbox",
      label: "Hide chatbox",
    },
    openChatbox: {
      id: "open-chatbox",
      label: "Open chatbox",
    },
    closeChatbox: {
      id: "close-chatbox",
      label: "Close chatbox",
    },
    swapLeft: {
      id: "swap-left",
      label: "Swap left",
    },
    swapRight: {
      id: "swap-right",
      label: "Swap right",
    },
    mute: {
      id: "mute",
      label: "Mute",
    },
    unmute: {
      id: "unmute",
      label: "Unmute",
    },
  }),

  getters: {
    getMethod: (state) => (method) => {
      return state[method];
    },
  },

  actions: {},
});
