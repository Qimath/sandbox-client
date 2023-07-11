<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../../stores/config.js'

import BaseOutput from '../ui/BaseOutput.vue'

const configStore = useConfigStore()
const websiteConfig = computed(() => configStore.website)
</script>

<template>
  <div class="element">
    <div class="form">
      <BaseOutput
        id="website-url"
        label="Domain URL"
        :value="websiteConfig.config.settings.domain"
        :url="'https://' + websiteConfig.config.settings.domain"
        link
        compact
      />
      <BaseOutput
        id="website-mailer"
        label="Mailer"
        :value="websiteConfig.config.mailer"
        compact
      />
      <BaseOutput
        id="website-helpdesk"
        label="Helpdesk"
        :value="websiteConfig.config.channels.helpdesk"
        :url="'https://' + websiteConfig.config.channels.helpdesk"
        link
        compact
      />
      <BaseOutput
        id="website-status"
        label="Status page"
        :value="websiteConfig.config.channels.status"
        :url="'https://' + websiteConfig.config.channels.status"
        link
        compact
      />
      <BaseOutput
        id="website-email"
        label="Email"
        :value="websiteConfig.config.channels.email"
        compact
      />
      <BaseOutput
        id="website-phone"
        label="Phone"
        :value="websiteConfig.config.channels.phone"
        compact
      />
      <BaseOutput
        id="website-messenger"
        label="Messenger"
        :value="websiteConfig.config.channels.messenger"
        :url="'https://www.facebook.com/profile.php?id=' + websiteConfig.config.channels.messenger"
        link
        compact
      />
      <BaseOutput
        id="website-telegram"
        label="Telegram"
        :value="websiteConfig.config.channels.telegram"
        compact
      />
      <BaseOutput
        id="website-twitter"
        label="Twitter"
        :value="websiteConfig.config.channels.twitter"
        :url="'https://twitter.com/' + websiteConfig.config.channels.twitter"
        link
        compact
      />
      <BaseOutput
        id="website-whatsapp"
        label="Whatsapp"
        :value="websiteConfig.config.channels.whatsapp"
        compact
      />
      <BaseOutput
        id="website-instagram"
        label="Instagram"
        :value="websiteConfig.config.channels.instagram"
        :url="'https://www.instagram.com/' + websiteConfig.config.channels.instagram"
        link
        compact
      />
    </div>
  </div>
</template>

<style scoped></style>
