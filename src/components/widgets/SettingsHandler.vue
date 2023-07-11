<script setup>
import { reactive, computed, onMounted, watch } from 'vue'
import { useUserStore } from '../../stores/user.js'

import userSettingsUpdater from '../../hooks/settings.js'

import BaseCheck from '../ui/BaseCheck.vue'
import BaseSelect from '../ui/BaseSelect.vue'
import BaseButton from '../ui/BaseButton.vue'
import BaseInput from '../ui/BaseInput.vue'

const emit = defineEmits(['settings-result', 'reset-settings'])

const props = defineProps({
  settingId: {
    type: String,
    default: ''
  }
})

const userStore = useUserStore()
const selectedSetting = reactive({
  value: '',
  error: '',
  success: ''
})

onMounted(() => {
  if (props.settingId === 'reset-settings') {
    Object.assign(selectedSetting, {
      id: 'reset-settings',
      color: 'red',
      value: 'reset settings',
      label: 'Restore default settings'
    })
  } else {
    Object.assign(selectedSetting, userStore.getSettingById(props.settingId))
  }
})

const isSetCookieSetting = computed(() => selectedSetting.id === 'setting-cookie')
const isSetLocaleSetting = computed(() => selectedSetting.id === 'setting-locale')
const isSetResetSettings = computed(() => selectedSetting.id === 'reset-settings')

async function updateSetting(id, value) {
  selectedSetting.success = ''
  selectedSetting.error = ''

  try {
    const result = await userSettingsUpdater(id, value)

    if (result) {
      if (result.error && result.error !== '') {
        setTimeout(() => {
          selectedSetting.error = result.error
          emit('settings-result', selectedSetting)
        }, 1)
      }

      if (result.success && result.success !== '') {
        selectedSetting.success = result.success
        emit('settings-result', selectedSetting)
      }
    }
  } catch (error) {
    console.error('An app error occurred:', error)
    selectedSetting.error = 'App error: Settings'
    emit('settings-result', selectedSetting)
  }
}

// Watch for changes in lockMaximized and update lockFullview accordingly
watch(
  () => userStore.settings.lockMaximized.value,
  (newVal) => {
    if (newVal) {
      updateSetting(userStore.settings.lockFullview.id, false)
    }
    Object.assign(selectedSetting, userStore.getSettingById(props.settingId))
  }
)

// Watch for changes in lockFullview and update lockMaximized accordingly
watch(
  () => userStore.settings.lockFullview.value,
  (newVal) => {
    if (newVal) {
      updateSetting(userStore.settings.lockMaximized.id, false)
    }
    Object.assign(selectedSetting, userStore.getSettingById(props.settingId))
  }
)

// Watch for changes for theme detection preferences
watch(
  () => userStore.preferences.themeDetect.value,
  () => {
    Object.assign(selectedSetting, userStore.getSettingById(props.settingId))
  }
)
</script>

<template>
  <div class="element" v-if="selectedSetting.id">
    <div class="form">
      <div class="setting-container">
        <div class="label">
          <label :for="selectedSetting.id">{{ selectedSetting.label }}</label>
        </div>
        <div class="setting-item">
          <BaseSelect
            v-if="isSetLocaleSetting"
            :id="selectedSetting.id"
            v-model:value="selectedSetting.value"
            :options="selectedSetting.options"
            :name="selectedSetting.name"
            @update:value="updateSetting(selectedSetting.id, selectedSetting.value)"
          />
          <BaseInput
            v-else-if="isSetCookieSetting"
            :id="selectedSetting.id"
            :label="selectedSetting.name"
            v-model:value="selectedSetting.value"
            @update:value="updateSetting(selectedSetting.id, selectedSetting.value)"
            number
            :copy="false"
          />
          <BaseButton
            v-else-if="isSetResetSettings"
            :id="selectedSetting.id"
            :color="selectedSetting.color"
            :value="selectedSetting.value"
            @click="$emit('reset-settings')"
            button
          />
          <BaseCheck
            v-else
            :id="selectedSetting.id"
            :label="selectedSetting.label"
            v-model:value="selectedSetting.value"
            @update:value="updateSetting(selectedSetting.id, selectedSetting.value)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div.setting-container {
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

div.label label {
  font-size: 1rem;
  color: var(--main-text-normal);
}

div.setting-item {
  width: 15rem;
  justify-content: flex-end;
  margin-left: 2rem;
}
</style>
