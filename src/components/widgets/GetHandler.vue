<script setup>
import { computed, reactive, ref } from "vue";
import { useSessionStore } from "@/stores/session.js";
import { useMethodsStore } from "@/stores/methods.js";

import useMethodGetter from "@/hooks/get.js";

import BaseButton from "@/components/ui/BaseButton.vue";
import BaseOutput from "@/components/ui/BaseOutput.vue";

const sessionStore = useSessionStore();
const sessionContent = computed(() => sessionStore.session.content);

const methodsStore = useMethodsStore();

const refreshResult = reactive({
  "session-nickname": {
    success: "",
    error: "",
  },
  "session-email": {
    success: "",
    error: "",
  },
  "session-phone": {
    success: "",
    error: "",
  },
  "session-company": {
    success: "",
    error: "",
  },
  "session-avatar": {
    success: "",
    error: "",
  },
  "session-data": {
    success: "",
    error: "",
  },
});

async function sessionContentRefresh(id) {
  refreshResult[id].success = "";
  refreshResult[id].error = "";

  try {
    const result = await useMethodGetter(id);

    if (result) {
      if (result.error && result.error !== "") {
        setTimeout(() => {
          refreshResult[id].error = result.error;
        }, 1);
      }

      if (result.success && result.success !== "") {
        if (sessionContentRefresh.successTimeoutId) {
          clearTimeout(sessionContentRefresh.successTimeoutId.value);
        }
        refreshResult[id].success = result.success;
        sessionContentRefresh.successTimeoutId = ref(
          setTimeout(() => {
            refreshResult[id].success = "";
          }, 500)
        );
      }
    }
  } catch (error) {
    console.error("An app error occurred:", error);
    refreshResult[id].error = "App error: Get";
  }
}

async function sessionContentRefreshAll() {
  const ids = [
    methodsStore.nickname.id,
    methodsStore.email.id,
    methodsStore.phone.id,
    methodsStore.company.id,
    methodsStore.avatar.id,
    methodsStore.data.id,
  ];

  ids.forEach(sessionContentRefresh);

  setTimeout(() => {
    ids.forEach((id) => {
      refreshResult[id].success = "";
    });
  }, 500);
}
</script>

<template>
  <div class="element">
    <div class="form">
      <BaseOutput
        :id="'get' + methodsStore.nickname.id"
        :label="methodsStore.nickname.label"
        :value="sessionContent.nickname"
        :success="refreshResult[methodsStore.nickname.id]?.success"
        :error="refreshResult[methodsStore.nickname.id]?.error"
        @refresh="sessionContentRefresh(methodsStore.nickname.id)"
        refresh
      />
      <BaseOutput
        :id="'get' + methodsStore.email.id"
        :label="methodsStore.email.label"
        :value="sessionContent.email"
        :success="refreshResult[methodsStore.email.id]?.success"
        :error="refreshResult[methodsStore.email.id]?.error"
        @refresh="sessionContentRefresh(methodsStore.email.id)"
        refresh
      />
      <BaseOutput
        :id="'get' + methodsStore.phone.id"
        :label="methodsStore.phone.label"
        :value="sessionContent.phone"
        :success="refreshResult[methodsStore.phone.id]?.success"
        :error="refreshResult[methodsStore.phone.id]?.error"
        @refresh="sessionContentRefresh(methodsStore.phone.id)"
        refresh
      />
      <BaseOutput
        :id="'get' + methodsStore.company.id"
        :label="methodsStore.company.label"
        :value="sessionContent.company"
        :success="refreshResult[methodsStore.company.id]?.success"
        :error="refreshResult[methodsStore.company.id]?.error"
        @refresh="sessionContentRefresh(methodsStore.company.id)"
        refresh
      />
      <BaseOutput
        :id="'get' + methodsStore.avatar.id"
        :label="methodsStore.avatar.label"
        :value="sessionContent.avatar"
        :success="refreshResult[methodsStore.avatar.id]?.success"
        :error="refreshResult[methodsStore.avatar.id]?.error"
        @refresh="sessionContentRefresh(methodsStore.avatar.id)"
        refresh
        :url="sessionContent.avatar"
        link
      />
      <BaseOutput
        :id="'get' + methodsStore.data.id"
        :label="methodsStore.data.label"
        :value="sessionContent.data"
        :success="refreshResult[methodsStore.data.id]?.success"
        :error="refreshResult[methodsStore.data.id]?.error"
        @refresh="sessionContentRefresh(methodsStore.data.id)"
        refresh
      />
      <BaseButton
        id="get-session-refresh"
        color="blue"
        value="refresh all"
        @click="sessionContentRefreshAll"
      >
        <template #button>refresh all</template>
      </BaseButton>
    </div>
  </div>
</template>

<style scoped></style>
