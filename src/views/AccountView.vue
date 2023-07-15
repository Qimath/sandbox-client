<script setup>
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently, logout } = useAuth0()

const login = () => {
  loginWithRedirect({ returnTo: window.location.origin })
}

const handleLogout = () => {
  logout({ returnTo: window.location.origin })
}

const doSomethingWithToken = async () => {
  const token = await getAccessTokenSilently()
  // Perform actions with the token
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
      <button @click="login">Log in</button>
      <pre v-if="isAuthenticated"><code>{{ user }}</code></pre>
    </div>
  </div>
</template>

<style scoped></style>
