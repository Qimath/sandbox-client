import { createRouter, createWebHistory } from "vue-router";

import { useConfigStore } from "@/stores/config.js";
import { useUserStore } from "@/stores/user.js";

import { authCallback, confirmRecovery, confirmEmailChange } from "@/hooks/identity.js";
import { useBanner } from "@/hooks/banner.js";

import HomeView from "@/views/HomeView.vue";
import MethodsView from "@/views/MethodsView.vue";
import DebuggingView from "@/views/DebuggingView.vue";
import TicketView from "@/views/TicketView.vue";
import ContactView from "@/views/ContactView.vue";
import LaboratoryView from "@/views/LaboratoryView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { title: "Home" },
    },
    {
      path: "/methods",
      name: "methods",
      component: MethodsView,
      meta: { title: "SDK Methods" },
    },
    {
      path: "/debug",
      name: "debugging",
      component: DebuggingView,
      meta: { title: "Debugging Tools" },
    },
    {
      path: "/ticket",
      name: "ticket",
      component: TicketView,
      meta: { title: "Ticket Center" },
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
      meta: { title: "Contact Form" },
    },
    {
      path: "/lab",
      name: "laboratory",
      component: LaboratoryView,
      meta: { title: "Laboratory" },
    },

    {
      path: "/account",
      name: "account",
      component: () => import("@/views/AccountView.vue"),
      meta: { title: "Account" },
    },
    {
      path: "/account/dashboard",
      name: "dashboard",
      component: () => import("@/views/DashboardView.vue"),
      meta: { title: "Dashboard" },
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("@/views/SettingsView.vue"),
      meta: { title: "Settings" },
    },
  ],
});

// Navigation Guard to handle route restrictions based on user authentication and permissions
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  const isLoggedIn = userStore.getAccount().login;
  const authenticatedRoutes = ["dashboard", "settings"];

  if (to.name === "account" && isLoggedIn) {
    // redirect to the dashboard page
    next({ name: "dashboard" });
  } else if (authenticatedRoutes.includes(to.name) && !isLoggedIn) {
    // redirect to the account page
    next({ name: "account" });
  } else if (to.name === "settings" && !isLoggedIn) {
    // redirect to the account page
    next({ name: "account" });
  } else {
    next();
  }
});

// Navigation Guard to close the banner when navigating to a different view
router.beforeEach((to, from, next) => {
  const { closeBanner } = useBanner();
  closeBanner();
  next();
});

// Navigation Guard to handle authentication callbacks
// check for url query parameters for password recovery and auth0 authentication
router.beforeEach((to, from, next) => {
  const { displayBanner } = useBanner();

  const hashParams = new URLSearchParams(window.location.hash.substr(1));

  const recoveryToken = hashParams.get("recovery_token");
  const callbackToken = hashParams.get("access_token");
  const emailChangeToken = hashParams.get("email_change_token");

  if (callbackToken) {
    (async () => {
      const accessToken = hashParams.get("access_token");

      try {
        const result = await authCallback(accessToken);

        // handling callback result
        if (result.error && result.error !== "") {
          displayBanner({
            message: result.error,
            type: "error",
            animate: true,
          });
        } else {
          window.sessionStorage.setItem("loggedIn", "true");
          router.push({ name: "dashboard" }).then(() => router.go());
        }
      } catch (error) {
        console.error("App error => Signup: ", error);
      }
    })();
  }

  if (recoveryToken) {
    (async () => {
      try {
        const result = await confirmRecovery(recoveryToken);

        // handling recovery result
        if (result.error && result.error !== "") {
          displayBanner({
            message: result.error,
            type: "error",
            animate: true,
          });
        } else {
          window.sessionStorage.setItem("loggedIn", "true");
          router.push({ name: "dashboard" }).then(() => router.go());
        }
      } catch (error) {
        console.error("App error => Recovery: ", error);
      }
    })();
  }

  if (emailChangeToken) {
    (async () => {
      try {
        const result = await confirmEmailChange(emailChangeToken);

        // handling recovery result
        if (result.error && result.error !== "") {
          displayBanner({
            message: result.error,
            type: "error",
            animate: true,
          });
        } else {
          window.sessionStorage.setItem("emailChanged", "true");
          router.push({ name: "dashboard" }).then(() => router.go());
        }
      } catch (error) {
        console.error("App error => Recovery: ", error);
      }
    })();
  }

  next();
});

// Navigation Guard to check if a website_id was passed in the url
// This id will be stored and used to load the proper website in the Crisp plugin
router.beforeEach((to, from, next) => {
  const websiteId = to.query.website_id;

  if (websiteId) {
    const configStore = useConfigStore();
    configStore.setWebsiteId(websiteId);
  }

  next();
});

export default router;
