<script setup>
import { computed, reactive, ref } from "vue";
import { useMethodsStore } from "@/stores/methods.js";

import useMethodPusher from "@/hooks/push.js";
import useMethodCopier from "@/hooks/copy.js";

import BaseButton from "@/components/ui/BaseButton.vue";

const methodsStore = useMethodsStore();

const test = computed(() => methodsStore.getMethod("showChatbox"));

const doMethods = computed(() => ({
  showChatbox: methodsStore.getMethod("showChatbox"),
  hideChatbox: methodsStore.getMethod("hideChatbox"),
  openChatbox: methodsStore.getMethod("openChatbox"),
  closeChatbox: methodsStore.getMethod("closeChatbox"),
  swapLeft: methodsStore.getMethod("swapLeft"),
  swapRight: methodsStore.getMethod("swapRight"),
  mute: methodsStore.getMethod("mute"),
  unmute: methodsStore.getMethod("unmute"),
}));

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

async function pushMethod(key) {
  try {
    const result = await useMethodPusher(key);

    if (result) {
      return;
    }
  } catch (error) {
    console.error("An app error occurred:", error);
  }
}
</script>

<template>
  <div class="element">
    <form @submit.prevent="" name="do-method">
      <BaseButton
        v-for="(method, key) in doMethods"
        :key="method.id"
        :id="method.id"
        color="orange"
        button
        @click="pushMethod(key)"
        action
        action-label="content_copy"
        :copy-type="copyResults[key]?.copyType"
        @action="copyMethod(key)"
      >
        <template #button>{{ method.label }}</template>
      </BaseButton>
    </form>
  </div>
</template>

<style scoped></style>
