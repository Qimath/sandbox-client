<script setup>
import { onMounted } from 'vue'

import BaseContainer from '../components/ui/BaseContainer.vue'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseBanner from '../components/ui/BaseBanner.vue'
import SettingsHandler from '../components/widgets/SettingsHandler.vue'

import { useBanner } from '../hooks/banner.js'

const { bannerOptions, displayBanner, closeBanner } = useBanner()

function settingsResultHandler(value) {
  let currentStatus = ''

  if (value.error && value.error !== '') {
    currentStatus = 'error'
  } else if (value.error === '' && value.success && value.success !== '') {
    currentStatus = 'success'
  }

  if (currentStatus === 'error') {
    displayBanner({
      message: 'There was an error saving these settings: ' + value.error,
      type: 'error',
      animate: true
    })
  } else if (currentStatus === 'success') {
    displayBanner({
      message: 'Settings saved successfully! Some changes require the app to be restarted.',
      type: 'info',
      action: 'reload',
      animate: false
    })
  }
}

function handleBannerAction(action) {
  if (action === 'reload') {
    window.sessionStorage.setItem('settingsSaved', 'true')
    window.location.reload()
  }
}

function resetSettings() {
  localStorage.removeItem('user')

  window.sessionStorage.removeItem('settingsSaved')
  window.sessionStorage.setItem('settingsReset', 'true')
  window.location.reload()
}

onMounted(() => {
  if (window.sessionStorage.getItem('settingsSaved')) {
    displayBanner({
      message: 'Settings have been applied and loaded successfully!',
      type: 'success',
      animate: true
    })

    window.sessionStorage.removeItem('settingsSaved')
  }

  if (window.sessionStorage.getItem('settingsReset')) {
    displayBanner({
      message: 'Default settings have been restored.',
      type: 'warning',
      animate: true
    })

    window.sessionStorage.removeItem('settingsReset')
  }
})
</script>

<template>
  <div class="view-wrapper">
    <BaseContainer grow>
      <template #container>
        <BaseCard>
          <template #card>
            <SettingsHandler
              setting-id="preference-theme"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler
              setting-id="preference-storage"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler setting-id="preference-gtm" @settingsResult="settingsResultHandler" />
          </template>
        </BaseCard>
        <BaseCard>
          <template #card>
            <SettingsHandler setting-id="setting-merge" @settingsResult="settingsResultHandler" />
            <SettingsHandler
              setting-id="setting-maximized"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler
              setting-id="setting-fullview"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler
              setting-id="setting-safemode"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler setting-id="setting-cookie" @settingsResult="settingsResultHandler" />
            <SettingsHandler setting-id="setting-locale" @settingsResult="settingsResultHandler" />
          </template>
        </BaseCard>
        <BaseCard>
          <template #card>
            <SettingsHandler setting-id="reset-settings" @resetSettings="resetSettings" />
          </template>
        </BaseCard>
      </template>
    </BaseContainer>

    <BaseContainer grow>
      <template #container>
        <BaseCard>
          <template #card>
            <SettingsHandler
              setting-id="callback-session-loaded"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler
              setting-id="callback-chat-initiated"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler
              setting-id="callback-chat-opened"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler
              setting-id="callback-chat-closed"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler
              setting-id="callback-message-sent"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler
              setting-id="callback-message-received"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler
              setting-id="callback-nickname-changed"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler
              setting-id="callback-email-changed"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler
              setting-id="callback-phone-changed"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler
              setting-id="callback-avatar-changed"
              @settingsResult="settingsResultHandler"
            />
          </template>
        </BaseCard>
      </template>
    </BaseContainer>

    <teleport to="#app">
      <transition name="banner" mode="out-in">
        <BaseBanner
          v-if="bannerOptions.visibility"
          @bannerClose="closeBanner"
          @bannerAction="handleBannerAction"
          :message="bannerOptions.message"
          :action="bannerOptions.action"
          :animate="bannerOptions.animate"
          :type="bannerOptions.type"
        />
      </transition>
    </teleport>
  </div>
</template>

<style scoped></style>
