import { useConfigStore } from "@/stores/config.js";
import { useSessionStore } from "@/stores/session.js";
import { useUserStore } from "@/stores/user.js";

import { Crisp } from "crisp-sdk-web";

export default {
  install: async (app) => {
    try {
      // Wait for the router to be ready before initializing Crisp.
      // Navigation Guards are used to check query parameters.
      // If website_id is set, this id will be loaded.
      await app.config.globalProperties.$router.isReady();

      const configStore = useConfigStore();
      const sessionStore = useSessionStore();
      const userStore = useUserStore();

      // Fetch user settings and populate config store
      const websiteId = configStore.getWebsiteId;
      const options = userStore.getOptions();

      Crisp.configure(websiteId, options);

      // Fetching and storing the callback file object.
      const CONFIG_URL = `https://client.crisp.chat/settings/website/${websiteId}`;

      try {
        const timestamp = new Date().getTime();
        const CONFIG_URL = `https://client.crisp.chat/settings/website/${websiteId}?t=${timestamp}`;

        const response = await fetch(CONFIG_URL);

        if (!response.ok) {
          throw new Error("Error while fetching callback file");
        }

        const configData = await response.json();

        if (configData.error && configData.error === "invalid_website_id") {
          configStore.setWebsiteValidity(false);
        } else {
          configStore.setWebsiteValidity(true);
        }

        configStore.setWebsiteConfig(configData);
      } catch (error) {
        console.error("Error updating config store:", error);
      }

      // Caching the website if it is valid, and not already set as main website
      const mainWebsite = userStore.getSetting("mainWebsite").id;
      const websiteValidity = configStore.getWebsiteValidity;

      if (websiteValidity && websiteId !== mainWebsite) {
        configStore.setCachedWebsites();
      }

      Crisp.session.onLoaded(async (sessionId) => {
        if (callbacks.onSessionLoaded) {
          console.log("session loaded: ", sessionId);
        }

        // Fetching Session and populating the session store
        try {
          const sessionToken =
            typeof CRISP_TOKEN_ID !== "undefined" ? CRISP_TOKEN_ID : "N/A";
          const sessionContent = {
            nickname: Crisp.user.getNickname() || "N/A",
            email: Crisp.user.getEmail() || "N/A",
            phone: Crisp.user.getPhone() || "N/A",
            company: Crisp.user.getCompany()?.name || "N/A",
            avatar: Crisp.user.getAvatar() || "N/A",
            data: Crisp.session.getData() || {},
          };

          sessionStore.setSessionId(sessionId);
          sessionStore.setSessionToken(sessionToken);
          sessionStore.setSessionContent(sessionContent);
        } catch (error) {
          console.error("Error fetching session data:", error);
        }
      });

      // Initializing callback settings
      const callbacks = userStore.getCallbacks();

      Crisp.chat.onChatInitiated(() => {
        if (callbacks.onChatInitiated) {
          console.log("chat initiated");
        }
      });

      Crisp.chat.onChatOpened(() => {
        if (callbacks.onChatOpened) {
          console.log("chat opened");
        }
      });

      Crisp.chat.onChatClosed(() => {
        if (callbacks.onChatClosed) {
          console.log("chat closed");
        }
      });

      Crisp.message.onMessageSent((message) => {
        if (callbacks.onMessageSent) {
          console.log("message sent: ", message);
        }
      });

      Crisp.message.onMessageReceived((message) => {
        if (callbacks.onMessageReceived) {
          console.log("message received: ", message);
        }
      });

      Crisp.message.onMessageComposeSent((compose) => {
        if (callbacks.onMessageComposeSent) {
          console.log("compose sent: ", compose);
        }
      });

      Crisp.message.onMessageComposeReceived((compose) => {
        if (callbacks.onMessageComposeReceived) {
          console.log("compose received: ", compose);
        }
      });

      Crisp.chat.onHelpdeskQueried((search_results) => {
        if (callbacks.onHelpdeskQueried) {
          console.log("helpdesk queried", search_results);
        }
      });

      Crisp.onWebsiteAvailabilityChanged((is_available) => {
        if (is_available) {
          configStore.setWebsiteAvailability(true);

          if (callbacks.onWebsiteAvailabilityChanged) {
            console.log("website availability: online");
          }
        } else {
          configStore.setWebsiteAvailability(false);

          if (callbacks.onWebsiteAvailabilityChanged) {
            console.log("website availability: offline");
          }
        }
      });

      Crisp.user.onNicknameChanged((nickname) => {
        if (callbacks.onNicknameChanged) {
          console.log("nickname changed: ", nickname);
        }

        let sessionContent = { ...sessionStore.session.content };
        sessionContent.nickname = Crisp.user.getNickname();
        sessionStore.setSessionContent(sessionContent);
      });

      Crisp.user.onEmailChanged((email) => {
        if (callbacks.onEmailChanged) {
          console.log("email changed: ", email);
        }

        let sessionContent = { ...sessionStore.session.content };
        sessionContent.email = Crisp.user.getEmail();
        sessionStore.setSessionContent(sessionContent);
      });

      Crisp.user.onPhoneChanged((phone) => {
        if (callbacks.onPhoneChanged) {
          console.log("phone changed: ", phone);
        }

        let sessionContent = { ...sessionStore.session.content };
        sessionContent.phone = Crisp.user.getPhone();
        sessionStore.setSessionContent(sessionContent);
      });

      Crisp.user.onAvatarChanged((avatar) => {
        if (callbacks.onAvatarChanged) {
          console.log("avatar changed: ", avatar);
        }

        let sessionContent = { ...sessionStore.session.content };
        sessionContent.avatar = Crisp.user.getAvatar();
        sessionStore.setSessionContent(sessionContent);
      });
    } catch (error) {
      throw new Error("Error initializing Crisp: " + error);
    }
  },
};
