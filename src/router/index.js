import { createRouter, createWebHistory } from "vue-router";

import { useConfigStore } from "@/stores/config.js";

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
      component: () => import("@/views/DashBoardView.vue"),
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

// Navigation Guard to close the banner when navigating to a different view
router.beforeEach((to, from, next) => {
  const { closeBanner } = useBanner();
  closeBanner();
  next();
});

// Navigation Guard to check if a website_id was passed in the url
// This id will be stored and used to load the proper website in the Crisp plugin
router.beforeEach((to, from, next) => {
  const websiteId = to.query.website_id;

  if (websiteId) {
    const configStore = useConfigStore();
    configStore.setWebsiteIdAndSecrets(websiteId);
  }

  next();
});

export default router;
