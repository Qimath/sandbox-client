const TIME_THRESHOLD = 3000;
const COPY_A = "web copy";
const COPY_B = "npm copy";

const functionStates = {
  copyNickname: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyEmail: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyPhone: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyCompany: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyAvatar: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyData: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copySegment: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyEvent: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyTrigger: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copySendMessage: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyShowMessage: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyShowChatbox: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyHideChatbox: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyOpenChatbox: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyCloseChatbox: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copySwapLeft: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copySwapRight: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyMute: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyUnmute: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyOnSessionLoaded: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyOnChatOpened: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyOnChatClosed: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyOnMessageSent: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyOnMessageReceived: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyOnNicknameChanged: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyOnEmailChanged: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyOnPhoneChanged: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyOnAvatarChanged: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyOnMessageComposeSent: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyOnMessageComposeReceived: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyOnWebsiteAvailabilityChanged: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
  copyOnHelpdeskQueried: {
    lastClickTime: null,
    useAlternateCopy: false,
  },
};

function getCopyType(funcName) {
  const currentTime = performance.now();
  const functionState = functionStates[funcName];

  if (functionState.lastClickTime !== null) {
    if (currentTime - functionState.lastClickTime < TIME_THRESHOLD) {
      functionState.useAlternateCopy = !functionState.useAlternateCopy;
    } else {
      functionState.useAlternateCopy = false;
    }
  }

  functionState.lastClickTime = currentTime;
  return functionState.useAlternateCopy ? COPY_B : COPY_A;
}

// push methods

function copyNickname(value = "") {
  value = value || "Keyser Söze";
  const copyType = getCopyType("copyNickname");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["set", "user:nickname", ["${value}"]])`,
      };
    case COPY_B:
      return { copyType, copyValue: `Crisp.user.setNickname("${value}")` };
  }
}

function copyEmail(value = "") {
  value = value || "marty.mcfly@gmail.com";
  const copyType = getCopyType("copyEmail");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["set", "user:email", ["${value}"]]);`,
      };
    case COPY_B:
      return { copyType, copyValue: `Crisp.user.setEmail("${value}")` };
  }
}

function copyPhone(value = "") {
  value = value || "+33652435325";
  const copyType = getCopyType("copyPhone");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["set", "user:phone", ["${value}"]])`,
      };
    case COPY_B:
      return { copyType, copyValue: `Crisp.user.setPhone("${value}")` };
  }
}

function copyCompany(value = "") {
  value = value || "Capsule Corp";
  const copyType = getCopyType("copyCompany");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["set", "user:company", ["${value}"]])`,
      };
    case COPY_B:
      return { copyType, copyValue: `Crisp.user.setCompany("${value}")` };
  }
}

function copyAvatar(value = "") {
  value = value || "https://chrisp-sandbox.herokuapp.com/mcfly_pup.png";
  const copyType = getCopyType("copyAvatar");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["set", "user:avatar", ["${value}"]])`,
      };
    case COPY_B:
      return { copyType, copyValue: `Crisp.user.setAvatar("${value}")` };
  }
}

function copyData({ dataKey = "", dataValue = "" } = {}) {
  dataKey = dataKey || "instrument";
  dataValue = dataValue || "ocarina";
  const copyType = getCopyType("copyData");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["set", "session:data", ["${dataKey}", "${dataValue}"]])`,
      };
    case COPY_B:
      return {
        copyType,
        copyValue: `Crisp.session.setData({${dataKey}: "${dataValue}"})`,
      };
  }
}

function copySegment(value = "") {
  value = value || "appaloosa";
  const copyType = getCopyType("copySegment");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["set", "session:segments", ["${value}"]])`,
      };
    case COPY_B:
      return { copyType, copyValue: `Crisp.session.setSegments(["${value}"])` };
  }
}

function copyEvent(value = "") {
  value = value || "event:mushroom";
  const copyType = getCopyType("copyEvent");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["set", "session:event", ["${value}"]]);`,
      };
    case COPY_B:
      return { copyType, copyValue: `Crisp.session.pushEvent("${value}")` };
  }
}

function copyTrigger(value = "") {
  value = value || "welcome-donkey";
  const copyType = getCopyType("copyTrigger");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["do", "trigger:run", ["${value}"]]);`,
      };
    case COPY_B:
      return { copyType, copyValue: `Crisp.trigger.run("${value}")` };
  }
}

function copySendMessage(value = "") {
  value = (value || "Hello world").replace(/\r?\n|\r/g, " ");
  const copyType = getCopyType("copySendMessage");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["do", "message:send", ["text", "${value}"]])`,
      };
    case COPY_B:
      return { copyType, copyValue: `Crisp.message.sendText("${value}")` };
  }
}

