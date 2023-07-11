<script setup>
</script>

<template>
  <div class="view">
    <RouterView />
  </div>
</template>

<style scoped>
div.view {
  flex-direction: row;
  justify-content: center;
  align-items: start;
  margin: 1rem 0 1rem 1rem;
  height: calc(100vh - var(--layout-header-height) - var(--layout-footer-height) - 2rem);
  min-height: calc(100vh - var(--layout-header-height) - var(--layout-footer-height) - 2rem);
  max-height: calc(100vh - var(--layout-header-height) - var(--layout-footer-height) - 2rem);
}
</style>
