<script setup>
import { reactive, onMounted } from 'vue'

import BaseContainer from '../components/ui/BaseContainer.vue'
import BaseCard from '../components/ui/BaseCard.vue'
</script>

<template>
  <BaseContainer grow>
    <template #container>
      <BaseCard>
        <template #card>
        </template>
      </BaseCard>
    </template>
  </BaseContainer>
</template>

<style scoped>
.container {
  height: 100%;
  max-height: 100%;
}
.card {
  height: calc(100% - 3rem);
}

iframe body {
    background: red!important;
}
</style>
