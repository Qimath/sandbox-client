<script setup>
import { Crisp } from "crisp-sdk-web"
import BaseButton from '../ui/BaseButton.vue'

function doShow() {
  Crisp.chat.show();
}

function doHide() {
  Crisp.chat.hide();
}

function doOpen() {
  Crisp.chat.open();
}

function doClose() {
  Crisp.chat.close('left');
}

function doSwapLeft() {
  Crisp.setPosition("left");
}

function doSwapRight() {
  Crisp.setPosition("right");
}

function doMute() {
  Crisp.muteSound(true);
}

function doUnmute() {
  Crisp.muteSound(false);
}
</script>

<template>
  <div class="element">
    <form @submit.prevent="" name="do-method">
      <BaseButton id="chat-show" value="show" color="orange" button @click="doShow" />
      <BaseButton id="chat-hide" value="hide" color="orange" button @click="doHide" />
      <BaseButton id="chat-open" value="open" color="orange" button @click="doOpen" />
      <BaseButton id="chat-close" value="close" color="orange" button @click="doClose" />
      <BaseButton id="chat-position" value="swap left" color="orange" button @click="doSwapLeft" />
      <BaseButton id="chat-position" value="swap right" color="orange" button @click="doSwapRight" />
      <BaseButton id="chat-position" value="mute" color="orange" button @click="doMute" />
      <BaseButton id="chat-position" value="unmute" color="orange" button @click="doUnmute" />

    </form>
  </div>
</template>

<style scoped></style>