function copyShowMessage(value = "") {
  value = (value || "Show me the money").replace(/\r?\n|\r/g, " ");
  const copyType = getCopyType("copyShowMessage");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["do", "message:show", ["text", "${value}"]])`,
      };
    case COPY_B:
      return { copyType, copyValue: `Crisp.message.show("text", "${value}")` };
  }
}

function copyShowChatbox() {
  const copyType = getCopyType("copyShowChatbox");

  switch (copyType) {
    case COPY_A:
      return { copyType, copyValue: `$crisp.push(["do", "chat:show"]);` };
    case COPY_B:
      return { copyType, copyValue: `Crisp.chat.show();` };
  }
}

// do methods

function copyHideChatbox() {
  const copyType = getCopyType("copyHideChatbox");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["do", "chat:hide"]);`,
      };
    case COPY_B:
      return {
        copyType,
        copyValue: `Crisp.chat.hide();`,
      };
  }
}

function copyOpenChatbox() {
  const copyType = getCopyType("copyOpenChatbox");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["do", "chat:open"]);`,
      };
    case COPY_B:
      return {
        copyType,
        copyValue: `Crisp.chat.open();`,
      };
  }
}

function copyCloseChatbox() {
  const copyType = getCopyType("copyCloseChatbox");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["do", "chat:close"]);`,
      };
    case COPY_B:
      return {
        copyType,
        copyValue: `Crisp.chat.close();`,
      };
  }
}

function copySwapLeft() {
  const copyType = getCopyType("copySwapLeft");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["config", "position:reverse", [true]]);`,
      };
    case COPY_B:
      return {
        copyType,
        copyValue: `Crisp.setPosition("left");`,
      };
  }
}

function copySwapRight() {
  const copyType = getCopyType("copySwapRight");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["config", "position:reverse", [false]]);`,
      };
    case COPY_B:
      return { copyType, copyValue: `Crisp.setPosition("right");` };
  }
}

function copyMute() {
  const copyType = getCopyType("copyMute");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["config", "sound:mute", [true]]);`,
      };
    case COPY_B:
      return {
        copyType,
        copyValue: `Crisp.muteSound(true);`,
      };
  }
}

function copyUnmute() {
  const copyType = getCopyType("copyUnmute");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["config", "sound:mute", [false]]);`,
      };
    case COPY_B:
      return {
        copyType,
        copyValue: `Crisp.muteSound(false);`,
      };
  }
}

// callback methods

function copyOnSessionLoaded() {
  const copyType = getCopyType("copyOnSessionLoaded");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["on", "session:loaded", () => {console.log("session loaded")}]);`,
      };
    case COPY_B:
      return {
        copyType,
        copyValue: `Crisp.chat.onSessionLoaded(() => {console.log("session loaded")});`,
      };
  }
}

function copyOnChatInitiated() {
  const copyType = getCopyType("copyOnChatInitiated");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["on", "chat:initiated", () => {console.log("chat initiated")}]);`,
      };
    case COPY_B:
      return {
        copyType,
        copyValue: `Crisp.chat.onChatInitiated(() => {console.log("chat initiated")});`,
      };
  }
}

function copyOnChatOpened() {
  const copyType = getCopyType("copyOnChatOpened");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["on", "chat:opened", () => {console.log("chat opened")}]);`,
      };
    case COPY_B:
      return {
        copyType,
        copyValue: `Crisp.chat.onChatOpened(() => {console.log("chat opened")});`,
      };
  }
}

function copyOnChatClosed() {
  const copyType = getCopyType("copyOnChatClosed");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["on", "chat:closed", () => {console.log("chat closed")}]);`,
      };
    case COPY_B:
      return {
        copyType,
        copyValue: `Crisp.chat.onChatClosed(() => {console.log("chat closed")});`,
      };
  }
}

function copyOnMessageSent() {
  const copyType = getCopyType("copyOnMessageSent");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["on", "message:sent", (message) => {console.log("message sent", message)}]);`,
      };
    case COPY_B:
      return {
        copyType,
        copyValue: `Crisp.message.onMessageSent((message) => {console.log("message sent", message)});`,
      };
  }
}

function copyOnMessageReceived() {
  const copyType = getCopyType("copyOnMessageReceived");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["on", "message:received", (message) => {console.log("message received", message)}]);`,
      };
    case COPY_B:
      return {
        copyType,
        copyValue: `Crisp.message.onMessageReceived((message) => {console.log("message received", message)});`,
      };
  }
}

function copyOnNicknameChanged() {
  const copyType = getCopyType("copyOnNicknameChanged");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["on", "user:nickname:changed", (nickname) => {console.log("user nickname changed", nickname)}]);`,
      };
    case COPY_B:
      return {
        copyType,
        copyValue: `Crisp.user.onNicknameChanged((nickname) => {console.log("nickname changed", nickname)});`,
      };
  }
}

function copyOnEmailChanged() {
  const copyType = getCopyType("copyOnEmailChanged");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["on", "user:email:changed", (email) => {console.log("user email changed", email)}]);`,
      };
    case COPY_B:
      return {
        copyType,
        copyValue: `Crisp.user.onEmailChanged((email) => {console.log("email changed", email)});`,
      };
  }
}

