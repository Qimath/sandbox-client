<script setup></script>

<template>
  <footer>
    <h3></h3>
    <p>a simple vue sandbox &nbsp; - &nbsp; full code available on</p>
    <a href="https://github.com/Qimath/sandbox-client">Github</a>
  </footer>
</template>

<style scoped>
footer {
  background: var(--container-bg);
  height: var(--layout-footer-height);
  border-top: 1px solid var(--container-border);
  z-index: 50;
  justify-content: center;
  align-items: center;
  color: var(--header-sandbox);
  font-weight: 500;
}

a {
  margin-left: 0.25rem;
  color: var(--orange-pri);
}

a:hover {
  text-decoration: underline;
}
</style>
