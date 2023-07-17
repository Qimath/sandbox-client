<script setup>
const emits = defineEmits(["generate", "copy"]);
const props = defineProps({
  button: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  copy: {
    type: Boolean,
    default: false,
  },
  copyType: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="btn-container">
    <button v-if="button" :id="id" :class="color" type="button">
      <span v-if="loading">
        ‎
        <div class="ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </span>
      <span v-else>
        {{ value }}
      </span>
    </button>

    <input v-else :id="id" :value="value" :class="color" type="submit" />

    <span v-if="copy && copyType" class="copy-type">{{ copyType }}</span>
    <span
      v-if="copy"
      class="simple material-symbols-outlined"
      @click.stop="$emit('copy')"
      >content_copy</span
    >
  </div>
</template>

<style scoped>
div.btn-container {
  margin-top: 0.75rem;
  width: 100%;
  border-radius: 0.25rem;
  overflow: hidden;
}

div.btn-container:first-child {
  margin-top: 0;
}

input,
button {
  width: 100%;
  padding: 1.125rem;
  text-transform: uppercase;
  letter-spacing: 0.0625rem;
  transition: background-color 0.1s linear;
  cursor: pointer;
  justify-content: center;
  border: none;
  border-radius: 0.25rem;
  color: var(--main-text-reverse);
}

input.default,
button.default {
  background: var(--dft-duo);
  color: var(--dft-text);
}

input.default:hover,
button.default:hover {
  background: var(--dft-pri);
}

input.default:active,
button.default:active {
  background: var(--dft-tri);
}

input.blue,
button.blue {
  background: var(--blue-duo);
}

input.blue:hover,
button.blue:hover {
  background: var(--blue-pri);
}

input.blue:active,
button.blue:active {
  background: var(--blue-tri);
}

input.red,
button.red {
  background: var(--red-duo);
}

input.red:hover,
button.red:hover {
  background: var(--red-pri);
}

input.red:active,
button.red:active {
  background: var(--red-tri);
}

input.green,
button.green {
  background: var(--green-duo);
}

input.green:hover,
button.green:hover {
  background: var(--green-pri);
}

input.green:active,
button.green:active {
  background: var(--green-tri);
}

input.orange,
button.orange,
input.orange + span.simple,
button.orange + span.simple {
  background: var(--orange-duo);
}

input.orange:hover,
button.orange:hover,
input.orange + span.simple:hover,
button.orange + span.simple:hover {
  background: var(--orange-pri);
}

input.orange:active,
button.orange:active,
input.orange + span.simple:active,
button.orange + span.simple:active {
  background: var(--orange-tri);
}

.element button:first-child {
  margin-top: 0;
}

span.simple {
  position: absolute;
  padding: 1rem;
  right: 0;
  font-size: 1.25rem;
  color: var(--main-text-reverse);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  transition: all 0.1s linear;
  height: 100%;
  width: 3.25rem;
  border-left: 2px solid hsla(0, 0%, 0%, 0.1);
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

span.copy-type {
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  right: calc(3.25rem);
  top: 0;
  user-select: none;
  -webkit-user-select: none;
  color: var(--main-text-reverse);
  background: var(--green-pri);
  padding: 0 0 0.25rem 3.25rem;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  z-index: 100;
  width: calc(100% - 3.25rem + 1px);
  height: 100%;
  box-shadow: var(--main-shadow) 0 0 0.5rem, var(--main-shadow) 0 0 0.5rem;
}

span.copy-type::after {
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

.ellipsis {
  display: inline-block;
  position: relative;
  width: 3.5rem;
  font-size: 5rem;
}
.ellipsis div {
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--main-text-reverse);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.ellipsis div:nth-child(1) {
  left: 0.5rem;
  animation: ellipsis1 0.6s infinite;
}
.ellipsis div:nth-child(2) {
  left: 0.5rem;
  animation: ellipsis2 0.6s infinite;
}
.ellipsis div:nth-child(3) {
  left: 2rem;
  animation: ellipsis2 0.6s infinite;
}
.ellipsis div:nth-child(4) {
  left: 3.5rem;
  animation: ellipsis3 0.6s infinite;
}

@keyframes ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(1.5rem, 0);
  }
}
</style>