function copyOnPhoneChanged() {
  const copyType = getCopyType("copyOnPhoneChanged");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["on", "user:phone:changed", (phone) => {console.log("user phone changed", phone)}]);`,
      };
    case COPY_B:
      return {
        copyType,
        copyValue: `Crisp.user.onPhoneChanged((phone) => {console.log("phone changed", phone)});`,
      };
  }
}

function copyOnAvatarChanged() {
  const copyType = getCopyType("copyOnAvatarChanged");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["on", "user:avatar:changed", (avatar) => {console.log("user avatar changed", avatar)}]);`,
      };
    case COPY_B:
      return {
        copyType,
        copyValue: `Crisp.user.onAvatarChanged((avatar) => {console.log("avatar changed", avatar)});`,
      };
  }
}

function copyOnMessageComposeSent() {
  const copyType = getCopyType("copyOnMessageComposeSent");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["on", "message:compose:sent", (compose) => {console.log("message composed by visitor", compose)}]);`,
      };
    case COPY_B:
      return {
        copyType,
        copyValue: `Crisp.message.onMessageComposeSent((compose) => {console.log("compose sent", compose)});`,
      };
  }
}

function copyOnMessageComposeReceived() {
  const copyType = getCopyType("copyOnMessageComposeReceived");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["on", "message:compose:received", (compose) => {console.log("message composed by operator", compose)}]);`,
      };
    case COPY_B:
      return {
        copyType,
        copyValue: `Crisp.message.onMessageComposeReceived((compose) => {console.log("compose received", compose)});`,
      };
  }
}

function copyOnWebsiteAvailabilityChanged() {
  const copyType = getCopyType("copyOnWebsiteAvailabilityChanged");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["on", "website:availability:changed", (is_available) => {console.log("website availability changed", is_available)}]);`,
      };
    case COPY_B:
      return {
        copyType,
        copyValue: `Crisp.utility.onWebsiteAvailabilityChanged((is_available) => {console.log(is_available ? 'website availability: online' : 'website availability: offline')});`,
      };
  }
}

function copyOnHelpdeskQueried() {
  const copyType = getCopyType("copyOnHelpdeskQueried");

  switch (copyType) {
    case COPY_A:
      return {
        copyType,
        copyValue: `$crisp.push(["on", "helpdesk:queried", (search_results) => {console.log("helpdesk search results", search_results)}]);`,
      };
    case COPY_B:
      return {
        copyType,
        copyValue: `Crisp.utility.onHelpdeskSearchQueried((search_results) => {console.log("helpdesk queried", search_results)});`,
      };
  }
}

export default function useMethodCopier(name, value) {
  const copiers = {
    nickname: () => copyNickname(value),
    email: () => copyEmail(value),
    phone: () => copyPhone(value),
    company: () => copyCompany(value),
    avatar: () => copyAvatar(value),
    data: () => copyData(value),
    segment: () => copySegment(value),
    event: () => copyEvent(value),
    trigger: () => copyTrigger(value),
    sendMessage: () => copySendMessage(value),
    showMessage: () => copyShowMessage(value),
    showChatbox: () => copyShowChatbox(),
    hideChatbox: () => copyHideChatbox(),
    openChatbox: () => copyOpenChatbox(),
    closeChatbox: () => copyCloseChatbox(),
    swapLeft: () => copySwapLeft(),
    swapRight: () => copySwapRight(),
    mute: () => copyMute(),
    unmute: () => copyUnmute(),
    onSessionLoaded: () => copyOnSessionLoaded(),
    onChatInitiated: () => copyOnChatInitiated(),
    onChatOpened: () => copyOnChatOpened(),
    onChatClosed: () => copyOnChatClosed(),
    onMessageSent: () => copyOnMessageSent(),
    onMessageReceived: () => copyOnMessageReceived(),
    onNicknameChanged: () => copyOnNicknameChanged(),
    onEmailChanged: () => copyOnEmailChanged(),
    onPhoneChanged: () => copyOnPhoneChanged(),
    onAvatarChanged: () => copyOnAvatarChanged(),
    onMessageComposeSent: () => copyOnMessageComposeSent(),
    onMessageComposeReceived: () => copyOnMessageComposeReceived(),
    onWebsiteAvailabilityChanged: () => copyOnWebsiteAvailabilityChanged(),
    onHelpdeskQueried: () => copyOnHelpdeskQueried(),
  };

  return copiers[name] ? copiers[name]() : null;
}
