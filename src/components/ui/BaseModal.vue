<script setup>
defineEmits(['update:value', 'copy', 'modalClose'])

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  openModal: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <transition name="backdrop">
    <div v-if="openModal" class="backdrop" @click="$emit('modalClose')"></div>
  </transition>
  <transition name="modal">
    <dialog open v-if="openModal">
      <header>
        <h3>{{ title }}</h3>
        <span @click="$emit('modalClose')" class="material-symbols-outlined">close</span>
      </header>
      <section>
        <slot name="modal"></slot>
      </section>
    </dialog>
  </transition>
</template>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 40%;
  width: 30%;
  z-index: 500;
  border-radius: 0.25rem;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 0;
  margin: 0;
  background: var(--container-bg);
  overflow: hidden;
}

header {
  background-color: var(--blue-pri);
  color: var(--main-text-reverse);
  width: 100%;
  padding: 1.5rem;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}

h3 {
  font-weight: 500;
  font-size: 1.125rem;
}

section {
  padding: 3rem;
  width: 100%;
  flex-direction: column;
}

span {
  position: absolute;
  right: 0;
  padding: 1rem;
  font-size: 1.75rem;
  cursor: pointer;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  transform: translateY(25%);
  opacity: 0;
}

.backdrop-enter-active,
.backdrop-leave-active {
  transition: all 0.5s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}
</style>
