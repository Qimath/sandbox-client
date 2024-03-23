<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useMethodsStore } from "@/stores/methods.js";

import useMethodGenerator from "@/hooks/generate.js";
import useMethodPusher from "@/hooks/push.js";
import useMethodCopier from "@/hooks/copy.js";

import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const props = defineProps({
  method: {
    type: String,
    default: "",
  },
});

const methodsStore = useMethodsStore();
const selectedMethod = reactive({
  name: props.method,
  value: "",
  error: "",
  success: "",
});

onMounted(() => {
  Object.assign(selectedMethod, methodsStore.getMethod(selectedMethod.name));

  if (selectedMethod.name === "data") {
    selectedMethod.value = {
      dataKey: "",
      dataValue: "",
    };
  }
});

const isSetSessionData = computed(() => selectedMethod.name === "data");
const isTextArea = computed(
  () =>
    selectedMethod.name === "sendMessage" ||
    selectedMethod.name === "showMessage"
);

const copyResult = reactive({});

watch(
  () => selectedMethod.value,
  (newValue) => {
    if (!!selectedMethod.error && newValue !== "") {
      selectedMethod.error = "";
    }
  }
);

async function copyMethod() {
  try {
    const result = await useMethodCopier(
      selectedMethod.name,
      selectedMethod.value
    );
    if (result) {
      setTimeout(() => {
        Object.assign(copyResult, result);
        navigator.clipboard.writeText(copyResult.copyValue);
      }, 1);

      if (copyMethod.successTimeoutId) {
        clearTimeout(copyMethod.successTimeoutId.value);
      }

      copyMethod.successTimeoutId = ref(
        setTimeout(() => {
          copyResult.copyType = "";
        }, 1000)
      );
    }
  } catch (error) {
    console.error("An app error occurred:", error);
    selectedMethod.error = "App error: Copy";
  }
}

async function generateMethod() {
  try {
    const generatedValue = await useMethodGenerator(selectedMethod.name);

    if (selectedMethod.id === "data") {
      selectedMethod.value.dataKey = generatedValue.dataKey;
      selectedMethod.value.dataValue = generatedValue.dataValue;
    } else {
      selectedMethod.value = generatedValue;
    }

    await pushMethod();
  } catch (error) {
    console.error("An app error occurred:", error);
    selectedMethod.error = "App error: Generate";
  }
}

async function pushMethod() {
  selectedMethod.success = "";
  selectedMethod.error = "";

  try {
    const result = await useMethodPusher(
      selectedMethod.name,
      selectedMethod.value
    );

    if (result) {
      if (result.error && result.error !== "") {
        setTimeout(() => {
          selectedMethod.error = result.error;
        }, 1);
      }

      if (result.success && result.success !== "") {
        if (pushMethod.successTimeoutId) {
          clearTimeout(pushMethod.successTimeoutId.value);
        }

        selectedMethod.success = result.success;
        pushMethod.successTimeoutId = ref(
          setTimeout(() => {
            selectedMethod.success = "";
          }, 1000)
        );
      }
    }
  } catch (error) {
    console.error("An app error occurred:", error);
    selectedMethod.error = "App error: Push";
  }
}
</script>

<template>
  <div class="element" v-if="selectedMethod.id">
    <form @submit.prevent="pushMethod()" :name="'form-' + selectedMethod.id">
      <div class="dual" v-if="isSetSessionData">
        <BaseInput
          :id="'push-' + selectedMethod.dataKey.id + '_key'"
          :label="selectedMethod.dataKey.label"
          :error="selectedMethod.error"
          :success="selectedMethod.success"
          :icon="selectedMethod.dataKey.icon"
          v-model:value="selectedMethod.value.dataKey"
          :copy-type="copyResult.copyType"
          @action="copyMethod"
          action
          action-type="simple"
          action-label="content_copy"
        />
        <BaseInput
          :id="'push-' + selectedMethod.dataValue.id + '_value'"
          :label="selectedMethod.dataValue.label"
          :error="selectedMethod.error"
          :success="selectedMethod.success"
          :icon="selectedMethod.dataValue.icon"
          v-model:value="selectedMethod.value.dataValue"
          :copy-type="copyResult.copyType"
          @action="copyMethod"
          action
          action-type="simple"
          action-label="content_copy"
        />
      </div>
      <BaseInput
        v-else
        :id="'push-' + selectedMethod.id"
        :label="selectedMethod.label"
        :error="selectedMethod.error"
        :success="selectedMethod.success"
        :icon="selectedMethod.icon"
        v-model:value="selectedMethod.value"
        :textarea="isTextArea"
        :copy-type="copyResult.copyType"
        @action="copyMethod"
        action
        action-type="simple"
        action-label="content_copy"
      />
      <BaseButton
        :id="'submit-push-' + selectedMethod.id"
        color="default"
        value="submit"
      />
      <BaseButton
        :id="'generate-' + selectedMethod.id"
        color="blue"
        button
        @click="generateMethod"
      >
        <template #button>generate</template>
      </BaseButton>
    </form>
  </div>
</template>

<style scoped></style>
