<script setup></script>

<template>
  <footer>
    <p>a simple (crisp) sandbox &nbsp; - &nbsp; full code available on</p>
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
  font-weight: 600;
}

a {
  margin-left: 0.375rem;
  color: var(--orange-pri);
}

a:hover {
  text-decoration: underline;
}
</style>
