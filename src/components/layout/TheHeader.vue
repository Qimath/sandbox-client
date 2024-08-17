<script setup>
import { computed, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";

import { useUserStore } from "@/stores/user.js";

import IconLight from "@/assets/images/icons/IconLight.vue";
import IconDark from "@/assets/images/icons/IconDark.vue";

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
        <IconDark
          v-if="userThemeSelected === 'light'"
          class="go-dark"
          @click="toggleTheme('dark')"
        />
        <IconLight v-else class="go-light" @click="toggleTheme('light')" />
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

svg {
  height: 3.5rem;
  width: 3.5rem;
  cursor: pointer;
  border-radius: 50%;
  padding: 0.5rem;
  transition: all 0.2s linear;
}

.go-light {
  fill: var(--color-amber-1);
}

.go-dark {
  fill: var(--color-blue-1);
}

svg:hover {
  transform: scale(1.15);
}
</style>
