<script setup></script>

<template>
  <div class="card">
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
  border-left: 1px solid var(--container-border);
  border-right: 1px solid var(--container-border);
}

.container.full .card {
  height: calc(100% - 3rem);
}

.card.grow {
  width: 100%;
}

.card + .card {
  margin-top: 0.5rem;
}

.card + .card::before {
  content: '';
  top: -0.5rem;
  height: 0.5rem;
  width: calc(100% + 2px);
  background: var(--main-bg-pri);
  position: absolute;
}

.card form {
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

dialog form {
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.card .form,
.card .table {
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.card .element {
  display: flex;
  width: 100%;
  padding: 1.5rem;
  border-bottom: 1px solid var(--container-border);
}

.card .element:first-child {
  padding-top: 0;
}

.card .element:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.card + .card div.element {
  padding-top: 1.5rem;
  border-top: 1px solid var(--container-border);
  border-bottom: none;
}

.card + .card div.element:last-child {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--container-border);
}

.container > .card + .card:last-of-type .element:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.card:first-of-type:not(:last-of-type) .element {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--container-border);
}

.card .dual {
  flex-direction: row;
  width: 100%;
}

.card .dual > :last-child {
  margin-left: 10px;
}
</style>
