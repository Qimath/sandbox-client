<script setup>
import { ref, watch, onMounted, nextTick } from "vue";

import IconKey from "@/assets/images/icons/IconKey.vue";
import IconCopy from "@/assets/images/icons/IconCopy.vue";
import IconNickname from "@/assets/images/icons/IconNickname.vue";
import IconEmail from "@/assets/images/icons/IconEmail.vue";
import IconPhone from "@/assets/images/icons/IconPhone.vue";
import IconWork from "@/assets/images/icons/IconWork.vue";
import IconPicture from "@/assets/images/icons/IconPicture.vue";
import IconJoinLeft from "@/assets/images/icons/IconJoinLeft.vue";
import IconJoinRight from "@/assets/images/icons/IconJoinRight.vue";
import IconTag from "@/assets/images/icons/IconTag.vue";
import IconEvent from "@/assets/images/icons/IconEvent.vue";
import IconNotification from "@/assets/images/icons/IconNotification.vue";
import IconSend from "@/assets/images/icons/IconSend.vue";
import IconDesktop from "@/assets/images/icons/IconDesktop.vue";
import IconWebsite from "@/assets/images/icons/IconWebsite.vue";
import IconFingerprint from "@/assets/images/icons/IconFingerprint.vue";
import IconLock from "@/assets/images/icons/IconLock.vue";
import IconHelp from "@/assets/images/icons/IconHelp.vue";

defineEmits(["update:value", "action"]);

