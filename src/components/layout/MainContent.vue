<script setup>
import TheHeader from './TheHeader.vue'
import TheView from './TheView.vue'
import TheFooter from './TheFooter.vue'
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
