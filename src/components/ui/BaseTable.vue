<script setup>
import { reactive } from 'vue'

const props = defineProps({
  config: {
    type: [Object, String, Array, Boolean],
    required: true
  }
})

const isDrawerOpen = reactive({})

const toggleDrawer = (key) => {
  if (isDrawerOpen[key] === undefined) {
    isDrawerOpen[key] = true
  } else {
    isDrawerOpen[key] = !isDrawerOpen[key]
  }
}

const formatKey = (key) => {
  if (typeof key === 'string') {
    return key.replace(/_/g, ' ')
  }
  return key
}

const isEmptyObject = (obj) => {
  return obj && typeof obj === 'object' && Object.keys(obj).length === 0
}
</script>

<template>
  <div class="item-container" v-for="(value, key) in config" :key="key">
    <div v-if="value && Array.isArray(value)" class="item">
      <div class="item-name">
        <span class="title" @click="toggleDrawer(key)">{{ formatKey(key) }}</span>
        <span class="toggle material-symbols-outlined" v-if="isDrawerOpen[key]">expand_more</span>
        <span class="toggle material-symbols-outlined" v-else>chevron_left</span>
      </div>
      <div class="drawer" v-show="isDrawerOpen[key]">
        <div v-if="value.length === 0" class="item-container">
          <div class="item-content">
            <div class="item-single">N/A</div>
          </div>
        </div>
        <div v-else class="item-container" v-for="(item, index) in value" :key="index">
          <div class="item-content">
            <div class="item-single">{{ item }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="value && typeof value === 'object'" class="item">
      <div class="item-name">
        <span class="title" @click="toggleDrawer(key)">{{ formatKey(key) }}</span>
        <span class="toggle material-symbols-outlined" v-if="isDrawerOpen[key]">expand_more</span>
        <span class="toggle material-symbols-outlined" v-else>chevron_left</span>
      </div>
      <div class="drawer" v-show="isDrawerOpen[key]">
        <div v-if="isEmptyObject(value)" class="item-container">
          <div class="item-content">
            <div class="item-single">N/A</div>
          </div>
        </div>
        <BaseTable :config="value" />
      </div>
    </div>
    <div v-else class="item-content">
      <div class="item-key">{{ formatKey(key) }}</div>
      <div class="item-value">{{ value }}</div>
    </div>
  </div>
</template>

<style scoped>
div {
  width: 100%;
  flex-direction: column;
  color: var(--table-text);
}

.item-container .item-container {
  padding-left: 1rem;
  border-left: 1px solid var(--table-main);
}

.item-content {
  flex-direction: row;
  border-top: 1px solid var(--container-bg);
}

.drawer > :first-child > .item-content {
  border-top: 0.25rem solid var(--container-bg);
}

.item-container:first-of-type .item-content {
  flex-direction: row;
}

.item-key {
  width: 50%;
  background: var(--table-head);
  padding: 0.75rem 1rem;
  justify-content: center;
  text-transform: capitalize;
  white-space: nowrap;
  font-weight: 500;
  border-right: 1px solid var(--container-bg);
  overflow: hidden;
}

.item-value {
  background: var(--table-body);
  overflow: hidden;
  padding: 0.75rem 1rem;
  justify-items: center;
  white-space: nowrap;
}

.item-single {
  background: var(--table-body);
  overflow: hidden;
  padding: 0.75rem 1rem;
  justify-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-name .title {
  width: 100%;
  padding: 1.125rem 1rem;
  background: var(--table-main);
  color: var(--main-text-reverse);
  text-transform: uppercase;
  cursor: pointer;
  font-size: 0.75rem;
  border-top: 0.25rem solid var(--container-bg);
}

.item-container:first-of-type > .item > .item-name > .title {
  border: none;
}

.toggle {
  position: absolute;
  top: 0;
  right: 0;
  color: var(--main-text-reverse);
  padding: 0 1rem;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: inline-flex;
  user-select: none;
  pointer-events: none;
}
</style>
