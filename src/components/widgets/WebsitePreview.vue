<script setup>
import { computed } from "vue";
import { useConfigStore } from "@/stores/config.js";

import BasePreview from "@/components/ui/BasePreview.vue";

const configStore = useConfigStore();
const websiteConfig = computed(() => configStore.website);
</script>

<template>
  <div class="element">
    <div class="form">
      <BasePreview :config="websiteConfig" />
    </div>
  </div>
</template>

<style scoped></style>
