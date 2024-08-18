<script setup>
import { computed, ref, reactive } from "vue";
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

function troubleshootingHelpers() {
  const helperTips = [];

  const { online, settings } = websiteConfig.value;

  if (!online && settings.hide_on_away) {
    helperTips.push(
      "The chatbox is not be visible, since the support team is offline while 'hide on away' is enabled"
    );
  }

  if (online && settings.hide_on_away) {
    helperTips.push(
      "The chatbox will be visible as long as the support is online. However, because 'hide on away' is enabled, the chatbox will become hidden once the support is offline."
    );
  }

  if (settings.check_domain) {
    helperTips.push(
      "'check domain' is enabled, if the chatbox is visible, it will only be the case on the domain specified"
    );
  }

  if (settings.allowed_pages && settings.allowed_pages.length > 0) {
    helperTips.push(
      "If an url is specified in 'allowed_pages', the chatbox will only be visible on these pages. No other pages will be able to display the chatbox."
    );
  }

  if (settings.hide_vacation) {
    helperTips.push(
      "'vacation mode' is active, the chatbox will be hidden on all pages, anywhere."
    );
  }

  return helperTips;
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

    // Call troubleshootingHelpers function to get the helper tips
    const helperTips = troubleshootingHelpers();

    // Convert helperTips array to string
    const helperTipsString = helperTips.join("\n");

    // Include helper tips in the prompt
    const prompt = `current page: ${url}\nwebsite settings:\n${formattedSettings}\n\nhelper tips:\n${helperTipsString}`;

    const locationOrigin = window.location.origin;

    let response = await fetch(
      locationOrigin + "/.netlify/functions/troubleshoot",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    response = await response.json();
    gptResponse.value = response.message;

    // Process the response for better formatting
    let sentences = gptResponse.value.split("\n");
    gptResponse.value = sentences
      .map((sentence) => `<p>${sentence}</p>`)
      .join("");
  } catch (error) {
    gptError.value =
      "Error: " +
      error.message +
      "<br>Try again, it might very well just work. Nobody knows how any of this works anyways.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="element">
    <div class="form">
      <BaseButton
        id="debugging-start"
        color="orange"
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
