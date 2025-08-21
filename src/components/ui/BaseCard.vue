<script setup>
const props = defineProps({
  title: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <div class="card">
    <span v-if="title" class="container-title">
      <h3>
        {{ title }}
      </h3>
    </span>
    <slot name="card"></slot>
  </div>
</template>

<style>
.card {
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  border: 1px solid var(--container-border);
  border-radius: 0.375rem;
  background: var(--container-bg);
}

.card:first-of-type {
  border-top: 0;
  border-radius: 0 0 0.375rem 0.375rem;
}

.card:first-of-type:last-of-type {
  border-bottom: 0;
  border-radius: 0;
}

.container.full .card {
  min-height: calc(100% - 3rem);
  justify-content: flex-start;
}

.card.grow {
  width: 100%;
}

.card + .card {
  margin-top: 0.75rem;
  border-radius: 0.375rem;
}

.card:last-of-type {
  border-bottom: 0;
  border-radius: 0.375rem 0.375rem 0 0;
}

.card + .card::before {
  content: "";
  top: calc(-0.75rem - 1px);
  height: 0.75rem;
  width: calc(100% + 2px);
  background: var(--main-bg-pri);
  position: absolute;
}

.card form {
  flex-direction: column;
  align-items: center;
  width: 100%;
}

dialog form {
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.card .form,
.card .table {
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.card .element {
  display: flex;
  width: 100%;
  padding: 1.5rem;
}

.card .element + element {
  display: flex;
  width: 100%;
  padding: 1.5rem;
  border-top: 1px solid var(--container-border);
}

.card .element:first-child {
  padding-top: 0;
  border: 0;
}

.card .element:last-child {
  padding-bottom: 0;
  border: 0;
}

.card + .card div.element {
  padding-top: 1.5rem;
  border-bottom: none;
}

.card + .card div.element:not(:first-of-type) {
  border-top: 1px solid var(--container-border);
}

.card + .card div.element:last-child {
  padding-bottom: 1.5rem;
}

.container > .card + .card:last-of-type .element:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.card:first-of-type:not(:last-of-type) .element {
  padding-bottom: 1.5rem;
}

.card .element:not(:last-of-type) {
  border-bottom: 1px solid var(--container-border);
}

.card .dual {
  flex-direction: row;
  width: 100%;
}

.card .dual > :last-child {
  margin-left: 0.75rem;
}

/* Zoom fix */
.card:last-of-type .element:last-of-type {
  padding-top: 1.475rem;
  padding-bottom: 0.05rem;
}

.container-title {
  width: 100%;
  text-overflow: ellipsis;
}

.container-title h3 {
  margin: 0;
  padding: 1.25rem 0;
  width: 100%;
  text-align: center;
  font-size: 1.15rem;
  border-bottom: 1px solid var(--container-border);
  color: var(--label-tri);
  font-weight: 600;
}

.card:first-of-type .container-title h3 {
  padding: 0 0 1.25rem 0;
}
</style>
