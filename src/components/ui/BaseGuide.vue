<script setup>
const props = defineProps({
  desc: {
    type: String,
    default: "",
  },
  img: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <section>
    <div>
      <img :src="img" />
    </div>
    <div v-html="desc"></div>
  </section>
</template>

<style scoped>
section {
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

section:nth-child(2n) {
  flex-direction: row-reverse;
}

section:nth-child(2n) :deep(p) {
  justify-content: flex-end;
  text-align: right;
}

section div {
  flex-direction: column;
  justify-items: flex-end;
}

section :deep(p) {
  font-size: 1.125rem;
  font-weight: 400;
  margin: 0.25rem 0;
  transition: all 0.3s linear;
  cursor: default;
}

section img {
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  margin: 0 2rem;
  border: 0.25rem solid var(--label-tri);
  user-select: none;
  transition: all 0.2s linear;
}

section img:hover {
  transform: scale(1.1);
}
</style>
