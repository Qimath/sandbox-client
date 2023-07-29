<script setup>
import { computed } from "vue";
import { useConfigStore } from "@/stores/config.js";

import BaseTable from "@/components/ui/BaseTable.vue";

const configStore = useConfigStore();
const websiteConfig = computed(() => {
  const config = configStore.getConfig;
  const customizationSettings =
    config?.plugins?.["urn:crisp.im:customization:0"]?.settings || null;
  const triggersSettings =
    config?.plugins?.["urn:crisp.im:triggers:0"]?.settings?.triggers || null;

  return {
    settings: config?.settings || null,
    plugins: {
      customization: customizationSettings,
      triggers: triggersSettings,
    },
  };
});
</script>

<template>
  <div class="element">
    <div class="table">
      <BaseTable :config="websiteConfig" />
    </div>
  </div>
</template>

<style scoped></style>
