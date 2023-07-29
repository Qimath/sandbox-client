<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useSessionStore } from "@/stores/session.js";
import { useUserStore } from "@/stores/user.js";
import { Crisp } from "crisp-sdk-web";

import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseOutput from "@/components/ui/BaseOutput.vue";

const router = useRouter();

const sessionStore = useSessionStore();
const sessionId = computed(() => sessionStore.session.id);
const sessionToken = computed(() => sessionStore.session.token);

const userStore = useUserStore();
const localStorageClear = computed(() =>
  userStore.getPreferences("localStorageClear")
);

const sessionIdValue = ref("");

function loadSession(value) {
  router
    .push({
      path: router.currentRoute.value.path,
      query: { crisp_sid: value.trim() },
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
        icon="face"
        v-model:value="sessionIdValue"
      />
      <BaseButton id="session-submit" color="default" value="submit" />
      <BaseOutput id="get-session_id" label="Session ID" :value="sessionId" />
      <BaseOutput
        id="get-session_token"
        label="Token ID"
        :value="sessionToken"
      />
      <BaseButton id="session-clear" color="red" @click="clearSession" button>
        <template #button>reset</template>
      </BaseButton>
    </form>
  </div>
</template>

<style scoped></style>
