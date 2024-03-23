<script setup>
import IconLogo from "@/assets/images/general/IconLogo.vue";

import { computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();

const router = useRouter();

const isLoggedIn = computed(() => userStore.getAccount().login);

function resolveRouteTitle(routeName) {
  const targetRoute = router.options.routes.find(
    (route) => route.name === routeName
  );
  return targetRoute.meta.title;
}

const homeTitle = computed(() => {
  return "'" + resolveRouteTitle("home") + "'";
});

const debuggingTitle = computed(() => {
  return "'" + resolveRouteTitle("debugging") + "'";
});

const methodsTitle = computed(() => {
  return "'" + resolveRouteTitle("methods") + "'";
});

const ticketTitle = computed(() => {
  return "'" + resolveRouteTitle("ticket") + "'";
});

const contactTitle = computed(() => {
  return "'" + resolveRouteTitle("contact") + "'";
});

const laboratoryTitle = computed(() => {
  return "'" + resolveRouteTitle("laboratory") + "'";
});

const accountTitle = computed(() => {
  return "'" + resolveRouteTitle("account") + "'";
});

const settingsTitle = computed(() => {
  return "'" + resolveRouteTitle("settings") + "'";
});
</script>

<template>
  <aside>
    <nav>
      <section class="home">
        <router-link to="/" class="home">
          <span><IconLogo /></span>
        </router-link>
      </section>

      <section class="pages">
        <router-link to="/methods" class="methods"
          ><span class="material-symbols-outlined"
            >code_blocks</span
          ></router-link
        >
        <router-link to="/debug" class="debugging"
          ><span class="material-symbols-outlined">adb</span></router-link
        >
        <router-link to="/ticket" class="ticket"
          ><span class="material-symbols-outlined"
            >confirmation_number</span
          ></router-link
        >
        <router-link to="/contact" class="contact"
          ><span class="material-symbols-outlined">chat</span></router-link
        >
        <router-link to="/lab" class="laboratory"
          ><span class="material-symbols-outlined">science</span></router-link
        >
      </section>

      <section class="user">
        <router-link to="/account" class="account">
          <div v-if="isLoggedIn" class="is-logged-in"></div>
          <span class="material-symbols-outlined"
            >account_circle</span
          ></router-link
        >
        <router-link v-if="isLoggedIn" to="/settings" class="settings"
          ><span class="material-symbols-outlined">settings</span></router-link
        >
      </section>
    </nav>
  </aside>
</template>

<style scoped>
aside {
  width: var(--layout-aside-width);
  min-width: var(--layout-aside-width);
  z-index: 100;
  position: relative;
}

aside nav {
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  background: var(--aside-bg);
  height: 100vh;
  width: var(--layout-aside-width);
  padding: 0.25rem 0;
  user-select: none;
  -webkit-user-select: none;
}

aside nav section {
  flex-direction: column;
  justify-content: space-between;
}

aside nav section:nth-of-type(2) {
  margin: 2rem 0;
}

aside nav section a {
  color: var(--aside-icon);
  margin: 0.25rem 0;
  border-radius: 0.25rem;
  height: 4rem;
  width: 4rem;
  justify-content: center;
  align-items: center;
  transition: all 0.2s linear;
  font-size: 2rem;
}

aside nav section a:hover {
  background-color: var(--aside-icon-hover);
  color: var(--aside-icon-active);
}

aside nav section a.router-link-exact-active {
  color: var(--aside-icon-active);
}

aside nav section a::before {
  display: none;
  position: absolute;
  align-items: center;
  justify-content: center;
  left: calc(4rem + 0.5rem);
  color: var(--main-text-reverse);
  background: var(--orange-duo);
  padding: 1rem 2rem;
  box-shadow: var(--main-shadow) 0 4px 8px, var(--main-shadow) 4px 4px 4px;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 700;
  opacity: 0;
  animation: labelDelay 1s linear;
  z-index: 1000;
  user-select: none;
  -webkit-user-select: none;
}

aside nav section a:hover::before {
  opacity: 1;
  display: flex;
}

aside nav section a.home::before {
  --route-title: v-bind(homeTitle);
  content: var(--route-title);
}

aside nav section a.methods::before {
  --route-title: v-bind(methodsTitle);
  content: var(--route-title);
}

aside nav section a.debugging::before {
  --route-title: v-bind(debuggingTitle);
  content: var(--route-title);
}

aside nav section a.ticket::before {
  --route-title: v-bind(ticketTitle);
  content: var(--route-title);
}

aside nav section a.contact::before {
  --route-title: v-bind(contactTitle);
  content: var(--route-title);
}

aside nav section a.laboratory::before {
  --route-title: v-bind(laboratoryTitle);
  content: var(--route-title);
}

aside nav section a.account::before {
  --route-title: v-bind(accountTitle);
  content: var(--route-title);
}

aside nav section a.settings::before {
  --route-title: v-bind(settingsTitle);
  content: var(--route-title);
}

aside nav section a::after {
  display: none;
  opacity: 0;
  content: "";
  z-index: 1000;
}

aside nav section a:hover::after {
  display: flex;
  position: absolute;
  right: -0.5rem;
  top: 50%;
  width: 0;
  height: 0;
  margin-top: -5px;
  margin-left: -5px;
  border: 5px solid transparent;
  border-left: 0;
  border-right-color: var(--orange-pri);
  opacity: 1;
  animation: labelDelay 1s linear;
}

aside nav section a span {
  font-size: inherit;
}

aside nav section a span svg {
  fill: currentColor;
  height: 2rem;
}

aside nav section a:hover span svg {
  fill: currentColor;
}

aside nav section a.router-link-exact-active span svg {
  fill: currentColor;
}

aside .is-logged-in {
  position: absolute;
  height: 0.5rem;
  width: 0.5rem;
  top: 0.75rem;
  right: 0.75rem;
  border-radius: 50%;
  background: var(--green-pri);
}

@keyframes labelDelay {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
