<script setup>
import { ref, watch } from 'vue'

const emits = defineEmits(['update:value'])
const props = defineProps({
  options: {
    type: Object,
    default: () => {}
  },
  id: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  }
})

const selected = ref(props.value)

watch(selected, (newVal) => {
  emits('update:value', newVal)
})
</script>

<template>
  <div>
    <select :id="id" v-model="selected">
      <option v-for="(value, key) in options" :value="value" :key="value">
        {{ key }}
      </option>
    </select>
    <label :for="id">{{ name }}</label>
  </div>
</template>

<style scoped>
div {
  width: 100%;
}

select {
  padding: 1.875rem 1rem 0.375rem 1rem;
  width: 100%;
  background: var(--main-bg-pri);
  border: none;
  border-bottom: 2px solid var(--liner-pri);
  resize: none;
  overflow: hidden;
  transition: all 0.1s linear;
  appearance: none;
  border-radius: 0.25rem;
  border-radius: 0 !important;
}

select:hover {
  background: var(--main-bg-duo);
  border-bottom: 2px solid var(--liner-duo);
}

select:focus {
  background: var(--main-bg-tri);
  border-bottom: 2px solid var(--liner-tri);
}

select + label {
  padding-left: 1rem;
  position: absolute;
  z-index: 1;
  transition: all 0.1s linear;
  color: var(--label-tri);
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
  align-content: center;
  align-items: center;
  padding-top: 0.375rem;
  font-size: 0.875rem;
}
</style>
