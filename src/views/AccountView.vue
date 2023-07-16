<script setup>
import BaseContainer from '../components/ui/BaseContainer.vue'
import BaseCard from '../components/ui/BaseCard.vue'
import AccountHandler from '../components/widgets/AccountHandler.vue'
</script>

<template>
  <div class="view-wrapper">
    <BaseContainer grow full>
      <template #container>
        <BaseCard>
          <template #card>
            <AccountHandler />
          </template>
        </BaseCard>
      </template>
    </BaseContainer>
  </div>
</template>

<style scoped></style>
