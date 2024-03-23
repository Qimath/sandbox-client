<script setup>
import { watch, ref } from "vue";

const emit = defineEmits(["update:value"]);

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
});

const checked = ref(props.value);

watch(
  () => props.value,
  (newValue) => {
    checked.value = newValue;
  }
);

watch(checked, (newValue) => {
  emit("update:value", newValue);
});
</script>

<template>
  <label class="switch" :for="id">
    <input
      :id="id"
      type="checkbox"
      :checked="checked"
      @input="checked = !checked"
    />
    <div class="slider"></div>
  </label>
</template>

<style scoped>
.switch {
  display: inline-block;
  height: 2rem;
  position: relative;
  width: 4rem;
}

.switch input {
  display: none;
}

.slider {
  background-color: var(--container-border);
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.3s;
}

.slider:before {
  background-color: var(--container-bg);
  bottom: 0.25rem;
  content: "";
  height: 1.5rem;
  left: 0.25rem;
  position: absolute;
  transition: 0.3s;
  width: 1.5rem;
  pointer-events: none;
}

input:checked + .slider {
  background-color: var(--green-pri);
}

input:checked + .slider:before {
  transform: translateX(2rem);
}

.slider {
  border-radius: 2rem;
}

.slider:before {
  border-radius: 50%;
}
</style>
