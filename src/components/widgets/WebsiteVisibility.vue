<script setup>
import { computed, ref } from 'vue'
import { useConfigStore } from '../../stores/config.js'

import BaseButton from '../ui/BaseButton.vue'

const configStore = useConfigStore()
const websiteConfig = computed(() => configStore.website.config)

const isLoading = ref(false)
const gptResponse = ref('')

function formatSettings(settings) {
  return Object.entries(settings)
    .map(([key, value]) => `${key}: ${value}`)
    .join(',\n')
}

async function debugChatbox() {
  if (isLoading.value) return

  try {
    isLoading.value = true

    const url = window.location.href
    const { online, settings } = websiteConfig.value
    const relevantSettings = {
      online,
      website_url: settings.check_domain,
      hide_vacation: settings.hide_vacation,
      hide_on_away: settings.hide_on_away,
      hide_on_mobile: settings.hide_on_mobile,
      check_domain: settings.check_domain,
      allowed_pages: settings.allowed_pages,
      blocked_pages: settings.blocked_pages,
      blocked_countries: settings.blocked_countries,
      blocked_locales: settings.blocked_locales,
      blocked_ips: settings.blocked_ips
    }

    const formattedSettings = formatSettings(relevantSettings)

    const prompt = `current page: ${url}\nwebsite settings:\n${formattedSettings}`

    let response = await fetch('https://crisp-sandbox.netlify.app/.netlify/functions/troubleshoot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    })

    response = await response.json()
    gptResponse.value = response.message[0].message.content
    gptResponse.value = gptResponse.value.replace(/\n/g, '<br/>')
  } catch (error) {
    console.error('Error during fetch response: ', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="element">
    <div class="form">
      <BaseButton
        id="debugging-start"
        value="troubleshoot chatbox"
        color="green"
        button
        @click="debugChatbox"
        :loading="isLoading"
      />
      <div v-if="!isLoading && gptResponse !== ''" class="debugging-result">
        <pre v-html="gptResponse"></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.debugging-result {
  margin-top: 0.75rem;
  border: 1px solid var(--container-border);
  background: var(--main-bg-pri);
  width: 100%;
  max-height: 20rem;
  overflow-y: scroll;
}
pre {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  user-select: text;
  flex-wrap: wrap;
}

pre * {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  user-select: text;
  flex-wrap: wrap;
}
</style>
