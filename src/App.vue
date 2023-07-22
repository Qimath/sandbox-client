<script setup>
import { onMounted } from "vue";

import SideContent from "@/components//layout/SideContent.vue";
import MainContent from "@/components/layout/MainContent.vue";

import { useUserStore } from "@/stores/user.js";
import { getCurrentUser } from "@/hooks/identity.js";

const userStore = useUserStore();

onMounted(async () => {
  const isLoggedIn = await getCurrentUser();
  console.log("mounted");
  console.log(isLoggedIn);


  if (isLoggedIn && isLoggedIn.success !== "") {
    userStore.setUserAccount(isLoggedIn.success);
  }
});
</script>

<template>
  <SideContent />
  <MainContent />
</template>

<style scoped></style>
