<script setup>
const props = defineProps({
  grow: {
    type: Boolean,
    default: false,
  },
  full: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <div class="container" :class="{ grow, full }" ref="container">
    <span class="top-liner"></span>
    <slot name="container"></slot>
    <span class="bottom-liner"></span>
  </div>
</template>

<style scoped>
.container {
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 0 0 auto;
  overflow-y: scroll;
  overflow-x: hidden;
  background: var(--container-bg);
  max-height: 100%;
  height: fit-content;
  min-width: 20rem;
  width: v-bind(width);
}

.container.grow {
  flex-grow: 1;
  width: auto;
  max-width: initial;
  min-width: 40rem;
}

.container.full {
  height: 100%;
}

.top-liner,
.bottom-liner {
  position: sticky;
  display: flex;
  max-height: 1.5rem;
  min-height: 1.5rem;
  width: 100%;
  background: var(--container-bg);
  z-index: 5;
}

.container.full .top-liner,
.container.full .bottom-liner {
  background: none;
}

.top-liner {
  top: 0;
  border: 1px solid var(--container-border);
  border-bottom: none;
}

.bottom-liner {
  bottom: 0;
  border: 1px solid var(--container-border);
  border-top: none;
}

.container::-webkit-scrollbar {
  width: 1rem;
}

.container::-webkit-scrollbar-track {
  background-color: var(--main-bg-pri);
}

.container::-webkit-scrollbar-thumb {
  border-radius: 1rem;
  background-color: var(--liner-pri);
  border: 5px solid var(--main-bg-pri);
}

.container::-webkit-scrollbar-thumb:hover {
  background-color: var(--liner-duo);
}

.container::-webkit-scrollbar-thumb:active {
  background-color: var(--liner-tri);
}
</style>
