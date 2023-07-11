import { reactive } from 'vue'
import { useUserStore } from './../stores/user.js'

const userStore = useUserStore()

function updateSetting(id, value, successMessage) {
  const result = reactive({})

  try {
    userStore.updateSettingValue(id, value)
    result.value = value
    result.success = successMessage
  } catch (error) {
    console.error(error)
    result.error = error.message
  }

  return result
}

export default function useSettingsUpdater(id, value) {
  const settings = {
    'preference-theme': () => updateSetting(id, value, 'Theme preferences updated'),
    'preference-storage': () => updateSetting(id, value, 'LocalStorage preferences updated'),
    'preference-gtm': () => updateSetting(id, value, 'Google Tag Manager preferences updated'),
    'setting-locale': () => updateSetting(id, value, 'Chatbox language settings updated'),
    'setting-merge': () => updateSetting(id, value, 'Session merge settings updated'),
    'setting-maximized': () => updateSetting(id, value, 'Maximized settings updated'),
    'setting-fullview': () => updateSetting(id, value, 'Fullview settings updated'),
    'setting-safemode': () => updateSetting(id, value, 'Safe mode settings updated'),
    'setting-cookie': () => updateSetting(id, value === '' ? null : Number(value), 'Cookies expiration date updated'),
    'callback-session-loaded': () => updateSetting(id, value, 'Callback settings on session loaded updated'),
    'callback-chat-initiated': () => updateSetting(id, value, 'Callback settings on chat initiated updated'),
    'callback-chat-opened': () => updateSetting(id, value, 'Callback settings on session chat opened updated'),
    'callback-chat-closed': () => updateSetting(id, value, 'Callback settings on session chat closed updated'),
    'callback-message-received': () => updateSetting(id, value, 'Callback settings on session chat opened updated'),
    'callback-message-sent': () => updateSetting(id, value, 'Callback settings on session chat closed updated'),
    'callback-nickname-changed': () => updateSetting(id, value, 'Callback settings on nickname changed updated'),
    'callback-email-changed': () => updateSetting(id, value, 'Callback settings on email changed updated'),
    'callback-phone-changed': () => updateSetting(id, value, 'Callback settings on phone changed updated'),
    'callback-avatar-changed': () => updateSetting(id, value, 'Callback settings on avatar changed updated'),
  }

  return settings[id] ? settings[id]() : null
}
