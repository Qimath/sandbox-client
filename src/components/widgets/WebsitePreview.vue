<script setup>
import { computed } from "vue";
import { useConfigStore } from "@/stores/config.js";

import BasePreview from "@/components/ui/BasePreview.vue";

const configStore = useConfigStore();
const websiteId = computed(() => configStore.getWebsiteId);
const websiteName = computed(() =>
  configStore.getConfig.website === "N/A"
    ? "Invalid website"
    : configStore.getConfig.website
);
const websiteLogo = computed(() => configStore.getConfig.settings.logo);
const websiteAvailability = computed(() => configStore.getConfig.online);
</script>

<template>
  <div class="element">
    <div class="form">
      <BasePreview
        :primary="websiteName"
        :secondary="websiteId"
        :picture="websiteLogo"
        :status="websiteAvailability"
      />
    </div>
  </div>
</template>

<style scoped></style>
