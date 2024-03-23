import { defineStore } from "pinia";

export const useSessionStore = defineStore({
  id: "session",
  state: () => ({
    session: {
      id: "N/A",
      token: "N/A",
      content: {
        nickname: "N/A",
        email: "N/A",
        phone: "N/A",
        company: "N/A",
        avatar: "N/A",
        data: "N/A",
      },
    },
  }),

  getters: {
    getSession: (state) => {
      return state.session;
    },
  },

  actions: {
    setSessionContent(content) {
      this.session.content = {
        ...this.session.content,
        ...content,
        data: {
          ...(content.data !== undefined
            ? content.data
            : this.session.content.data),
        },
      };
    },

    setSessionId(value) {
      this.session.id = value;
    },

    setSessionToken(value) {
      this.session.token = value;
    },
  },
});
