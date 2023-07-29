<script setup>
import { computed } from "vue";
import { useConfigStore } from "@/stores/config.js";

const configStore = useConfigStore();
const websiteId = computed(() => configStore.getWebsiteId);
</script>

<template>
  <div class="element">
    <div class="form">
      <iframe
        title="Contact Form"
        :src="
          'https://plugins.crisp.chat/urn:crisp.im:contact-form:0/contact/' +
          websiteId
        "
        referrerpolicy="origin"
        sandbox="allow-forms allow-popups allow-scripts allow-same-origin"
        width="100%"
        height="1000px"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<style scoped></style>
