<script setup>
import { ref, reactive, watch } from "vue";

import {
  login,
  signup,
  logout,
  loginWithGoogle,
  loginWithGithub,
} from "@/hooks/identity.js";

import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const userCredentials = reactive({
  email: {
    value: "",
    error: "",
    success: "",
  },
  password: {
    value: "",
    error: "",
    success: "",
  },
  nickname: {
    value: "",
    error: "",
    success: "",
  },
});

watch(
  () => userCredentials.value,
  (newValue) => {
    if (!!userCredentials.error && newValue !== "") {
      userCredentials.error = "";
    }
  }
);

async function userLogin() {
  userCredentials.success = "";
  userCredentials.error = "";

  try {
    const result = await login(
      userCredentials.email.value,
      userCredentials.password.value
    );

    if (result.error && result.error !== "") {
      userCredentials.error = result.error;
    }

    if (result.success && result.success !== "") {
      if (userCredentials.successTimeoutId) {
        clearTimeout(userCredentials.successTimeoutId.value);
      }

      userCredentials.success = result.success;
      userCredentials.successTimeoutId = ref(
        setTimeout(() => {
          userCredentials.success = "";
        }, 1000)
      );
    }
  } catch (error) {
    console.error("An app error occurred:", error);
    userCredentials.error = "App error: Signup";
  }
}

async function userSignup() {
  userCredentials.success = "";
  userCredentials.error = "";

  try {
    const result = await signup(
      userCredentials.email.value,
      userCredentials.password.value,
      userCredentials.nickname.value
    );

    if (result.error && result.error !== "") {
      userCredentials.error = result.error;
    }

    if (result.success && result.success !== "") {
      if (userCredentials.successTimeoutId) {
        clearTimeout(userCredentials.successTimeoutId.value);
      }

      userCredentials.success = result.success;
      userCredentials.successTimeoutId = ref(
        setTimeout(() => {
          userCredentials.success = "";
        }, 1000)
      );
    }
  } catch (error) {
    console.error("An app error occurred:", error);
    userCredentials.error = "App error: Login";
  }
}

function userLogout() {
  try {
    logout();
    userCredentials.email.value = "";
    userCredentials.password.value = "";
    userCredentials.success = "Logged out successfully";
    userCredentials.error = "";
  } catch (error) {
    console.error("An app error occurred:", error);
    userCredentials.error = "App error: Logout";
  }
}
</script>

<template>
  <div class="element">
    <form @submit.prevent="userLogin">
      <BaseInput
        id="user-nickname"
        label="Nickname"
        :error="userCredentials.nickname.error"
        :success="userCredentials.nickname.success"
        icon="people"
        v-model:value="userCredentials.nickname.value"
        :copy="false"
      />
      <BaseInput
        id="user-email"
        label="Email address"
        :error="userCredentials.email.error"
        :success="userCredentials.email.success"
        icon="email"
        v-model:value="userCredentials.email.value"
        :copy="false"
      />
      <BaseInput
        id="user-password"
        label="Password"
        :error="userCredentials.password.error"
        :success="userCredentials.password.success"
        icon="lock"
        v-model:value="userCredentials.password.value"
        :copy="false"
      />
      <BaseButton id="login-submit" color="default" value="login" />
      <BaseButton
        id="signup-submit"
        color="blue"
        value="Sign up"
        button
        @click.prevent="userSignup"
      />
      <BaseButton
        id="logout-submit"
        color="orange"
        value="Logout"
        button
        @click.prevent="userLogout"
      />
      <BaseButton
        id="login-google"
        color="default"
        value="Google Login"
        button
        @click.prevent="loginWithGoogle"
      />
      <BaseButton
        id="login-github"
        color="default"
        value="Github Login"
        button
        @click.prevent="loginWithGithub"
      />
    </form>
  </div>
</template>

<style scoped></style>
