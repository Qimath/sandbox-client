<script setup>
const props = defineProps({
  config: {
    type: Object,
    default: {},
  },
});
</script>

<template>
  <div class="website-info">
    <div class="website-logo">
      <img :src="props.config.config.settings.logo" />
      <span
        class="website-availability"
        :class="props.config.config.online ? 'online' : 'offline'"
      ></span>
    </div>
    <div>
      <span class="website-name">{{ props.config.config.website }}</span>
      <span class="website-id">{{ props.config.id }}</span>
    </div>
  </div>
</template>

<style scoped>
.website-info {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.website-info > div {
  flex-direction: column;
}

.website-name,
.website-id {
  padding: 0 1rem;
}

.website-logo {
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  user-select: none;
  -webkit-user-select: none;
}

.website-logo img {
  height: 100%;
  border-radius: 50%;
}

.website-availability {
  position: absolute;
  top: 0;
  right: 0;
  height: 1.875rem;
  width: 1.875rem;
  border-radius: 50%;
  border: 0.375rem solid var(--container-bg);
}

.website-availability.online {
  background-color: var(--green-pri);
}

.website-availability.offline {
  background-color: var(--red-pri);
}

.website-name {
  font-size: 1.375rem;
  font-weight: 600;
  color: var(--blue-pri);
}
</style>
