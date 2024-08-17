<script setup>
import { ref, reactive, computed, onMounted, watch, nextTick } from "vue";
import { useUserStore } from "@/stores/user.js";
import { useConfigStore } from "@/stores/config.js";
import { useSettingsStore } from "@/stores/settings.js";

import useMethodCopier from "@/hooks/copy.js";

import BaseCheck from "@/components/ui/BaseCheck.vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";

import IconCopy from "@/assets/images/icons/IconCopy.vue";

const emit = defineEmits(["settings-result", "reset-settings"]);

const props = defineProps({
  setting: {
    type: String,
    default: "",
  },
  reset: {
    type: Boolean,
    default: false,
  },
  copy: {
    type: Boolean,
    default: false,
  },
});

const settingsStore = useSettingsStore();
const userStore = useUserStore();
const configStore = useConfigStore();

const selectedSetting = reactive({
  value: "",
  error: "",
  success: "",
});

const websiteId = computed(() => configStore.getWebsiteId);
const websiteName = computed(() => configStore.getConfig.website);
const websiteValidity = computed(() => configStore.getWebsiteValidity);

const cookieExpireSetting = computed(() => props.setting === "cookieExpire");
const localeSetting = computed(() => props.setting === "locale");
const gtmIdSetting = computed(() => props.setting === "gtmId");
const mainWebsiteSetting = computed(() => props.setting === "mainWebsite");

const dataInit = ref(false);

const copyResults = reactive({});
const successTimeoutIds = reactive({});

// Assign the selected setting object on component mounted
onMounted(async () => {
  if (!props.reset) {
    const value = userStore.getSetting(props.setting);
    const name = props.setting;
    Object.assign(
      selectedSetting,
      { value, name },
      settingsStore.getSetting(props.setting)
    );
  }
  await nextTick();
  dataInit.value = true;
});

// Handle the mainWebsite setting
function mainWebsiteHandler() {
  if (!websiteValidity.value) {
    selectedSetting.error = `Website ID <strong>${websiteId.value}</strong> is not valid. Cannot be set as main website.`;
    emit("settings-result", selectedSetting);
  } else {
    selectedSetting.value = {
      id: websiteId,
      name: websiteName,
    };
    updateSetting(selectedSetting.name, selectedSetting.value);
  }
}

// Update the user setting & emits the result
async function updateSetting(setting, value) {
  if (!dataInit.value) return;

  selectedSetting.success = "";
  selectedSetting.error = "";

  if (setting === "cookieExpire") {
    value = Number(value);
  }

  try {
    await userStore.setSetting(setting, value);
    selectedSetting.success = `Setting ${setting} updated successfully!`;
  } catch (error) {
    selectedSetting.error = error.message;
  } finally {
    emit("settings-result", selectedSetting);
  }
}

// handle sdk methods copy
async function copyMethod(id) {
  if (!copyResults[id]) {
    copyResults[id] = reactive({ copyType: "" });
  }

  try {
    const result = await useMethodCopier(id);
    if (result) {
      setTimeout(() => {
        Object.assign(copyResults[id], result);
        navigator.clipboard.writeText(copyResults[id].copyValue);
      }, 1);

      if (successTimeoutIds[id]) {
        clearTimeout(successTimeoutIds[id]);
      }

      successTimeoutIds[id] = ref(
        setTimeout(() => {
          copyResults[id].copyType = "";
        }, 1000)
      );
    }
  } catch (error) {
    console.error("An app error occurred:", error);
  }
}

// Update the selected setting value when the setting in the store changes
watch(
  () => {
    if (props.setting) {
      return userStore.getSetting(props.setting);
    }
  },
  (newValue) => {
    if (newValue !== undefined) {
      selectedSetting.value = newValue;
    }
  }
);

// Watches for changes in lockMaximized
watch(
  () => userStore.options.lockMaximized,
  (newVal) => {
    if (newVal) {
      updateSetting("lockFullview", false);
    }
  }
);

