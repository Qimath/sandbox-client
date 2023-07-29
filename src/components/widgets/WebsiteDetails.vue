<script setup>
import { computed } from "vue";
import { useConfigStore } from "@/stores/config.js";

import BaseOutput from "@/components/ui/BaseOutput.vue";

const configStore = useConfigStore();
const websiteConfig = computed(() => configStore.getConfig);
</script>

<template>
  <div class="element">
    <div class="form">
      <BaseOutput
        id="website-url"
        label="Domain URL"
        :value="websiteConfig.settings.domain"
        :url="'https://' + websiteConfig.settings.domain"
        link
        compact
      />
      <BaseOutput
        id="website-mailer"
        label="Mailer"
        :value="websiteConfig.mailer"
        compact
      />
      <BaseOutput
        id="website-helpdesk"
        label="Helpdesk"
        :value="websiteConfig.channels.helpdesk"
        :url="'https://' + websiteConfig.channels.helpdesk"
        link
        compact
      />
      <BaseOutput
        id="website-status"
        label="Status page"
        :value="websiteConfig.channels.status"
        :url="'https://' + websiteConfig.channels.status"
        link
        compact
      />
      <BaseOutput
        id="website-email"
        label="Email"
        :value="websiteConfig.channels.email"
        compact
      />
      <BaseOutput
        id="website-phone"
        label="Phone"
        :value="websiteConfig.channels.phone"
        compact
      />
      <BaseOutput
        id="website-messenger"
        label="Messenger"
        :value="websiteConfig.channels.messenger"
        :url="
          'https://www.facebook.com/profile.php?id=' +
          websiteConfig.channels.messenger
        "
        link
        compact
      />
      <BaseOutput
        id="website-telegram"
        label="Telegram"
        :value="websiteConfig.channels.telegram"
        compact
      />
      <BaseOutput
        id="website-twitter"
        label="Twitter"
        :value="websiteConfig.channels.twitter"
        :url="'https://twitter.com/' + websiteConfig.channels.twitter"
        link
        compact
      />
      <BaseOutput
        id="website-whatsapp"
        label="Whatsapp"
        :value="websiteConfig.channels.whatsapp"
        compact
      />
      <BaseOutput
        id="website-instagram"
        label="Instagram"
        :value="websiteConfig.channels.instagram"
        :url="'https://www.instagram.com/' + websiteConfig.channels.instagram"
        link
        compact
      />
    </div>
  </div>
</template>

<style scoped></style>
