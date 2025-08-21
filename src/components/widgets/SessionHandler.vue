<script setup>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useConfigStore } from "@/stores/config.js";
import { useSessionStore } from "@/stores/session.js";
import { useUserStore } from "@/stores/user.js";
import { Crisp } from "crisp-sdk-web";

import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseOutput from "@/components/ui/BaseOutput.vue";
import useMethodCopier from "@/hooks/copy";

const router = useRouter();

const configStore = useConfigStore();
const websiteId = computed(() => configStore.getWebsiteId);

const sessionStore = useSessionStore();
const sessionId = computed(() => sessionStore.session.id);
const sessionToken = computed(() => sessionStore.session.token);

const userStore = useUserStore();
const localStorageClear = computed(() =>
  userStore.getPreferences("localStorageClear")
);

const sessionIdValue = ref("");

const copyResults = reactive({});
const successTimeoutIds = reactive({});

async function copyMethod(key) {
  if (!copyResults[key]) {
    copyResults[key] = reactive({ copyType: "" });
  }

  try {
    const result = await useMethodCopier(key);
    if (result) {
      setTimeout(() => {
        Object.assign(copyResults[key], result);
        navigator.clipboard.writeText(copyResults[key].copyValue);
      }, 1);

      if (successTimeoutIds[key]) {
        clearTimeout(successTimeoutIds[key]);
      }

      successTimeoutIds[key] = ref(
        setTimeout(() => {
          copyResults[key].copyType = "";
        }, 1000)
      );
    }
  } catch (error) {
    console.error("An app error occurred:", error);
  }
}

function sanitizeInput(input) {
  return input
    .replace(/\//g, "") // remove forward slashes
    .replace(/\\/g, "") // remove backward slashes
    .replace(/['"]/g, ""); // remove single and double quotes
}

function loadSession(value) {
  const sanitizedValue = sanitizeInput(value);

  router
    .push({
      path: router.currentRoute.value.path,
      query: { crisp_sid: sanitizedValue.trim() },
    })
    .then(() => Crisp.session.reset());
}

function clearSession() {
  router
    .push({
      path: router.currentRoute.value.path,
      query: {},
    })
    .then(() => {
      Crisp.session.reset();
      if (localStorageClear.value) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.includes("crisp")) {
            localStorage.removeItem(key);
            i--;
          }
        }
      }
    });
}
</script>

<template>
  <div class="element">
    <form @submit.prevent="loadSession(sessionIdValue)" name="set-session">
      <BaseInput
        id="set-session_id"
        label="Session ID"
        icon="fingerprint"
        v-model:value="sessionIdValue"
      />
      <div class="button-group">
        <BaseButton id="session-submit" color="default" value="submit" />
        <BaseButton
          id="session-clear"
          color="red"
          @click="clearSession"
          action
          action-label="content_copy"
          :copy-type="copyResults['clear']?.copyType"
          @action="copyMethod('clear')"
          button
        >
          <template #button>reset</template>
        </BaseButton>
      </div>
      <BaseOutput
        id="get-session_id"
        label="Session ID"
        :value="sessionId"
        :url="
          'https://app.crisp.chat/website/' + websiteId + '/inbox/' + sessionId
        "
        link
        compact
      />
      <BaseOutput
        id="get-session_token"
        label="Token ID"
        :value="sessionToken"
        compact
      />
    </form>
  </div>
</template>

<style scoped></style>
