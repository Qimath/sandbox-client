<script setup>
import { onMounted } from "vue";

import SideContent from "@/components//layout/SideContent.vue";
import MainContent from "@/components/layout/MainContent.vue";

import { startUserSession, getCurrentUser } from "@/hooks/identity.js";

onMounted(async () => {
  const isLoggedIn = await getCurrentUser();
  console.log(isLoggedIn);

  if (isLoggedIn && isLoggedIn.success !== "") {
    startUserSession();
  }
});
</script>

<template>
  <SideContent />
  <MainContent />
</template>

<style scoped></style>