// Watches for changes in lockFullview
watch(
  () => userStore.options.lockFullview,
  (newVal) => {
    if (newVal) {
      updateSetting("lockMaximized", false);
    }
  }
);
</script>

<template>
  <div class="element">
    <div class="form">
      <div v-if="reset" class="setting-container">
        <div class="label">
          <label for="reset-settings">Restore default settings</label>
        </div>
        <div class="setting-item">
          <BaseButton
            id="reset-settings"
            color="red"
            @click="$emit('reset-settings')"
            button
          >
            <template #button>reset settings</template>
          </BaseButton>
        </div>
      </div>
      <div v-else class="setting-container">
        <div>
          <div v-if="copy" class="copy-method">
            <span
              @click="copyMethod(props.setting)"
              ><IconCopy /></span
            >
            <span
              v-if="copy && copyResults[props.setting]?.copyType"
              class="copy-type"
              >{{ copyResults[props.setting]?.copyType }}</span
            >
          </div>
          <div class="label">
            <label v-if="mainWebsiteSetting" :for="selectedSetting.id">
              {{ selectedSetting.label }}
              <strong>{{ selectedSetting.value.name }}</strong>
            </label>
            <label v-else :for="selectedSetting.id">{{
              selectedSetting.label
            }}</label>
          </div>
        </div>
        <div class="setting-item">
          <BaseSelect
            v-if="localeSetting"
            :id="selectedSetting.id"
            v-model:value="selectedSetting.value"
            :options="selectedSetting.languages"
            :label="selectedSetting.desc"
            @update:value="
              updateSetting(selectedSetting.name, selectedSetting.value)
            "
          />
          <BaseInput
            v-else-if="cookieExpireSetting"
            :id="selectedSetting.id"
            :label="selectedSetting.desc"
            v-model:value="selectedSetting.value"
            @update:value="
              updateSetting(selectedSetting.name, selectedSetting.value)
            "
            type="number"
          />
          <BaseInput
            v-else-if="gtmIdSetting"
            :id="selectedSetting.id"
            :label="selectedSetting.desc"
            v-model:value="selectedSetting.value"
            @update:value="
              updateSetting(selectedSetting.name, selectedSetting.value)
            "
          />
          <BaseButton
            v-else-if="mainWebsiteSetting"
            :id="selectedSetting.id"
            color="blue"
            @click="mainWebsiteHandler"
            button
          >
            <template #button>set main website</template>
          </BaseButton>
          <BaseCheck
            v-else
            :id="selectedSetting.id"
            :label="selectedSetting.label"
            v-model:value="selectedSetting.value"
            @update:value="
              updateSetting(selectedSetting.name, selectedSetting.value)
            "
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
  align-items: center;
}

div.setting-item {
  width: 15rem;
  justify-content: flex-end;
  margin-left: 2rem;
}

div.copy-method {
  margin-right: 1rem;
  transition: all 0.1s linear;
}

div.copy-method span {
  padding: 0.25rem;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}

div.copy-method span svg {
  fill: var(--orange-duo);
  height: 1.5rem;
  width: 1.5rem;
  transition: all 0.1s linear;
}

div.copy-method:hover span svg {
  fill: var(--orange-pri);
}

div.copy-method:active span svg {
  fill: var(--orange-tri);
}

div > span.copy-type {
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  left: 2.5rem;
  top: -0.625rem;
  user-select: none;
  -webkit-user-select: none;
  color: var(--main-text-reverse);
  background: var(--orange-pri);
  padding: 0.625rem 1.25rem 0.75rem 1.25rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 700;
  z-index: 100;
  box-shadow: var(--main-shadow) 0 0 0.5rem, var(--main-shadow) 0 0 0.5rem;
}

div > span.copy-type::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  left: 0;
  top: 50%;
  border: 0.75rem solid transparent;
  border-right-color: var(--orange-pri);
  border-left: 0;
  margin-top: -0.75rem;
  margin-left: -0.5rem;
  z-index: 100;
}
</style>
