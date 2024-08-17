<script setup>
import { ref, watch, toRaw, reactive, onMounted } from "vue";

import IconOpen from "@/assets/images/icons/IconOpen.vue";
import IconRefresh from "@/assets/images/icons/IconRefresh.vue";

defineEmits(["refresh"]);

const props = defineProps({
  refresh: {
    type: Boolean,
    default: false,
  },
  link: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  value: {
    type: [String, Object],
    default: "",
  },
  success: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  compact: {
    type: Boolean,
    default: false,
  },
});

const previousValue = ref(props.value);
const refreshSuccess = reactive({});
const holdInit = ref(true);

onMounted(() => {
  setTimeout(() => {
    holdInit.value = false;
  }, 1000);
});

watch(
  () => props.value,
  (newValue) => {
    if (typeof newValue === "string") {
      Object.keys(refreshSuccess).forEach((key) => {
        delete refreshSuccess[key];
      });

      if (previousValue.value !== newValue) {
        refreshSuccess["_"] = true;
        setTimeout(() => {
          refreshSuccess["_"] = false;
        }, 500);
      }
    } else {
      const newRefreshSuccess = {};

      for (const key in newValue) {
        if (previousValue.value[key] !== newValue[key]) {
          newRefreshSuccess[key] = true;
        } else {
          newRefreshSuccess[key] = refreshSuccess[key] || false;
        }
      }

      Object.assign(refreshSuccess, newRefreshSuccess);

      for (const key in newValue) {
        if (refreshSuccess[key] === true) {
          setTimeout(() => {
            refreshSuccess[key] = false;
          }, 500);
        }
      }
    }

    previousValue.value = toRaw(newValue);
  },
  { deep: true }
);
</script>

<template>
  <section
    class="output-container"
    :class="{
      compact: compact,
      hold: holdInit,
      error: !!error,
      success: !!success || refreshSuccess['_'],
    }"
  >
    <span class="label"
      >{{ label }}
      <span
        v-if="refresh && typeof value === 'object'"
        @click="$emit('refresh')"
        class="refresh"
      >
        <IconRefresh />
      </span>
    </span>

    <template
      v-if="
        typeof value === 'object' &&
        value !== null &&
        Object.keys(value).length > 0
      "
    >
      <div
        class="double"
        v-for="(pair, index) in Object.entries(value)"
        :key="index"
        :id="`${id}_${index + 1}`"
        :class="{ success: !!refreshSuccess[pair[0]] }"
      >
        <pre class="key">{{ pair[0] }}</pre>
        <pre class="value">{{ pair[1] }}</pre>
      </div>
    </template>
    <pre v-else-if="typeof value === 'string'">
      <span v-if="value !== '' && value !== 'N/A'">{{ value }}</span>
      <span v-else>N/A</span>
      <a v-if="link && value !== '' && value !== 'N/A'" :href="url" target="_blank">
      <span class="open">
        <IconOpen />
      </span>
    </a>
      <span v-if="refresh" @click="$emit('refresh')"
            class="refresh"
      >
        <IconRefresh />
      </span
      >
    </pre>
  </section>
</template>

<style scoped>
section {
  flex-direction: column;
  margin-top: 0.75rem;
  width: 100%;
}

section > section {
  margin-top: 0;
}

span.label {
  padding: 0.5rem 1rem;
  z-index: 1;
  transition: all 0.1s linear;
  color: var(--output-text);
  background: var(--output-head);
  border-left: 1px solid var(--output-border);
  border-right: 1px solid var(--output-border);
  border-top: 1px solid var(--output-border);
  font-weight: 600;
}

pre {
  padding: 1rem;
  width: 100%;
  background: var(--output-body);
  transition: all 0.2s linear;
  border: 1px solid var(--output-border);
  border-bottom: none;
  color: var(--output-text);
  white-space: nowrap;
  resize: none;
  overflow: hidden;
}

section:last-of-type > pre {
  border-bottom: 1px solid var(--output-border);
}

span.refresh,
a,
a span {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  right: 0;
  top: 0;
  height: 100%;
  width: 3rem;
  transition: all 0.1s linear;
  z-index: 1;
  user-select: none;
  -webkit-user-select: none;
}

span.refresh svg,
span.open svg {
  fill: var(--output-ref);
  height: 1.5rem;
  width: 1.5rem;
  transition: all 0.1s linear;
}

span.refresh:hover svg,
a:hover span svg {
  fill: var(--output-ref-hover);
  transform: scale(1.15);
}

span.refresh:active svg,
span.open:active svg {
  fill: var(--output-ref-active);
}

section:first-child,
section + section {
  margin-top: 0;
}

.output-container .label {
  border-top-left-radius: 0.25rem;
}

.output-container ~ .output-container .label {
  border-radius: 0;
}

.output-container:last-of-type pre {
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}

.output-container:last-of-type .label:last-child {
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}

.output-container:last-of-type .double pre {
  border-radius: 0;
}

div.double {
  flex-direction: row;
}

div.double pre {
  width: 50%;
}

.output-container div.double:last-of-type pre {
  border-bottom-left-radius: 0.25rem;
  border-bottom: 1px solid var(--output-border);
}

.output-container div.double:last-of-type pre + pre {
  border-radius: 0 0 0.25rem 0;
}

div.double pre + pre {
  border-left: none;
  background: var(--output-cell);
  width: 100%;
}

section.success pre,
div.success pre {
  animation: flashSuccess 0.5s infinite;
}

section.error pre {
  animation: flashError 0.5s infinite;
}

section.hold pre {
  color: var(--output-text) !important;
}

section.compact {
  flex-direction: row;
  border: none;
  border-bottom: 1px solid var(--container-bg);
  overflow: hidden;
}

section.compact:first-child {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

section.compact:first-child .label {
  border-top-right-radius: 0;
}

section.compact:last-child {
  flex-direction: row;
  border: none;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

section.compact:last-child pre {
  border-bottom-left-radius: 0;
}

section.compact span.label {
  width: 33%;
  border: none;
  border-right: 1px solid var(--container-bg);
  align-items: center;
}

section.compact pre {
  padding: 0.75rem 1rem;
  border: none;
}

@keyframes flashSuccess {
  0% {
    color: var(--output-text);
  }
  50% {
    color: var(--output-flash);
  }
  100% {
    color: var(--output-text);
  }
}

@keyframes flashError {
  0% {
    color: var(--output-text);
  }
  50% {
    color: var(--red-pri);
  }
  100% {
    color: var(--output-text);
  }
}
</style>
