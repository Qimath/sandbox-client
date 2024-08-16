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
    <BaseContainer width="24rem">
      <template #container>
        <BaseCard>
          <template #card>
            <PushHandler method="nickname" />
            <PushHandler method="email" />
            <PushHandler method="phone" />
            <PushHandler method="company" />
            <PushHandler method="avatar" />
            <PushHandler method="data" />
            <PushHandler method="segment" />
          </template>
        </BaseCard>
      </template>
    </BaseContainer>
    <BaseContainer width="24rem">
      <template #container>
        <BaseCard>
          <template #card>
            <PushHandler method="event" />
            <PushHandler method="trigger" />
            <PushHandler method="sendMessage" />
            <PushHandler method="showMessage" />
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
