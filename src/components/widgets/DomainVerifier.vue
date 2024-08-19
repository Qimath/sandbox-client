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
  const domainPattern = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/;
  return domainPattern.test(domain);
}

function formatValue(value, target) {
  const formattedValue = value || "No record found";
  const formattedTarget = target || "";

  return {
    value: formattedValue,
    target: formattedTarget,
  };
}

function getClassForValue(value) {
  if (value.toLowerCase().includes("no record found")) {
    return "no-record";
  }
  return "code-inline";
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
              <span class="code-inline">{{ result.expected.value }}</span
              >&nbsp; in &nbsp;<span class="code-inline">{{
                result.expected.target
              }}</span>
            </span>
          </div>
          <div
            class="retrieved"
            :class="{ success: result.found, failure: !result.found }"
          >
            <span class="item-title">
              Retrieved {{ result.retrieved[0].type }}:
            </span>
            <ul>
              <li v-for="(retrieved, idx) in result.retrieved" :key="idx">
                <span :class="getClassForValue(retrieved.value)">
                  {{ retrieved.value }} </span
                >&nbsp; in &nbsp;
                <span class="code-inline">{{ retrieved.target }}</span>
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
  font-size: 1.125rem;
  margin-bottom: 2rem;
  text-align: center;
}

p.success {
  color: var(--success-text);
}

p.failure {
  color: var(--error-text);
}

.success svg {
  fill: var(--success-text);
  margin-right: 0.5rem;
}

.failure svg {
  fill: var(--error-text);
  margin-right: 0.5rem;
}

.result-item {
  display: flex;
  flex-direction: column;
}

.result-item + .result-item {
}

.result-item + .result-item::before {
  content: "";
  position: relative;
  border-top: 1px solid var(--container-border);
  margin: 1.5rem 3rem;
}

.expected,
.retrieved {
  display: flex;
  flex-direction: column;
}

.result-item span.item-title {
  font-weight: 600;
}

.result-item .retrieved.success span.item-title {
  color: var(--success-text);
}

.result-item .retrieved.failure span.item-title {
  color: var(--error-text);
}

span.item-title,
span.item-content {
  line-height: 1.5rem;
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

ul {
  display: flex;
  flex-direction: column;
}

.item-content,
li {
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin: 0.25rem 0;
}

.item-content::before,
li::before {
  content: "•";
  margin-right: 0.5rem;
  font-size: 2rem;
  line-height: 1.5rem;
}

.code-inline {
  border: 1px solid var(--code-border);
  background-color: var(--code-bg);
  color: var(--code-color);
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
}

.no-record {
  border: 1px solid var(--code-border-alt);
  background-color: var(--code-bg-alt);
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
}
</style>
