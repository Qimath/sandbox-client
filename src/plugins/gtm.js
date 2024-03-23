import { useUserStore } from "@/stores/user.js";

import { createGtm } from "vue-gtm";

export default {
  install: async (app) => {
    try {
      await app.config.globalProperties.$router.isReady();

      const userStore = useUserStore();

      const gtmEnable = userStore.getSetting("gtmEnable");
      const gtmId = userStore.getSetting("gtmId");

      if (!gtmId) {
        return;
      }

      app.use(
        createGtm({
          id: gtmId,
          enabled: gtmEnable,
          debug: false,
          vueRouter: app.config.globalProperties.$router,
        })
      );
    } catch (error) {
      console.error("Error initializing GTM:", error);
    }
  },
};
