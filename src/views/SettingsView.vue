<script setup>
import { onMounted } from "vue";

import BaseContainer from "@/components/ui/BaseContainer.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseBanner from "@/components/ui/BaseBanner.vue";
import SettingsHandler from "@/components/widgets/SettingsHandler.vue";

import { useBanner } from "@/hooks/banner.js";

const { bannerOptions, displayBanner, closeBanner } = useBanner();

function settingsResultHandler(value) {
  let currentStatus = "";

  if (value.error && value.error !== "") {
    currentStatus = "error";
  } else if (value.error === "" && value.success && value.success !== "") {
    currentStatus = "success";
  }

  if (currentStatus === "error") {
    displayBanner({
      message: "There was an error saving these settings: " + value.error,
      type: "error",
      animate: true,
    });
  } else if (currentStatus === "success") {
    displayBanner({
      message:
        "Settings saved successfully! Some changes require the app to be restarted.",
      type: "info",
      action: "reload",
      animate: false,
    });
  }
}

function handleBannerAction(action) {
  if (action === "reload") {
    window.sessionStorage.setItem("settingsSaved", "true");
    window.location.reload();
  }
}

async function resetSettings() {
  try {
    localStorage.removeItem("user_preferences");
    localStorage.removeItem("user_options");
    localStorage.removeItem("user_callbacks");
    window.sessionStorage.removeItem("settingsSaved");
    window.sessionStorage.setItem("settingsReset", "true");
    window.location.reload();
  } catch (error) {
    console.error("App error => Reset: ", error);
  }
}

onMounted(() => {
  if (window.sessionStorage.getItem("settingsSaved")) {
    displayBanner({
      message: "Settings have been applied and loaded successfully!",
      type: "success",
      animate: true,
    });

    window.sessionStorage.removeItem("settingsSaved");
  }

  if (window.sessionStorage.getItem("settingsReset")) {
    displayBanner({
      message: "Default settings have been restored.",
      type: "warning",
      animate: true,
    });

    window.sessionStorage.removeItem("settingsReset");
  }
});
</script>

<template>
  <div class="view-wrapper">
    <BaseContainer grow>
      <template #container>
        <BaseCard>
          <template #card>
            <SettingsHandler
              setting="themeDetect"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler
              setting="localStorageClear"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler
              setting="gtmEnable"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler
              setting="gtmId"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler
              setting="mainWebsite"
              @settingsResult="settingsResultHandler"
            />
          </template>
        </BaseCard>
        <BaseCard>
          <template #card>
            <SettingsHandler
              setting="sessionMerge"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler
              setting="lockMaximized"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler
              setting="lockFullview"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler
              setting="safeMode"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler
              setting="cookieExpire"
              @settingsResult="settingsResultHandler"
            />
            <SettingsHandler
              setting="locale"
              @settingsResult="settingsResultHandler"
            />
          </template>
        </BaseCard>
        <BaseCard>
          <template #card>
            <SettingsHandler reset @reset-settings="resetSettings" />
          </template>
        </BaseCard>
      </template>
    </BaseContainer>

    <BaseContainer grow>
      <template #container>
        <BaseCard>
          <template #card>
            <SettingsHandler
              setting="onSessionLoaded"
              @settingsResult="settingsResultHandler"
              copy
            />
            <SettingsHandler
              setting="onChatInitiated"
              @settingsResult="settingsResultHandler"
              copy
            />
            <SettingsHandler
              setting="onChatOpened"
              @settingsResult="settingsResultHandler"
              copy
            />
            <SettingsHandler
              setting="onChatClosed"
              @settingsResult="settingsResultHandler"
              copy
            />
            <SettingsHandler
              setting="onMessageSent"
              @settingsResult="settingsResultHandler"
              copy
            />
            <SettingsHandler
              setting="onMessageReceived"
              @settingsResult="settingsResultHandler"
              copy
            />
            <SettingsHandler
              setting="onNicknameChanged"
              @settingsResult="settingsResultHandler"
              copy
            />
            <SettingsHandler
              setting="onEmailChanged"
              @settingsResult="settingsResultHandler"
              copy
            />
            <SettingsHandler
              setting="onPhoneChanged"
              @settingsResult="settingsResultHandler"
              copy
            />
            <SettingsHandler
              setting="onAvatarChanged"
              @settingsResult="settingsResultHandler"
              copy
            />
            <SettingsHandler
              setting="onMessageComposeSent"
              @settingsResult="settingsResultHandler"
              copy
            />
            <SettingsHandler
              setting="onMessageComposeReceived"
              @settingsResult="settingsResultHandler"
              copy
            />
            <SettingsHandler
              setting="onWebsiteAvailabilityChanged"
              @settingsResult="settingsResultHandler"
              copy
            />
            <SettingsHandler
              setting="onHelpdeskQueried"
              @settingsResult="settingsResultHandler"
              copy
            />
          </template>
        </BaseCard>
      </template>
    </BaseContainer>

    <teleport to="body">
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
