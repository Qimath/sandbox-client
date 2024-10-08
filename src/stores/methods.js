import { defineStore } from "pinia";

export const useMethodsStore = defineStore({
  id: "methods",
  state: () => ({
    nickname: {
      id: "session-nickname",
      label: "Nickname",
      icon: "nickname",
    },
    email: {
      id: "session-email",
      label: "Email address",
      icon: "email",
    },
    phone: {
      id: "session-phone",
      label: "Phone number",
      icon: "phone",
    },
    company: {
      id: "session-company",
      label: "Company",
      icon: "work",
    },
    avatar: {
      id: "session-avatar",
      label: "Avatar",
      icon: "picture",
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
      icon: "tag",
    },
    event: {
      id: "event",
      label: "Event",
      icon: "event",
    },
    trigger: {
      id: "trigger",
      label: "Trigger",
      icon: "notification",
    },
    sendMessage: {
      id: "send-message",
      label: "Send message",
      icon: "send",
    },
    showMessage: {
      id: "show-message",
      label: "Show message",
      icon: "desktop",
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
    clear: {
      id: "clear",
      label: "Clear",
    },
  }),

  getters: {
    getMethod: (state) => (method) => {
      return state[method];
    },
  },

  actions: {},
});
