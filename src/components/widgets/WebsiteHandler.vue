<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useConfigStore } from "@/stores/config.js";

import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseOutput from "@/components/ui/BaseOutput.vue";
import BaseModal from "@/components/ui/BaseModal.vue";
import BaseBanner from "@/components/ui/BaseBanner.vue";

import { useBanner } from "@/hooks/banner.js";

const { bannerOptions, displayBanner, closeBanner } = useBanner();

const router = useRouter();
const route = useRoute();

const configStore = useConfigStore();

const websiteId = computed(() => configStore.website.id);
const websiteName = computed(() => configStore.website.config.website);
const emailSecret = computed(() => configStore.website.emailSecret);
const ticketSecret = computed(() => configStore.website.ticketSecret);
const websiteValidity = computed(() => configStore.website.valid);

const websiteIdValue = ref("");
const emailSecretInput = ref("");
const ticketSecretInput = ref("");

const modalVisibility = ref(false);

function loadStaging() {
  router
    .push({
      path: router.currentRoute.value.path,
      query: { website_id: configStore.website.staging },
    })
    .then(() => router.go());
}

function loadWebsite(value) {
  router
    .push({
      path: router.currentRoute.value.path,
      query: { website_id: value.trim() },
    })
    .then(() => router.go());
}

function modalOpen() {
  modalVisibility.value = true;
}

function modalClose() {
  modalVisibility.value = false;
}

function setSecrets() {
  try {
    configStore.updateSecrets(emailSecretInput.value, ticketSecretInput.value);
    modalVisibility.value = false;

    displayBanner({
      message: `Secrets keys for <strong>${websiteName.value}</strong> have been saved.`,
      type: "success",
      animate: true,
    });
  } catch (error) {
    console.error("An app error occurred:", error);

    displayBanner({
      message: "An error occured while saving the secret keys: " + value.error,
      type: "error",
      animate: true,
    });
  }
}

function clearSecrets() {
  localStorage.removeItem("secrets");
  modalVisibility.value = false;

  displayBanner({
    message: "Memorized secret keys have been cleared.",
    type: "warning",
    animate: true,
  });
}

watch(
  () => route.fullPath,
  () => {
    if (window.sessionStorage.getItem("validWebsite")) {
      displayBanner({
        message: `Website ID <strong>${websiteId.value}</strong> for <strong>${websiteName.value}</strong> was successfully loaded!`,
        type: "success",
        animate: true,
      });

      window.sessionStorage.removeItem("validWebsite");
    }

    if (window.sessionStorage.getItem("unvalidWebsite")) {
      displayBanner({
        message: `Website ID <strong>${websiteId.value}</strong> is invalid.`,
        type: "error",
        animate: true,
      });

      window.sessionStorage.removeItem("unvalidWebsite");
    }
  }
);

onMounted(() => {
  ticketSecretInput.value = ticketSecret.value;
  emailSecretInput.value = emailSecret.value;
});

watch(
  websiteValidity,
  (newVal, oldVal) => {
    const websiteIdLoaded = router.currentRoute.value.query.website_id;
    if (websiteIdLoaded) {
      if (newVal !== oldVal) {
        if (newVal == false) {
          window.sessionStorage.setItem("unvalidWebsite", "true");
        } else if (newVal == true) {
          window.sessionStorage.setItem("validWebsite", "true");
        }
      }
      const newQuery = { ...router.currentRoute.value.query };
      delete newQuery.website_id;
      router.push({ query: newQuery });
    }
  },
  { immediate: false }
);
</script>

<template>
  <div class="element">
    <form @submit.prevent="loadWebsite(websiteIdValue)" name="set-website">
      <BaseInput
        id="set-website_id"
        label="Website ID"
        icon="public"
        v-model:value="websiteIdValue"
        :copy="false"
        action
        @action="modalOpen"
        action-type="large"
        action-label="key"
      />
      <BaseButton id="website-submit" color="default" value="submit" />
      <BaseButton id="website-staging" color="blue" button @click="loadStaging">
        <template #button>staging</template>
      </BaseButton>
      <BaseOutput
        id="get-website-id"
        label="Website ID"
        :value="websiteId"
        :url="'https://go.crisp.chat/chat/embed/?website_id=' + websiteId"
        link
      />
      <BaseOutput
        id="get-website-name"
        label="Website name"
        :value="websiteName"
      />
    </form>
  </div>

  <teleport to="body">
    <BaseModal
      :openModal="modalVisibility"
      title="Website Secret HMAC Keys"
      @modalClose="modalClose"
    >
      <template #modal>
        <form @submit.prevent="setSecrets()" name="set-secrets">
          <BaseInput
            id="set-website-email_secret"
            label="Email verification"
            icon="key"
            v-model:value="emailSecretInput"
          />
          <BaseInput
            id="set-website-ticket_secret"
            label="Ticket center"
            icon="key"
            v-model:value="ticketSecretInput"
          />
          <BaseButton id="secrets-save" color="default" value="save & apply" />
          <BaseButton
            id="secrets-clear"
            color="orange"
            button
            @click="clearSecrets()"
          >
            <template #button>clear memorized secrets</template>
          </BaseButton>
        </form>
      </template>
    </BaseModal>
  </teleport>

  <teleport to="#app">
    <transition name="banner" mode="out-in">
      <BaseBanner
        v-if="bannerOptions.visibility"
        @bannerClose="closeBanner"
        :message="bannerOptions.message"
        :action="bannerOptions.action"
        :animate="bannerOptions.animate"
        :type="bannerOptions.type"
      />
    </transition>
  </teleport>
</template>

<style scoped></style>
