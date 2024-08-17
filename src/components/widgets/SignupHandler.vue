<script setup>
import { reactive, watch } from "vue";

import { signup, authGoogle, authGithub } from "@/hooks/identity.js";

import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

import IconGoogle from "@/assets/images/icons/IconGoogle.vue";
import IconGithub from "@/assets/images/icons/IconGithub.vue";

const emits = defineEmits(["auth-window", "banner"]);

const userSignupCredentials = reactive({
  email: {
    value: "",
    error: "",
  },
  password: {
    value: "",
    error: "",
  },
  confirmPassword: {
    value: "",
    error: "",
  },
  nickname: {
    value: "",
    error: "",
  },
});

watch(
  () => [
    userSignupCredentials.email.value,
    userSignupCredentials.nickname.value,
    userSignupCredentials.password.value,
    userSignupCredentials.confirmPassword.value,
  ],
  (
    [newEmail, newNickname, newPassword, newConfirmPassword],
    [oldEmail, oldNickname, oldPassword, oldConfirmPassword]
  ) => {
    if (newEmail !== oldEmail && userSignupCredentials.email.error) {
      userSignupCredentials.email.error = "";
    }
    if (newNickname !== oldNickname && userSignupCredentials.nickname.error) {
      userSignupCredentials.nickname.error = "";
    }
    if (newPassword !== oldPassword && userSignupCredentials.password.error) {
      userSignupCredentials.password.error = "";
    }
    if (
      newConfirmPassword !== oldConfirmPassword &&
      userSignupCredentials.confirmPassword.error
    ) {
      userSignupCredentials.confirmPassword.error = "";
    }
  }
);

async function userSignup() {
  userSignupCredentials.result = null;

  userSignupCredentials.nickname.error = "";
  userSignupCredentials.email.error = "";
  userSignupCredentials.password.error = "";
  userSignupCredentials.confirmPassword.error = "";

  const nickname = userSignupCredentials.nickname.value;
  const password = userSignupCredentials.password.value;
  const confirmPassword = userSignupCredentials.confirmPassword.value;
  const email = userSignupCredentials.email.value;

  // validating user inputs
  let hasError = false;

  if (
    nickname.length < 2 ||
    nickname.length > 24 ||
    !/^[\w\s]+$/.test(nickname)
  ) {
    setTimeout(() => {
      userSignupCredentials.nickname.error = "Nickname invalid";
    }, 1);
    hasError = true;
  }

  if (password.length < 8 || password.length > 64) {
    setTimeout(() => {
      userSignupCredentials.password.error = "Invalid password length";
    }, 1);
    hasError = true;
  }

  if (confirmPassword !== password || confirmPassword === "") {
    setTimeout(() => {
      userSignupCredentials.confirmPassword.error = "Passwords do not match";
    }, 1);
    hasError = true;
  }

  if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    ) ||
    email.length > 64
  ) {
    setTimeout(() => {
      userSignupCredentials.email.error = "Email address invalid";
    }, 1);
    hasError = true;
  }

  if (hasError) return;

  try {
    const result = await signup(email, password, nickname);

    // handling signup result
    if (result.error && result.error !== "") {
      emits("banner", {
        message: result.error,
        type: "error",
        animate: true,
      });
    } else {
      emits("auth-window", "login");
      emits("banner", {
        message: "Your account was successfully created! You can now login",
        type: "success",
        animate: true,
      });
    }
  } catch (error) {
    console.error("An app error occurred:", error);
  }
}
</script>

<template>
  <div class="element">
    <form @submit.prevent="userSignup">
      <div class="auth-container">
        <h3>Account Registration</h3>
        <BaseInput
          id="user-nickname"
          label="Nickname"
          :error="userSignupCredentials.nickname.error"
          :success="userSignupCredentials.nickname.success"
          icon="nickname"
          v-model:value="userSignupCredentials.nickname.value"
        />
        <BaseInput
          id="user-email"
          label="Email address"
          :error="userSignupCredentials.email.error"
          :success="userSignupCredentials.email.success"
          icon="email"
          v-model:value="userSignupCredentials.email.value"
        />
        <BaseInput
          id="user-password"
          label="Password"
          :error="userSignupCredentials.password.error"
          :success="userSignupCredentials.password.success"
          icon="lock"
          v-model:value="userSignupCredentials.password.value"
          type="password"
        />
        <BaseInput
          id="user-password-confirm"
          label="Confirm password"
          :error="userSignupCredentials.confirmPassword.error"
          :success="userSignupCredentials.confirmPassword.success"
          icon="lock"
          v-model:value="userSignupCredentials.confirmPassword.value"
          type="password"
        />
        <BaseButton id="signup-submit" color="orange" value="sign up" />
        <div class="or-separator"><span>or</span></div>
        <BaseButton
          id="login-google"
          color="blue"
          button
          @click.prevent="authGoogle"
        >
          <template #button
            ><IconGoogle /><span>Signup with google</span></template
          >
        </BaseButton>
        <BaseButton
          id="login-github"
          color="blue"
          button
          @click.prevent="authGithub"
        >
          <template #button
            ><IconGithub /><span>Signup with github</span></template
          >
        </BaseButton>
        <span
          class="auth-option go-login"
          @click="$emit('auth-window', 'login')"
          >I'm not a pleb and I already have an account</span
        >
      </div>
    </form>
  </div>
</template>

<style scoped>
.element {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 50%;
  max-width: 50%;
  border: none;
}

.auth-container {
  flex-direction: column;
  align-items: center;
  width: 35rem;
  background: var(--container-bg);
  padding: 3rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 0.25rem;
}

h3 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
  color: var(--label-pri);
  font-weight: 700;
  user-select: none;
}

.or-separator {
  margin-top: calc(0.75rem + 1.5rem);
  width: 100%;
  margin-bottom: 1.5rem;
  height: 0;
  border-top: 1px solid var(--liner-tri);
  align-items: center;
  justify-content: center;
  color: var(--label-tri);
  user-select: none;
}

.or-separator span {
  position: absolute;
  text-transform: uppercase;
  font-weight: 600;
  background: var(--container-bg);
  padding: 0.5rem;
}

.auth-option {
  margin-top: 1.5rem;
  font-size: 1.125rem;
  padding: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  user-select: none;
  color: var(--label-tri);
}

.auth-option:hover {
  text-decoration: underline;
}

button span {
  align-items: center;
  justify-content: center;
}

button svg {
  fill: var(--main-text-reverse);
  height: 1.5rem;
  margin-right: 1.5rem;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(25%);
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
