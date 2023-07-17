import { createApp } from "vue";
import { createPinia } from "pinia";

import { useConfigStore } from "@/stores/config.js";
import { useUserStore } from "./stores/user.js";

import VueCookies from "vue-cookies";

import Crisp from "@/plugins/crisp.js";

import App from "@/App.vue";
import router from "@/router";

import "@/assets/style/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueCookies);

const userStore = useUserStore();
const configStore = useConfigStore();

userStore.initializeStore();
configStore.initializeStore();

app.use(Crisp);

app.mount("#app");
