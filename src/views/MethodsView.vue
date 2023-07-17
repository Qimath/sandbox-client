<script setup>
import BaseContainer from "@/components/ui/BaseContainer.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import PushHandler from "@/components/widgets/PushHandler.vue";
import DoHandler from "@/components/widgets/DoHandler.vue";
import WebsiteHandler from "@/components/widgets/WebsiteHandler.vue";
import SessionHandler from "@/components/widgets/SessionHandler.vue";
import GetHandler from "@/components/widgets/GetHandler.vue";
</script>

<template>
  <div class="view-wrapper">
    <BaseContainer width="25rem">
      <template #container>
        <BaseCard>
          <template #card>
            <PushHandler method-id="session-nickname" />
            <PushHandler method-id="session-email" />
            <PushHandler method-id="session-phone" />
            <PushHandler method-id="session-company" />
            <PushHandler method-id="session-avatar" />
            <PushHandler method-id="session-data" />
            <PushHandler method-id="session-segment" />
          </template>
        </BaseCard>
      </template>
    </BaseContainer>
    <BaseContainer width="25rem">
      <template #container>
        <BaseCard>
          <template #card>
            <PushHandler method-id="event" />
            <PushHandler method-id="trigger" />
            <PushHandler method-id="send-message" />
            <PushHandler method-id="show-message" />
          </template>
        </BaseCard>
        <BaseCard>
          <template #card>
            <DoHandler />
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
