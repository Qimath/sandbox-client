<script setup>
import BaseContainer from "@/components/ui/BaseContainer.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import AccountHandler from "@/components/widgets/AccountHandler.vue";
</script>

<template>
  <div class="view-wrapper">
    <BaseContainer full grow>
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

<style scoped>
html[data-theme="light"] .container {
  background-image: url("@/assets/images/general/pattern-light-alt.png");
}

html[data-theme="dark"] .container {
  background-image: url("@/assets/images/general/pattern-dark-alt.png");
}
</style>
