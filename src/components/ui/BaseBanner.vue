<script setup>
defineEmits(['banner-close', 'banner-action'])

const props = defineProps({
  message: {
    type: String,
    default: ''
  },
  action: {
    type: String,
    default: ''
  },
  animate: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="banner" :class="[{ animate: animate }, type]">
    <span @click="$emit('banner-close')" class="close material-symbols-outlined">close</span>
    <span v-if="type === 'info'" class="category material-symbols-outlined">info</span>
    <span v-else-if="type === 'warning'" class="category material-symbols-outlined">warning</span>
    <span v-else-if="type === 'success'" class="category material-symbols-outlined">check_circle</span>
    <span v-else-if="type === 'error'" class="category material-symbols-outlined">cancel</span>
    <p v-html="message" class="message"></p>
    <button v-if="action && action !== ''" @click="$emit('banner-action', action)">
      {{ action }}
    </button>
  </div>
</template>


<style scoped>
.banner {
  position: fixed;
  bottom: var(--layout-footer-height);
  left: var(--layout-aside-width);
  right: 0;
  height: 5rem;
  color: var(--main-text-reverse);
  font-size: 1.125rem;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 20;
}

.banner.info {
  background: var(--blue-pri);
}

.banner.success {
  background: var(--green-pri);
}

.banner.error {
  background: var(--red-pri);
}

.banner.warning {
  background: var(--orange-pri);
}

.banner .close {
  position: absolute;
  left: 0;
  padding: 1rem;
  font-size: 1.75rem;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}

.banner .category {
  user-select: none;
  -webkit-user-select: none;
  margin-right: 1rem;
}

.banner button {
  margin-left: 2rem;
  padding: 0.875rem 1.75rem;
  border-radius: 50px;
  border: none;
  background: hsl(0, 0%, 100%, 0.9);
  color: hsl(0, 0%, 0%);
  text-transform: uppercase;
  letter-spacing: 0.0625rem;
  cursor: pointer;
}

.banner button:hover {
  background: hsl(0, 0%, 100%, 1);
}

.banner button:focus {
  background: var(--color-pearl-1);
}

.banner.info button {
  border: 1px solid var(--blue-duo);
}

.banner.success button {
  border: 1px solid var(--green-duo);
}

.banner.error button {
  border: 1px solid var(--red-duo);
}

.banner.warning button {
  border: 1px solid var(--orange-duo);
}

.banner.animate::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  animation: bannerTransition 10s linear infinite;
}

.banner.animate.success::before {
  background: linear-gradient(90deg, var(--green-pri) 50%, var(--green-duo) 50%);
  background-size: 200% 100%;
}

.banner.animate.error::before {
  background: linear-gradient(90deg, var(--red-pri) 50%, var(--red-duo) 50%);
  background-size: 200% 100%;
}

.banner.animate.info::before {
  background: linear-gradient(90deg, var(--blue-pri) 50%, var(--blue-duo) 50%);
  background-size: 200% 100%;
}

.banner.animate.warning::before {
  background: linear-gradient(90deg, var(--orange-pri) 50%, var(--orange-duo) 50%);
  background-size: 200% 100%;
}

@keyframes bannerTransition {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}

.banner-enter-active,
.banner-leave-active {
  transition: all 0.5s ease;
}

.banner-enter-from,
.banner-leave-to {
  transform: translateY(100%);
  opacity: 50%;
}
</style>
