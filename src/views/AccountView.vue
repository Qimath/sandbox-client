<script setup>
import { ref, computed, onMounted } from "vue";

import BaseContainer from "@/components/ui/BaseContainer.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import LoginHandler from "@/components/widgets/LoginHandler.vue";
import SignupHandler from "@/components/widgets/SignupHandler.vue";
import RecoveryHandler from "@/components/widgets/RecoveryHandler.vue";
import BaseBanner from "@/components/ui/BaseBanner.vue";

import { useBanner } from "@/hooks/banner.js";

const { bannerOptions, displayBanner, closeBanner } = useBanner();

const authWindow = ref("login");

function authWindowSwap(value) {
  authWindow.value = value;
}

const currentComponent = computed(() => {
  switch (authWindow.value) {
    case "login":
      return LoginHandler;
    case "signup":
      return SignupHandler;
    case "recovery":
      return RecoveryHandler;
    default:
      return LoginHandler;
  }
});

function bannerHandler(context) {
  displayBanner(context);
}

function handleBannerAction(action) {
  if (action === "login") {
    authWindowSwap(action);
    closeBanner();
  }
}

onMounted(() => {
  if (window.sessionStorage.getItem("loggedOut")) {
    displayBanner({
      message:
        "You are now logged out. Authenticate again to access the dashboard",
      type: "warning",
      animate: true,
    });

    window.sessionStorage.removeItem("loggedOut");
  }
});
</script>

<template>
  <div class="view-wrapper">
    <BaseContainer full grow>
      <template #container>
        <BaseCard>
          <template #card>
            <transition name="slide-fade" mode="out-in">
              <component
                :is="currentComponent"
                :key="currentComponent"
                @auth-window="authWindowSwap"
                @banner="bannerHandler"
              />
            </transition>
          </template>
        </BaseCard>
      </template>
    </BaseContainer>

    <teleport to="body">
      <transition name="banner" mode="out-in">
        <BaseBanner
          v-if="bannerOptions.visibility"
          @bannerClose="closeBanner"
          @bannerAction="handleBannerAction"
          :message="bannerOptions.message"
          :action="bannerOptions.action"
          :animate="bannerOptions.animate"
          :type="bannerOptions.type"
        />
      </transition>
    </teleport>
  </div>
</template>

<style scoped>
html[data-theme="light"] .container {
  background-image: url("@/assets/images/general/pattern-light-alt.png");
}

html[data-theme="dark"] .container {
  background-image: url("@/assets/images/general/pattern-dark-alt.png");
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(25%);
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
