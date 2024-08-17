<script setup>
import IconLogo from "@/assets/images/icons/IconLogo.vue";
import IconMethods from "@/assets/images/icons/IconMethods.vue";
import IconDebug from "@/assets/images/icons/IconDebug.vue";
import IconContact from "@/assets/images/icons/IconContact.vue";
import IconTicket from "@/assets/images/icons/IconTicket.vue";
import IconLab from "@/assets/images/icons/IconLab.vue";
import IconAccount from "@/assets/images/icons/IconAccount.vue";
import IconSettings from "@/assets/images/icons/IconSettings.vue";

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
          <IconLogo />
        </router-link>
      </section>

      <section class="pages">
        <router-link to="/methods" class="methods"><IconMethods /></router-link>
        <hr />
        <router-link to="/debug" class="debugging"><IconDebug /></router-link>
        <hr />
        <router-link to="/ticket" class="ticket"><IconTicket /></router-link>
        <hr />
        <router-link to="/contact" class="contact"><IconContact /></router-link>
        <hr />
        <router-link to="/lab" class="laboratory"><IconLab /></router-link>
      </section>

      <section class="user">
        <router-link to="/account" class="account">
          <div v-if="isLoggedIn" class="is-logged-in"></div>
          <IconAccount
        /></router-link>
        <router-link v-if="isLoggedIn" to="/settings" class="settings"
          ><IconSettings
        /></router-link>
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
  border-right: 1px solid var(--container-border);
}

hr {
  border: none;
  border-top: 1px solid var(--container-border);
  margin: 0.25rem;
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
  color: var(--aside-icon-select);
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
  right: -8px;
  top: 50%;
  width: 0;
  height: 0;
  margin-top: -7px;
  margin-left: -7px;
  border: 7px solid transparent;
  border-left: 0;
  border-right-color: var(--orange-pri);
  opacity: 1;
  animation: labelDelay 1s linear;
}

aside nav section a {
  font-size: inherit;
}

aside nav section a svg {
  fill: currentColor;
}

aside nav section a:hover svg {
  fill: currentColor;
}

aside nav section a.router-link-exact-active svg {
  fill: currentColor;
}

aside nav section.home a svg {
  height: 2.5rem;
  width: 2.5rem;
}

aside nav section.pages a svg,
aside nav section.user a svg{
  height: 2rem;
  width: 2rem;
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
