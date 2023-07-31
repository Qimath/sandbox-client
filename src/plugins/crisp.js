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
          console.log("session loaded");
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
        // Executed once the chat was initiated from the user
        if (callbacks.onChatInitiated) {
          console.log("chat initiated");
        }
      });

      Crisp.chat.onChatOpened(() => {
        // Executed once the chat was opened
        if (callbacks.onChatOpened) {
          console.log("chat opened");
        }
      });

      Crisp.chat.onChatClosed(() => {
        // Executed once the chat was closed
        if (callbacks.onChatClosed) {
          console.log("chat closed");
        }
      });

      Crisp.message.onMessageSent(() => {
        // Executed once a message is submitted by the visitor
        if (callbacks.onMessageSent) {
          console.log("message sent");
        }
      });

      Crisp.message.onMessageReceived(() => {
        // Executed once a message is received by the visitor
        if (callbacks.onMessageReceived) {
          console.log("message received");
        }
      });

      Crisp.user.onNicknameChanged(() => {
        if (callbacks.onNicknameChanged) {
          console.log("nickname changed");
        }

        let sessionContent = { ...sessionStore.session.content };
        sessionContent.nickname = Crisp.user.getNickname();
        sessionStore.setSessionContent(sessionContent);
      });

      Crisp.user.onEmailChanged(() => {
        if (callbacks.onEmailChanged) {
          console.log("email changed");
        }

        let sessionContent = { ...sessionStore.session.content };
        sessionContent.email = Crisp.user.getEmail();
        sessionStore.setSessionContent(sessionContent);
      });

      Crisp.user.onPhoneChanged(() => {
        if (callbacks.onPhoneChanged) {
          console.log("phone changed");
        }

        let sessionContent = { ...sessionStore.session.content };
        sessionContent.phone = Crisp.user.getPhone();
        sessionStore.setSessionContent(sessionContent);
      });

      Crisp.user.onAvatarChanged(() => {
        if (callbacks.onAvatarChanged) {
          console.log("avatar changed");
        }

        let sessionContent = { ...sessionStore.session.content };
        sessionContent.avatar = Crisp.user.getAvatar();
        sessionStore.setSessionContent(sessionContent);
      });
    } catch (error) {
      console.error("Error initializing Crisp:", error);
    }
  },
};
