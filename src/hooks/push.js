import { reactive, computed } from "vue";
import { Crisp } from "crisp-sdk-web";
import { useConfigStore } from "@/stores/config.js";

import useMethodGetter from "./get.js";
import CryptoJS from "crypto-js";

function pushNickname(value) {
  const result = reactive({});

  try {
    Crisp.user.setNickname(value);
    result.success = "Nickname pushed";
    return result;
  } catch (error) {
    console.error(error);
    result.error = error.message;
    return result;
  }
}

function pushEmail(value) {
  const configStore = useConfigStore();
  const emailSecret = computed(() => configStore.website.emailSecret);

  const computedHmac = computed(() => {
    if (value && emailSecret.value) {
      return CryptoJS.HmacSHA256(value, emailSecret.value).toString();
    } else {
      return null;
    }
  });

  const result = reactive({});

  try {
    Crisp.user.setEmail(value, computedHmac.value);
    result.success = "Email pushed";
    return result;
  } catch (error) {
    console.error(error);
    result.error = error.message;
    return result;
  }
}

function pushPhone(value) {
  const result = reactive({});

  try {
    Crisp.user.setPhone(value);
    result.success = "Phone pushed";
    return result;
  } catch (error) {
    console.error(error);
    result.error = error.message;
    return result;
  }
}

function pushCompany(value) {
  const result = reactive({});

  try {
    Crisp.user.setCompany(value);
    result.success = "Company pushed";

    // Updating company (no native sdk callback)
    setTimeout(() => {
      useMethodGetter("session-company");
    }, 100);

    return result;
  } catch (error) {
    console.error(error);
    result.error = error.message;
    return result;
  }
}

function pushAvatar(value) {
  const result = reactive({});

  try {
    Crisp.user.setAvatar(value);
    result.success = "Avatar pushed";
    return result;
  } catch (error) {
    console.error(error);
    result.error = error.message;
    return result;
  }
}

function pushData(value) {
  const result = reactive({});

  try {
    Crisp.session.setData({ [value.dataKey]: value.dataValue });
    result.success = "Data pushed";

    // Updating data (no native sdk callback)
    setTimeout(() => {
      useMethodGetter("session-data");
    }, 500);

    return result;
  } catch (error) {
    console.error(error);
    result.error = error.message;
    return result;
  }
}

function pushSegment(value) {
  const result = reactive({});

  try {
    Crisp.session.setSegments([value]);
    result.success = "Segment pushed";
    return result;
  } catch (error) {
    console.error(error);
    result.error = error.message;
    return result;
  }
}

function pushEvent(value) {
  const result = reactive({});

  try {
    Crisp.session.pushEvent(value);
    result.success = "Event pushed";
    return result;
  } catch (error) {
    console.error(error);
    result.error = error.message;
    return result;
  }
}

function pushTrigger(value) {
  const result = reactive({});

  try {
    Crisp.trigger.run(value);
    result.success = "Trigger pushed";
    return result;
  } catch (error) {
    console.error(error);
    result.error = error.message;
    return result;
  }
}

function pushSendMessage(value) {
  const result = reactive({});

  try {
    Crisp.message.sendText(value);
    result.success = "Message sent";
    return result;
  } catch (error) {
    console.error(error);
    result.error = error.message;
    return result;
  }
}

function pushShowMessage(value) {
  const result = reactive({});

  try {
    Crisp.message.show("text", value);
    result.success = "Message displayed";
    return result;
  } catch (error) {
    console.error(error);
    result.error = error.message;
    return result;
  }
}

function doShowChatbox() {
  const result = reactive({});

  try {
    Crisp.chat.show();
    result.success = "Chatbox showed";
    return result;
  } catch (error) {
    console.error(error);
    result.error = error.message;
    return result;
  }
}

function doHideChatbox() {
  const result = reactive({});

  try {
    Crisp.chat.hide();
    result.success = "Chatbox hidden";
    return result;
  } catch (error) {
    console.error(error);
    result.error = error.message;
    return result;
  }
}

function doOpenChatbox() {
  const result = reactive({});

  try {
    Crisp.chat.open();
    result.success = "Chatbox opened";
    return result;
  } catch (error) {
    console.error(error);
    result.error = error.message;
    return result;
  }
}

function doCloseChatbox() {
  const result = reactive({});

  try {
    Crisp.chat.close();
    result.success = "Chatbox closed";
    return result;
  } catch (error) {
    console.error(error);
    result.error = error.message;
    return result;
  }
}

function doSwapLeft() {
  const result = reactive({});

  try {
    Crisp.setPosition("left");
    result.success = "Chatbox swapped left";
    return result;
  } catch (error) {
    console.error(error);
    result.error = error.message;
    return result;
  }
}

function doSwapRight() {
  const result = reactive({});

  try {
    Crisp.setPosition("right");
    result.success = "Chatbox swapped right";
    return result;
  } catch (error) {
    console.error(error);
    result.error = error.message;
    return result;
  }
}

function doMute() {
  const result = reactive({});

  try {
    Crisp.muteSound(true);
    result.success = "Chatbox sounds muted";
    return result;
  } catch (error) {
    console.error(error);
    result.error = error.message;
    return result;
  }
}

function doUnmute() {
  const result = reactive({});

  try {
    Crisp.muteSound(false);
    result.success = "Chatbox sounds unmuted";
    return result;
  } catch (error) {
    console.error(error);
    result.error = error.message;
    return result;
  }
}

export default function useMethodPusher(id, value) {
  const pushers = {
    "session-nickname": () => pushNickname(value),
    "session-email": () => pushEmail(value),
    "session-phone": () => pushPhone(value),
    "session-company": () => pushCompany(value),
    "session-avatar": () => pushAvatar(value),
    "session-data": () => pushData(value),
    "session-segment": () => pushSegment(value),
    event: () => pushEvent(value),
    trigger: () => pushTrigger(value),
    "send-message": () => pushSendMessage(value),
    "show-message": () => pushShowMessage(value),
    "show-chatbox": () => doShowChatbox(),
    "hide-chatbox": () => doHideChatbox(),
    "open-chatbox": () => doOpenChatbox(),
    "close-chatbox": () => doCloseChatbox(),
    "swap-left": () => doSwapLeft(),
    "swap-right": () => doSwapRight(),
    mute: () => doMute(),
    unmute: () => doUnmute(),
  };

  return pushers[id] ? pushers[id]() : null;
}