const props = defineProps({
  textarea: {
    type: Boolean,
    default: false,
  },
  copyType: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  value: {
    type: [String, Number],
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  success: {
    type: String,
    default: "",
  },
  number: {
    type: Boolean,
    default: false,
  },
  action: {
    type: Boolean,
    default: false,
  },
  actionType: {
    type: String,
    default: "",
  },
  actionLabel: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const rows = ref(5);
const textareaRef = ref(null);

const resizeTextarea = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = "auto";
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
  }
};

watch(
  () => props.value,
  () => {
    nextTick(resizeTextarea);
  }
);

onMounted(() => {
  nextTick(resizeTextarea);
});
</script>

<template>
  <div class="input-wrapper" :class="{ error: !!error, success: !!success }">
    <textarea
      v-if="textarea"
      placeholder=" "
      ref="textareaRef"
      :rows="rows"
      :id="id"
      :value="value"
      @input="$emit('update:value', $event.target.value.trim())"
      :disabled="props.disabled"
    ></textarea>
    <input
      v-else
      :id="id"
      placeholder=" "
      :type="type"
      :value="value"
      @input="$emit('update:value', $event.target.value.trim())"
      auto-complete="nope"
      data-1p-ignore
      :disabled="props.disabled"
    />
    <label :for="id">
      <span>
        <IconNickname v-if="icon === 'nickname'" />
        <IconEmail v-if="icon === 'email'" />
        <IconPhone v-if="icon === 'phone'" />
        <IconWork v-if="icon === 'work'" />
        <IconPicture v-if="icon === 'picture'" />
        <IconJoinLeft v-if="icon === 'join_left'" />
        <IconJoinRight v-if="icon === 'join_right'" />
        <IconTag v-if="icon === 'tag'" />
        <IconEvent v-if="icon === 'event'" />
        <IconNotification v-if="icon === 'notification'" />
        <IconSend v-if="icon === 'send'" />
        <IconDesktop v-if="icon === 'desktop'" />
        <IconWebsite v-if="icon === 'website'" />
        <IconFingerprint v-if="icon === 'fingerprint'" />
        <IconKey v-if="icon === 'key'" />
        <IconLock v-if="icon === 'lock'" />
      </span>
      {{ error || success || label }}
    </label>
    <span v-if="action && copyType" class="copy-type">{{ copyType }}</span>
    <span v-if="action" :class="actionType" @click="$emit('action')">
      <IconKey v-if="actionLabel === 'key'" />
      <IconCopy v-if="actionLabel === 'content_copy'" />
      <IconHelp v-if="actionLabel === 'help'" />
    </span>
  </div>
</template>

<style scoped>
div {
  flex-direction: column;
  width: 100%;
}

div.input-wrapper + div.input-wrapper {
  margin-top: 0.75rem;
}

.dual div.input-wrapper + div.input-wrapper {
  margin-top: 0;
}

dialog div + div {
  margin-top: 1rem;
}

input,
textarea {
  padding: 1.875rem 1rem 0.375rem 1rem;
  width: 100%;
  background: var(--main-bg-pri);
  border: none;
  border-bottom: 2px solid var(--liner-pri);
  resize: none;
  overflow: hidden;
  border-radius: 0.25rem;
  transition: all 0.1s linear;
}

input:hover,
textarea:hover {
  background: var(--main-bg-duo);
  border-bottom: 2px solid var(--liner-duo);
}

input:focus,
textarea:focus {
  background: var(--main-bg-tri);
  border-bottom: 2px solid var(--liner-tri);
}

label {
  padding-left: 1rem;
  position: absolute;
  z-index: 1;
  transition: all 0.1s linear;
  color: var(--label-tri);
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
  justify-content: center;
  align-items: center;
  padding-top: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

label svg {
  height: 1.25rem;
  width: 1.25rem;
}

input:placeholder-shown + label,
textarea:placeholder-shown + label {
  padding-top: 1rem;
  color: var(--label-pri);
  font-size: 1rem;
}

input:placeholder-shown + label svg,
textarea:placeholder-shown + label svg {
  transition: all 0.1s linear;
  height: 1.5rem;
  width: 1.5rem;
  fill: var(--label-pri);
}

input:focus + label,
textarea:focus + label {
  padding-top: 0.375rem;
  font-size: 0.875rem;
  color: var(--label-tri);
}

input:focus + label svg,
textarea:focus + label svg {
  fill: var(--label-tri);
  height: 1.25rem;
  width: 1.25rem;
}

input:placeholder-shown:focus + label,
textarea:placeholder-shown:focus + label {
  padding-top: 0.375rem;
  font-size: 0.875rem;
  color: var(--label-tri);
}

input:placeholder-shown:focus + label svg,
textarea:placeholder-shown:focus + label svg {
  fill: var(--label-tri);
  height: 1.25rem;
  width: 1.25rem;
}

input:disabled,
textarea:disabled {
  background: var(--main-bg-tri);
  border-bottom: 2px solid var(--liner-tri);
  cursor: not-allowed;
}

input:disabled + label,
textarea:disabled + label {
  color: var(--label-tri);
}

input:disabled + label svg,
textarea:disabled + label svg {
  fill: var(--label-tri);
}

input + label span,
textarea + label span {
  margin-right: 0.5em;
}

input + label span svg,
textarea + label span svg {
  fill: var(--label-duo);
}

*:placeholder-shown + label span {
  color: var(--label-pri);
}

*:placeholder-shown + label span svg {
  fill: var(--label-pri);
}

*:focus + label span,
*:placeholder-shown:focus + label span {
  color: var(--label-duo);
}

*:focus + label span svg,
*:placeholder-shown:focus + label span svg {
  fill: var(--label-duo);
}

div > span.simple {
  position: absolute;
  right: 0;
  top: 0;
  justify-content: flex-end;
  padding: 0.25rem;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  transition: all 0.1s linear;
}

div > span.simple svg {
  fill: var(--liner-tri);
  height: 1.25rem;
  width: 1.25rem;
  transition: all 0.1s linear;
}

div > span.simple:hover svg {
  fill: var(--green-pri);
}

div > span.simple:active svg {
  fill: var(--green-duo);
}

div > span.copy-type {
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  right: 2.5rem;
  top: -0.625rem;
  user-select: none;
  -webkit-user-select: none;
  color: var(--main-text-reverse);
  background: var(--green-pri);
  padding: 0.625rem 1.25rem 0.75rem 1.25rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 700;
  z-index: 100;
  box-shadow: var(--main-shadow) 0 0 0.5rem, var(--main-shadow) 0 0 0.5rem;
}

div > span.copy-type::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  right: 0;
  top: 50%;
  border: 0.75rem solid transparent;
  border-left-color: var(--green-pri);
  border-right: 0;
  margin-top: -0.75rem;
  margin-right: -0.5rem;
  z-index: 100;
}

div > span.large {
  position: absolute;
  right: 0;
  top: 0;
  justify-content: flex-end;
  color: var(--liner-tri);
  cursor: pointer;
  transition: all 0.1s linear;
  padding: 0.75rem;
  font-size: 1.75rem;
  user-select: none;
  -webkit-user-select: none;
}

div > span.large svg {
  fill: var(--liner-tri);
  transition: all 0.1s linear;
}

div > span.large:hover {
  color: var(--note-pri);
}

div > span.large:hover svg {
  fill: var(--note-pri);
}

div > span.large:active {
  color: var(--note-duo);
}

div > span.large:active svg {
  fill: var(--note-duo);
}

div.success label {
  color: var(--success-text) !important;
  animation: pulse 1s infinite;
}

div.success label span {
  color: var(--success-text) !important;
}

div.success label span svg {
  fill: var(--success-text) !important;
}

div.success input,
div.success textarea {
  border-bottom: 2px solid var(--success-liner);
}

div.error label {
  color: var(--error-text) !important;
  animation: shake 0.5s ease-in-out;
}

div.error label span {
  color: var(--error-text) !important;
}

div.error label span svg {
  fill: var(--error-text) !important;
}

div.error input,
div.error textarea {
  border-bottom: 2px solid var(--error-liner);
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  15% {
    transform: translateX(-0.375rem);
  }
  30% {
    transform: translateX(0.375rem);
  }
  45% {
    transform: translateX(-0.375rem);
  }
  60% {
    transform: translateX(0.375rem);
  }
  75% {
    transform: translateX(-0.375rem);
  }
  90% {
    transform: translateX(0.375rem);
  }
  100% {
    transform: translateX(0);
  }
}

/* Changing the background color on input autofill */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  visibility: hidden;
  display: none !important;
}

/* Preventing password suggestions */
input::-webkit-credentials-auto-fill-button {
  visibility: hidden;
  display: none !important;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  appearance: textfield;
}

/* Internet Explorer 11 */
input[type="number"]::-ms-clear {
  display: none;
}
</style>
