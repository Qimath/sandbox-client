<script setup>
import TheHeader from "@/components/layout/TheHeader.vue";
import TheView from "@/components/layout/TheView.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
</script>

<template>
  <main>
    <TheHeader />
    <TheView />
    <TheFooter />
  </main>
</template>

<style scoped>
main {
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background: var(--main-bg-pri);
}
</style>
