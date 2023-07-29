<script setup>
import { computed, onMounted } from "vue";

import BaseContainer from "@/components/ui/BaseContainer.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseBanner from "@/components/ui/BaseBanner.vue";
import ProfileHandler from "@/components/widgets/ProfileHandler.vue";

import { useBanner } from "@/hooks/banner.js";
import { useUserStore } from "@/stores/user.js";

const userStore = useUserStore();

const userEmail = computed(() => userStore.getAccount().email);

const { bannerOptions, displayBanner, closeBanner } = useBanner();

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
});
</script>

<template>
  <div class="view-wrapper">
    <BaseContainer full grow>
      <template #container>
        <BaseCard>
          <template #card>
            <ProfileHandler />
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
</style>
