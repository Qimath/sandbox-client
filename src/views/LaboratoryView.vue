<script setup>
import { onMounted } from "vue";

import BaseContainer from "@/components/ui/BaseContainer.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseBanner from "@/components/ui/BaseBanner.vue";

import { useBanner } from "@/hooks/banner.js";

const { bannerOptions, displayBanner, closeBanner } = useBanner();

onMounted(() => {
  displayBanner({
    message:
      "Access Restricted. You do not have permission to view this content at the moment.",
    type: "error",
    animate: true,
  });
});
</script>

<template>
  <div class="view-wrapper">
    <BaseContainer grow full>
      <template #container>
        <BaseCard>
          <template #card> </template>
        </BaseCard>
      </template>
    </BaseContainer>

    <teleport to="#app">
      <transition name="banner" mode="out-in">
        <BaseBanner
          v-if="bannerOptions.visibility"
          @bannerClose="closeBanner"
          :message="bannerOptions.message"
          :action="bannerOptions.action"
          :animate="bannerOptions.animate"
          :type="bannerOptions.type"
        />
      </transition>
    </teleport>
  </div>
</template>

<style scoped></style>
