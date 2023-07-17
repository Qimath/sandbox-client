<script setup>
import { computed } from "vue";
import { useConfigStore } from "@/stores/config.js";
import { useSessionStore } from "@/stores/session.js";
import CryptoJS from "crypto-js";

const configStore = useConfigStore();
const sessionStore = useSessionStore();

const websiteId = computed(() => configStore.website.id);
const ticketSecret = computed(() => configStore.website.ticketSecret);
const userEmail = computed(() => sessionStore.session.content.email);

const computedHmac = computed(() => {
  if (userEmail.value && ticketSecret.value) {
    return CryptoJS.HmacSHA256(userEmail.value, ticketSecret.value).toString();
  } else {
    return null;
  }
});
</script>

<template>
  <div class="element">
    <div class="form">
      <iframe
        title="Ticket Center"
        :src="
          'https://plugins.crisp.chat/urn:crisp.im:ticket-center:0/tickets/' +
          websiteId +
          '?email=' +
          userEmail +
          '&hmac=' +
          computedHmac
        "
        referrerpolicy="origin"
        sandbox="allow-forms allow-popups allow-modals allow-scripts allow-same-origin"
        width="100%"
        height="1000px"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<style scoped></style>
