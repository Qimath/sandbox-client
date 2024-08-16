<script setup>
import BaseContainer from "@/components/ui/BaseContainer.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import WebsiteHandler from "@/components/widgets/WebsiteHandler.vue";
import SessionHandler from "@/components/widgets/SessionHandler.vue";
import GetHandler from "@/components/widgets/GetHandler.vue";
import WebsitePreview from "@/components/widgets/WebsitePreview.vue";
import WebsiteDetails from "@/components/widgets/WebsiteDetails.vue";
import WebsiteSettings from "@/components/widgets/WebsiteSettings.vue";
import WebsiteVisibility from "@/components/widgets/WebsiteVisibility.vue";
</script>

<template>
  <div class="view-wrapper">
    <BaseContainer width="48rem">
      <template #container>
        <BaseCard>
          <template #card>
            <WebsitePreview />
            <WebsiteDetails />
          </template>
        </BaseCard>
        <BaseCard>
          <template #card>
            <WebsiteVisibility />
          </template>
        </BaseCard>
        <BaseCard>
          <template #card>
            <WebsiteSettings />
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
