<script setup>
const props = defineProps({
  primary: {
    type: String,
    default: "",
  },
  secondary: {
    type: String,
    default: "",
  },
  picture: {
    type: String,
    default: "",
  },
  status: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="preview-info">
    <div class="preview-picture">
      <img :src="props.picture" />
      <span
        class="preview-status"
        :class="props.status ? 'online' : 'offline'"
      ></span>
    </div>
    <div>
      <span class="preview-primary">{{ props.primary }}</span>
      <span class="preview-secondary">{{ props.secondary }}</span>
    </div>
  </div>
</template>

<style scoped>
.preview-info {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.preview-info > div {
  flex-direction: column;
}

.preview-primary,
.preview-secondary {
  padding: 0 1rem;
}

.preview-picture {
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  user-select: none;
  -webkit-user-select: none;
}

.preview-picture img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}

.preview-status {
  position: absolute;
  top: 0;
  right: 0;
  height: 1.875rem;
  width: 1.875rem;
  border-radius: 50%;
  border: 0.375rem solid var(--container-bg);
}

.preview-status.online {
  background-color: var(--green-pri);
}

.preview-status.offline {
  background-color: var(--red-pri);
}

.preview-primary {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--blue-pri);
}

.preview-secondary {
  font-weight: 600;
}
</style>
