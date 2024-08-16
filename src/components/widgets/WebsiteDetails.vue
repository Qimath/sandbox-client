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
        :value="websiteConfig.domain"
        :url="'https://' + websiteConfig.domain"
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
        :url="'mailto:' + websiteConfig.channels.email"
        link
        compact
      />
      <BaseOutput
        id="website-phone"
        label="Phone"
        :value="websiteConfig.channels.phone"
        :url="'tel:' + websiteConfig.channels.phone"
        link
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
        :url="'https://t.me/' + websiteConfig.channels.telegram"
        link
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
        :url="'https://wa.me/' + websiteConfig.channels.whatsapp"
        link
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
