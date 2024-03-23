<script setup>
import { ref, computed, onMounted } from "vue";

import BaseContainer from "@/components/ui/BaseContainer.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseBanner from "@/components/ui/BaseBanner.vue";
import ProfileOverview from "@/components/widgets/ProfileOverview.vue";
import ProfileEdition from "@/components/widgets/ProfileEdition.vue";

import { useBanner } from "@/hooks/banner.js";
import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();

const userEmail = computed(() => userStore.getAccount().email);

const { bannerOptions, displayBanner, closeBanner } = useBanner();

const authWindow = ref("overview");

function authWindowSwap(value) {
  authWindow.value = value;
}

const currentComponent = computed(() => {
  switch (authWindow.value) {
    case "overview":
      return ProfileOverview;
    case "edit":
      return ProfileEdition;
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
  if (window.sessionStorage.getItem("loggedIn")) {
    displayBanner({
      message: `You are now successfully logged in as <strong>${userEmail.value}</strong>`,
      type: "success",
      animate: true,
    });

    window.sessionStorage.removeItem("loggedIn");
  }

  if (window.sessionStorage.getItem("emailChanged")) {
    displayBanner({
      message: `Your email address has been successfully updated to <strong>${userEmail.value}</strong>`,
      type: "success",
      animate: true,
    });

    window.sessionStorage.removeItem("emailChanged");
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
              <keep-alive>
                <component
                  :is="currentComponent"
                  :key="currentComponent"
                  @auth-window="authWindowSwap"
                  @banner="bannerHandler"
                />
              </keep-alive>
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
