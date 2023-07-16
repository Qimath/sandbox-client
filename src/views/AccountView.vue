<script setup>
import useNetlifyIdentity from '../hooks/identity.js'

const { user, login, logout, signup } = useNetlifyIdentity()
</script>

<template>
  <div class="view-wrapper">
    <div>
      <button @click="login">Log in</button>
    </div>

    <div>
      <button @click="signup">Sign up</button>
    </div>

    <div>
      <button @click="logout">Log out</button>
    </div>

    <div v-if="user">
      <h2>User Details</h2>
      <p>Email: {{ user.email }}</p>
    </div>
  </div>
</template>

<style scoped></style>
