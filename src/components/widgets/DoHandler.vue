<script setup>
import { computed, reactive, ref } from "vue";
import { useMethodsStore } from "@/stores/methods.js";

import useMethodPusher from "@/hooks/push.js";
import useMethodCopier from "@/hooks/copy.js";

import BaseButton from "@/components/ui/BaseButton.vue";

const methodsStore = useMethodsStore();

const doMethods = computed(() => ({
  showChatbox: methodsStore.showChatbox,
  hideChatbox: methodsStore.hideChatbox,
  openChatbox: methodsStore.openChatbox,
  closeChatbox: methodsStore.closeChatbox,
  swapLeft: methodsStore.swapLeft,
  swapRight: methodsStore.swapRight,
  mute: methodsStore.mute,
  unmute: methodsStore.unmute,
}));

const copyResults = reactive({});
const successTimeoutIds = reactive({});

async function copyMethod(id) {
  if (!copyResults[id]) {
    copyResults[id] = reactive({ copyType: "" });
  }

  try {
    const result = await useMethodCopier(id);
    if (result) {
      setTimeout(() => {
        Object.assign(copyResults[id], result);
        navigator.clipboard.writeText(copyResults[id].copyValue);
      }, 1);

      if (successTimeoutIds[id]) {
        clearTimeout(successTimeoutIds[id]);
      }

      successTimeoutIds[id] = ref(
        setTimeout(() => {
          copyResults[id].copyType = "";
        }, 1000)
      );
    }
  } catch (error) {
    console.error("An app error occurred:", error);
  }
}

async function pushMethod(id) {
  try {
    const result = await useMethodPusher(id);

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
        :key="key"
        :id="method.id"
        color="orange"
        button
        @click="pushMethod(method.id)"
        action
        action-label="content_copy"
        :copy-type="copyResults[method.id]?.copyType"
        @action="copyMethod(method.id)"
      >
        <template #button>{{ method.label }}</template>
      </BaseButton>
    </form>
  </div>
</template>

<style scoped></style>
