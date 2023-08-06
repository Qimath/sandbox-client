<script setup>
import { computed, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";

import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();
const userThemeDetect = computed(() => userStore.getSetting("themeDetect"));
const userThemeSelected = computed(() => userStore.getSetting("themeSelected"));

const route = useRoute();
const pageTitle = computed(() => {
  return route.meta.title;
});

onMounted(() => {
  applyTheme();
});

watchEffect(() => {
  applyTheme();
});

function applyTheme() {
  if (userThemeDetect.value) {
    // Use prefers-color-scheme media feature to detect theme
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );

    // Update the user's selected theme according to the detected theme
    userStore.setSetting("themeSelected", isDarkMode ? "dark" : "light");
  } else {
    // Use the user-selected theme
    document.documentElement.setAttribute(
      "data-theme",
      userThemeSelected.value
    );
  }
}

function toggleTheme(theme) {
  userStore.setSetting("themeDetect", false);

  if (theme === "light") {
    userStore.setSetting("themeSelected", "light");
  } else {
    userStore.setSetting("themeSelected", "dark");
  }
}
</script>

<template>
  <header>
    <nav>
      <section>
        <h1>sandbox</h1>
      </section>
      <section>
        <h2>{{ pageTitle }}</h2>
      </section>
      <section>
        <span
          v-if="userThemeSelected === 'light'"
          class="go-dark material-symbols-outlined"
          @click="toggleTheme('dark')"
          >dark_mode</span
        >
        <span
          v-else
          class="go-light material-symbols-outlined"
          @click="toggleTheme('light')"
          >light_mode</span
        >
      </section>
    </nav>
  </header>
</template>

<style scoped>
header {
  background: var(--container-bg);
  z-index: 50;
}

nav {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: var(--layout-header-height);
  border-bottom: 1px solid var(--container-border);
  padding: 0 1rem;
  width: 100%;
  user-select: none;
  -webkit-user-select: none;
}

nav section {
  flex: 1 0 0;
}

nav section:nth-of-type(1) {
  justify-content: start;
}

nav section:nth-of-type(2) {
  justify-content: center;
}

nav section:nth-of-type(3) {
  justify-content: end;
}

h1 {
  color: var(--header-sandbox);
  font-size: 1.5rem;
  text-transform: uppercase;
  font-weight: 900;
}

h2 {
  color: var(--header-title);
  font-size: 1.25rem;
  font-weight: 700;
}

span {
  font-size: 2.25rem;
  cursor: pointer;
  border-radius: 50%;
  padding: 0.625rem;
  transition: all 0.2s linear;
}

span.go-light {
  color: var(--color-amber-1);
}

span.go-dark {
  color: var(--color-blue-1);
}

span:hover {
  transform: scale(1.25);
}
</style>
