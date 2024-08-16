<script setup>
import BaseContainer from "@/components/ui/BaseContainer.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import ContactHandler from "@/components/widgets/ContactHandler.vue";
import WebsiteHandler from "@/components/widgets/WebsiteHandler.vue";
import SessionHandler from "@/components/widgets/SessionHandler.vue";
import GetHandler from "@/components/widgets/GetHandler.vue";
import WebsitePreview from "@/components/widgets/WebsitePreview.vue";
</script>

<template>
  <div class="view-wrapper">
    <BaseContainer width="48rem">
      <template #container>
        <BaseCard>
          <template #card>
            <WebsitePreview />
            <ContactHandler />
          </template>
        </BaseCard>
      </template>
    </BaseContainer>
    <BaseContainer grow>
      <template #container>
        <BaseCard>
          <template #card>
            <WebsiteHandler />
            <SessionHandler />
          </template>
        </BaseCard>
        <BaseCard>
          <template #card>
            <GetHandler />
          </template>
        </BaseCard>
      </template>
    </BaseContainer>
  </div>
</template>

<style scoped></style>
