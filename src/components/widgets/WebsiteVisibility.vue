<script setup>
import { computed, ref } from "vue";
import { useConfigStore } from "@/stores/config.js";

import BaseButton from "@/components/ui/BaseButton.vue";

const configStore = useConfigStore();
const websiteConfig = computed(() => configStore.getConfig);

const isLoading = ref(false);
const gptResponse = ref("");
const gptError = ref("");

function formatSettings(settings) {
  return Object.entries(settings)
    .map(([key, value]) => `${key}: ${value}`)
    .join(",\n");
}

async function debugChatbox() {
  if (isLoading.value) return;

  gptError.value = "";

  try {
    isLoading.value = true;

    const url = window.location.href;
    const { online, settings } = websiteConfig.value;
    const relevantSettings = {
      online,
      website_url: settings.check_domain,
      hide_vacation: settings.hide_vacation,
      hide_on_away: settings.hide_on_away,
      check_domain: settings.check_domain,
      allowed_pages: settings.allowed_pages,
      blocked_pages: settings.blocked_pages,
      blocked_countries: settings.blocked_countries,
      blocked_locales: settings.blocked_locales,
    };

    const formattedSettings = formatSettings(relevantSettings);

    const prompt = `current page: ${url}\nwebsite settings:\n${formattedSettings}`;

    let response = await fetch(
      "https://crisp-sandbox.netlify.app/.netlify/functions/troubleshoot",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    response = await response.json();
    gptResponse.value = response.message[0].message.content;

    // Process the response for better formatting
    let sentences = gptResponse.value.split("\n");
    gptResponse.value = sentences
      .map((sentence) => `<p>${sentence}</p>`)
      .join("");
  } catch (error) {
    gptError.value =
      "Error: " +
      error.message +
      "<br>Try again, it might very well just work. Nobody knows how any of this shit works anyways.";
  } finally {
    isLoading.value = false;
    console.log("response: ", response)
    console.log("gptResponse.value: ", gptResponse.value)
    console.log("gptResponse.value: ", gptResponse.value)
  }
}
</script>

<template>
  <div class="element">
    <div class="form">
      <BaseButton
        id="debugging-start"
        color="green"
        button
        @click="debugChatbox"
        :loading="isLoading"
      >
        <template #button>troubleshoot chatbox</template>
      </BaseButton>
      <div
        v-if="!isLoading && !gptError && gptResponse !== ''"
        class="debugging-result"
      >
        <pre v-html="gptResponse"></pre>
      </div>
      <div v-if="!isLoading && gptError !== ''" class="debugging-error">
        <pre v-html="gptError"></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.debugging-result {
  margin-top: 0.75rem;
  border: 1px solid var(--container-border);
  border-radius: 0.25rem;
  background: var(--main-bg-pri);
  width: 100%;
  max-height: 20rem;
  overflow-y: scroll;
}

.debugging-error {
  margin-top: 0.75rem;
  border: 1px solid var(--container-border);
  border-radius: 0.25rem;
  background: var(--main-bg-pri);
  width: 100%;
  max-height: 20rem;
  overflow-y: scroll;
  color: var(--error-text);
}

pre {
  width: 100%;
  padding: 1.5rem;
  font-size: 1rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  flex-wrap: wrap;
}

pre * {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  flex-wrap: wrap;
}
</style>
