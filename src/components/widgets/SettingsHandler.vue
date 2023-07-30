<script setup>
import { ref, reactive, computed, onMounted, watch, nextTick } from "vue";
import { useUserStore } from "@/stores/user.js";
import { useConfigStore } from "@/stores/config.js";
import { useSettingsStore } from "@/stores/settings.js";

import BaseCheck from "@/components/ui/BaseCheck.vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";

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

  try {
    await userStore.setSetting(setting, value);
    selectedSetting.success = `Setting ${setting} updated successfully!`;
  } catch (error) {
    selectedSetting.error = error.message;
  } finally {
    emit("settings-result", selectedSetting);
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
        <div class="label">
          <label v-if="mainWebsiteSetting" :for="selectedSetting.id">
            {{ selectedSetting.label }}
            <strong>{{ selectedSetting.value.name }}</strong>
          </label>
          <label v-else :for="selectedSetting.id">{{
            selectedSetting.label
          }}</label>
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
            color="green"
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
}

div.setting-item {
  width: 15rem;
  justify-content: flex-end;
  margin-left: 2rem;
}
</style>
