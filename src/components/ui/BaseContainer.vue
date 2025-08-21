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
    <span class="top-liner">
      <span class="liner-border"></span>
    </span>
    <slot name="container"></slot>
    <span class="bottom-liner">
      <span class="liner-border"></span>
    </span>
  </div>
</template>

<style>
.container {
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 0 0 auto;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 100%;
  height: fit-content;
  min-width: 20rem;
  width: v-bind(width);
  border-radius: 0.375rem;
}

.container.grow {
  flex-grow: 1;
  width: auto;
  max-width: initial;
  min-width: 32rem;
}

.container.full {
  height: 100%;
}

.container.full .card,
.container.full .top-liner,
.container.full .bottom-liner,
.container.full .liner-border {
  background: transparent;
}

.top-liner,
.bottom-liner {
  position: sticky;
  display: flex;
  max-height: 1.5rem;
  min-height: 1.5rem;
  width: 100%;
  z-index: 5;
  background: var(--main-bg-pri);
}

.liner-border {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--container-bg);
  border: 1px solid var(--container-border);
}

.container.full .top-liner,
.container.full .bottom-liner {
  background: none;
}

.top-liner {
  top: 0;
}

.bottom-liner {
  bottom: 0;
}

.top-liner .liner-border {
  top: 0;
  border-radius: 0.375rem 0.375rem 0 0;
  border-bottom: 0;
}

.bottom-liner .liner-border {
  bottom: 0;
  border-radius: 0 0 0.375rem 0.375rem;
  border-top: 0;
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
