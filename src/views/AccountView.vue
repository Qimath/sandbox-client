<script setup>
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0()

const login = () => {
  loginWithRedirect()
}

const handleLogout = () => {
  logout({
    logoutParams: {
      returnTo: window.location.origin + '/account'
    }
  })
}
</script>

<template>
  <div class="view-wrapper">
    <div>
      <button @click="login">Log in</button>
    </div>

    <div>
      <button @click="handleLogout">Log out</button>
    </div>

    <div>
      <h2>User Profile</h2>
      <pre v-if="isAuthenticated"><code>{{ user }}</code></pre>
    </div>
  </div>
</template>

<style scoped></style>

