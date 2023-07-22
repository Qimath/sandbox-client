<script setup>
import { onMounted } from "vue";

import SideContent from "@/components//layout/SideContent.vue";
import MainContent from "@/components/layout/MainContent.vue";

import {
  startUserSession,
  getCurrentUser,
  initializeUserSession,
} from "@/hooks/identity.js";

onMounted(async () => {
  await initializeUserSession();

  const { success: user } = await getCurrentUser();
  console.log(user);

  if (user) {
    startUserSession();
  }
});
</script>

<template>
  <SideContent />
  <MainContent />
</template>

<style scoped></style>
