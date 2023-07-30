<script setup>
import { reactive, watch, onMounted } from "vue";
import { useRouter } from "vue-router";

import {
  login,
  authGoogle,
  authGithub,
  authCallback,
} from "@/hooks/identity.js";

import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

import IconGoogle from "@/assets/images/general/IconGoogle.vue";
import IconGithub from "@/assets/images/general/IconGithub.vue";

const emits = defineEmits(["auth-window", "banner"]);

const router = useRouter();

const userLoginCredentials = reactive({
  email: {
    value: "",
    error: "",
  },
  password: {
    value: "",
    error: "",
  },
});

onMounted(async () => {
  // Check if URL contains "access_token" parameter
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("access_token")) {
    await userCallback();
  }
});

watch(
  () => [userLoginCredentials.email.value, userLoginCredentials.password.value],
  ([newEmail, newPassword], [oldEmail, oldPassword]) => {
    if (newEmail !== oldEmail && userLoginCredentials.email.error) {
      userLoginCredentials.email.error = "";
    }
    if (newPassword !== oldPassword && userLoginCredentials.password.error) {
      userLoginCredentials.password.error = "";
    }
  }
);

async function userLogin() {
  userLoginCredentials.email.error = "";
  userLoginCredentials.password.error = "";

  const email = userLoginCredentials.email.value;
  const password = userLoginCredentials.password.value;

  // validating user inputs
  let hasError = false;

  if (password.length < 8 || password.length > 64) {
    setTimeout(() => {
      userLoginCredentials.password.error = "Password invalid";
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
      userLoginCredentials.email.error = "Email address invalid";
    }, 1);
    hasError = true;
  }

  if (hasError) return;

  try {
    const result = await login(
      userLoginCredentials.email.value,
      userLoginCredentials.password.value
    );

    // handling login result
    if (result.error && result.error !== "") {
      emits("banner", {
        message: result.error,
        type: "error",
        animate: true,
      });
    } else {
      window.sessionStorage.setItem("loggedIn", "true");
      router.push({ name: "dashboard" }).then(() => router.go());
    }
  } catch (error) {
    console.error("App error => Login: ", error);
  }
}

async function userCallback() {
  try {
    const result = await authCallback();

    // handling login result
    if (result.error && result.error !== "") {
      emits("banner", {
        message: result.error,
        type: "error",
        animate: true,
      });
    } else {
      window.sessionStorage.setItem("loggedIn", "true");
      router.push({ name: "dashboard" }).then(() => router.go());
    }
  } catch (error) {
    console.error("App error => Login: ", error);
  }
}
</script>

<template>
  <div class="element">
    <form @submit.prevent="userLogin">
      <div class="auth-container">
        <h3>Account Login</h3>
        <BaseInput
          id="user-email"
          label="Email address"
          :error="userLoginCredentials.email.error"
          :success="userLoginCredentials.email.success"
          icon="email"
          v-model:value="userLoginCredentials.email.value"
        />
        <BaseInput
          id="user-password"
          label="Password"
          :error="userLoginCredentials.password.error"
          :success="userLoginCredentials.password.success"
          icon="lock"
          v-model:value="userLoginCredentials.password.value"
          action
          @action="$emit('auth-window', 'recovery')"
          action-type="large"
          action-label="help"
          type="password"
        />
        <BaseButton id="login-submit" color="orange" value="login" />
        <div class="or-separator"><span>or</span></div>
        <BaseButton
          id="login-google"
          color="blue"
          button
          @click.prevent="authGoogle"
        >
          <template #button
            ><IconGoogle /><span>login with google</span></template
          >
        </BaseButton>
        <BaseButton
          id="login-github"
          color="blue"
          button
          @click.prevent="authGithub"
        >
          <template #button
            ><IconGithub /><span>login with github</span></template
          >
        </BaseButton>
        <span
          class="auth-option go-signup"
          @click="$emit('auth-window', 'signup')"
          >I'm a pleb and I don't have an account yet</span
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
  width: 30rem;
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
