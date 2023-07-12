<script setup>
import BaseContainer from '../components/ui/BaseContainer.vue'
import BaseCard from '../components/ui/BaseCard.vue'
</script>

<template>
  <BaseContainer grow full>
    <template #container>
      <BaseCard>
        <template #card>
        </template>
      </BaseCard>
    </template>
  </BaseContainer>
</template>

<style scoped>
html[data-theme="light"] .container {
  background-image: url('../assets/pattern-light.png');
}

html[data-theme="dark"] .container {
  background-image: url('../assets/pattern-dark.png');
}
</style>
