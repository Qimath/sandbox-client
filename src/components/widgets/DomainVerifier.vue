<script setup>
import { computed, ref } from "vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import { useConfigStore } from "@/stores/config.js";

import IconSuccess from "@/assets/images/icons/IconSuccess.vue";
import IconError from "@/assets/images/icons/IconError.vue";

const configStore = useConfigStore();
const websiteId = computed(() => configStore.getWebsiteId);

const domainTypes = {
  "Email Domain": "email",
  "Status Page": "status",
  Helpdesk: "helpdesk",
};

const selectedType = ref("email"); // Default value to "email"
const domainName = ref("");
const isLoading = ref(false);
const debugResult = ref(null); // Adjusted to hold an object instead of string
const debugError = ref("");

function cleanDomainInput(domain) {
  return domain
    .trim()
    .replace(/(^\w+:|^)\/\//, "")
    .replace(/\/.*$/, "")
    .toLowerCase();
}

async function debugDomain() {
  if (isLoading.value) return;

  debugError.value = "";
  debugResult.value = null;

  try {
    isLoading.value = true;

    const cleanedDomain = cleanDomainInput(domainName.value);

    if (!cleanedDomain || !isValidDomain(cleanedDomain)) {
      debugError.value = "Please enter a valid domain name.";
      return;
    }

    const requestBody = {
      domain: cleanedDomain,
      websiteId: websiteId.value,
      type: selectedType.value,
    };
    const locationOrigin = window.location.origin;

    const response = await fetch(
      locationOrigin + "/.netlify/functions/dns-check",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    const data = await response.json();

    if (response.ok) {
      debugResult.value = data; // Store the entire response
    } else {
      debugError.value = data.error;
    }
  } catch (error) {
    debugError.value = "Error: " + error.message;
  } finally {
    isLoading.value = false;
  }
}

function isValidDomain(domain) {
  // Simple regex to check for a valid domain
  const domainPattern = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/;
  return domainPattern.test(domain);
}

function formatValue(value, target) {
  if (!value || value === "No record found") {
    return `No record found in "${target}"`;
  }
  return `"${value}" in "${target}"`;
}
</script>

<template>
  <div class="element">
    <div class="form">
      <div class="group">
        <BaseInput
          id="domain-name"
          v-model:value="domainName"
          label="Domain"
          icon="link"
          type="text"
        />
        <BaseSelect
          id="domain-type"
          v-model:value="selectedType"
          :options="domainTypes"
          label="Type"
        />
      </div>
      <BaseButton
        id="debugging-start"
        color="orange"
        button
        @click="debugDomain"
        :loading="isLoading"
      >
        <template #button>troubleshoot domain</template>
      </BaseButton>

      <div v-if="!isLoading && debugResult" class="debugging-result">
        <p
          :class="{
            success: debugResult.success,
            failure: !debugResult.success,
          }"
        >
          <IconSuccess v-if="debugResult.success" />
          <IconError v-else />
          {{
            debugResult.success
              ? "DNS configuration is valid"
              : "DNS configuration is incorrect"
          }}
        </p>

        <div
          v-for="(result, index) in debugResult.data"
          :key="index"
          class="result-item"
        >
          <div
            class="expected"
            :class="{ success: result.found, failure: !result.found }"
          >
            <span class="item-title">Expected {{ result.expected.type }}:</span>
            <span class="item-content">
              {{ formatValue(result.expected.value, result.expected.target) }}
            </span>
          </div>
          <div
            class="retrieved"
            :class="{ success: result.found, failure: !result.found }"
          >
            <span class="item-title"
              >Retrieved {{ result.retrieved[0].type }}:</span
            >
            <ul>
              <li v-for="(retrieved, idx) in result.retrieved" :key="idx">
                {{ formatValue(retrieved.value, retrieved.target) }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div v-if="!isLoading && debugError" class="debugging-error">
        <pre>{{ debugError }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.group div + div {
  width: 50%;
  margin-left: 0.75rem;
}

.debugging-result,
.debugging-error {
  display: flex;
  flex-direction: column;
  margin-top: 0.75rem;
  border: 1px solid var(--container-border);
  border-radius: 0.25rem;
  background: var(--main-bg-pri);
  width: 100%;
  max-height: 20rem;
  overflow-y: scroll;
  overflow-x: scroll;
  padding: 1rem;
}

p.success,
p.failure {
  display: inline-flex;
  justify-content: center;
  align-content: center;
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 2rem;
  text-align: center;
}

p.success {
  color: var(--green-duo);
}

p.failure {
  color: var(--red-duo);
}

.success svg {
  fill: var(--green-duo);
  margin-right: 0.5rem;
}

.failure svg {
  fill: var(--red-duo);
  margin-right: 0.5rem;
}

.result-item {
  display: flex;
  flex-direction: column;
}

.result-item + .result-item {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
}

.expected,
.retrieved {
  display: flex;
  flex-direction: column;
}

.result-item span.item-title {
  font-weight: 600;
}

.result-item .success span.item-title {
  color: var(--green-duo);
}

.result-item .failure span.item-title {
  color: var(--red-duo);
}

.retrieved {
  margin-top: 0.5rem;
}

.retrieved ul {
  list-style-type: none;
  padding-left: 0;
}

.debugging-error {
  color: var(--error-text);
}
</style>
