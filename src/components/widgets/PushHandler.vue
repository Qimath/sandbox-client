<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useMethodsStore } from '../../stores/methods.js'

import useMethodGenerator from '../../hooks/generate.js'
import useMethodPusher from '../../hooks/push.js'
import useMethodCopier from '../../hooks/copy.js'

import BaseInput from '../ui/BaseInput.vue'
import BaseButton from '../ui/BaseButton.vue'

const props = defineProps({
  methodId: {
    type: String,
    default: ''
  }
})

const methodsStore = useMethodsStore()
const selectedMethod = reactive({
  value: '',
  error: '',
  success: ''
})

onMounted(() => {
  Object.assign(selectedMethod, methodsStore.getMethodById(props.methodId))

  if (selectedMethod.id === 'session-data') {
    selectedMethod.value = {
      dataKey: '',
      dataValue: ''
    }
  }
})

const isSetSessionData = computed(() => selectedMethod.id === 'session-data')
const isTextArea = computed(
  () => selectedMethod.id === 'send-message' || selectedMethod.id === 'show-message'
)

const copyResult = reactive({})

watch(
  () => selectedMethod.value,
  (newValue) => {
    if (!!selectedMethod.error && newValue !== '') {
      selectedMethod.error = ''
    }
  }
)

async function copyMethod() {
  copyResult.copyType = ''

  try {
    const result = await useMethodCopier(selectedMethod.id, selectedMethod.value)
    if (result) {
      setTimeout(() => {
        Object.assign(copyResult, result)
        navigator.clipboard.writeText(copyResult.copyValue)
      }, 1)

      if (copyMethod.successTimeoutId) {
        clearTimeout(copyMethod.successTimeoutId.value)
      }

      copyMethod.successTimeoutId = ref(
        setTimeout(() => {
          copyResult.copyType = ''
        }, 500)
      )
    }
  } catch (error) {
    console.error('An app error occurred:', error)
    selectedMethod.error = 'App error: Copy'
  }
}

async function generateMethod() {
  try {
    const generatedValue = await useMethodGenerator(selectedMethod.id)

    if (selectedMethod.id === 'session-data') {
      selectedMethod.value.dataKey = generatedValue.dataKey
      selectedMethod.value.dataValue = generatedValue.dataValue
    } else {
      selectedMethod.value = generatedValue
    }

    await pushMethod()
  } catch (error) {
    console.error('An app error occurred:', error)
    selectedMethod.error = 'App error: Generate'
  }
}

async function pushMethod() {
  selectedMethod.success = ''
  selectedMethod.error = ''

  try {
    const result = await useMethodPusher(selectedMethod.id, selectedMethod.value)

    if (result) {
      if (result.error && result.error !== '') {
        setTimeout(() => {
          selectedMethod.error = result.error
        }, 1)
      }

      if (result.success && result.success !== '') {
        if (pushMethod.successTimeoutId) {
          clearTimeout(pushMethod.successTimeoutId.value)
        }

        selectedMethod.success = result.success
        pushMethod.successTimeoutId = ref(
          setTimeout(() => {
            selectedMethod.success = ''
          }, 1000)
        )
      }
    }
  } catch (error) {
    console.error('An app error occurred:', error)
    selectedMethod.error = 'App error: Push'
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
          :copyType="copyResult.copyType"
          @copy="copyMethod"
        />
        <BaseInput
          :id="'push-' + selectedMethod.dataValue.id + '_value'"
          :label="selectedMethod.dataValue.label"
          :error="selectedMethod.error"
          :success="selectedMethod.success"
          :icon="selectedMethod.dataValue.icon"
          v-model:value="selectedMethod.value.dataValue"
          :copyType="copyResult.copyType"
          @copy="copyMethod"
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
        :copyType="copyResult.copyType"
        @copy="copyMethod"
      />
      <BaseButton :id="'submit-push-' + selectedMethod.id" color="default" value="submit" />
      <BaseButton
        :id="'generate-' + selectedMethod.id"
        color="blue"
        value="generate"
        button
        @click="generateMethod"
      />
    </form>
  </div>
</template>

<style scoped></style>
