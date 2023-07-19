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
import IconGoogle from "@/assets/images/general/IconGoogle.vue";
import IconGithub from "@/assets/images/general/IconGithub.vue";

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
  confirmPassword: {
    value: "",
    error: "",
    success: "",
  },
  nickname: {
    value: "",
    error: "",
    success: "",
  },
  successTimeoutId: null,
});

watch(
  () => [userCredentials.email.value, userCredentials.password.value],
  (newValues, oldValues) => {
    if (userCredentials.email.error && userCredentials.email.value !== "") {
      userCredentials.email.error = "";
    }
    if (
      userCredentials.password.error &&
      userCredentials.password.value !== ""
    ) {
      userCredentials.password.error = "";
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

  if (
    userCredentials.password.value !== userCredentials.confirmPassword.value
  ) {
    userCredentials.confirmPassword.error = "Passwords do not match.";
    return;
  }

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

function passwordRecovery() {}

const authWindow = ref("login");

function authSwap(value) {
  authWindow.value = value;
}
</script>

<template>
  <div class="element">
    <div class="form">
      <transition name="slide-fade" mode="out-in">
        <div v-if="authWindow === 'login'" class="auth-container">
          <form @submit.prevent="userLogin">
            <h3>Account Login</h3>
            <BaseInput
              id="user-email"
              label="Email address"
              :error="userCredentials.email.error"
              :success="userCredentials.email.success"
              icon="email"
              v-model:value="userCredentials.email.value"
            />
            <BaseInput
              id="user-password"
              label="Password"
              :error="userCredentials.password.error"
              :success="userCredentials.password.success"
              icon="lock"
              v-model:value="userCredentials.password.value"
              action
              @action="authSwap('recovery')"
              action-type="large"
              action-label="help"
            />
            <BaseButton id="login-submit" color="default" value="login" />
            <BaseButton
              id="logout-submit"
              color="orange"
              button
              @click.prevent="userLogout"
            >
              <template #button>logout</template>
            </BaseButton>
            <div class="or-separator"><span>or</span></div>
            <BaseButton
              id="login-google"
              color="blue"
              button
              @click.prevent="loginWithGoogle"
            >
              <template #button
                ><IconGoogle /><span>login with google</span></template
              >
            </BaseButton>
            <BaseButton
              id="login-github"
              color="blue"
              button
              @click.prevent="loginWithGithub"
            >
              <template #button
                ><IconGithub /><span>login with github</span></template
              >
            </BaseButton>
            <span class="auth-option go-signup" @click="authSwap('signup')"
              >I'm a pleb and I don't have an account yet</span
            >
          </form>
        </div>
        <div v-else-if="authWindow === 'signup'" class="auth-container">
          <form @submit.prevent="userSignup">
            <h3>Account Registration</h3>
            <BaseInput
              id="user-nickname"
              label="Nickname"
              :error="userCredentials.nickname.error"
              :success="userCredentials.nickname.success"
              icon="people"
              v-model:value="userCredentials.nickname.value"
            />
            <BaseInput
              id="user-email"
              label="Email address"
              :error="userCredentials.email.error"
              :success="userCredentials.email.success"
              icon="email"
              v-model:value="userCredentials.email.value"
            />
            <BaseInput
              id="user-password"
              label="Password"
              :error="userCredentials.password.error"
              :success="userCredentials.password.success"
              icon="lock"
              v-model:value="userCredentials.password.value"
            />
            <BaseInput
              id="user-password-confirm"
              label="Confirm password"
              :error="userCredentials.confirmPassword.error"
              :success="userCredentials.confirmPassword.success"
              icon="lock"
              v-model:value="userCredentials.confirmPassword.value"
            />
            <BaseButton id="signup-submit" color="orange" value="sign up" />
            <div class="or-separator"><span>or</span></div>
            <BaseButton
              id="signup-google"
              color="blue"
              button
              @click.prevent="loginWithGoogle"
            >
              <template #button>signup with google</template>
            </BaseButton>
            <BaseButton
              id="signup-github"
              color="blue"
              button
              @click.prevent="loginWithGithub"
            >
              <template #button>signup with github</template>
            </BaseButton>
            <span class="auth-option go-login" @click="authSwap('login')"
              >I'm not a pleb and I already have an account</span
            >
          </form>
        </div>
        <div v-else-if="authWindow === 'recovery'" class="auth-container">
          <form @submit.prevent="passwordRecovery">
            <h3>Password Recovery</h3>
            <BaseInput
              id="user-email-recovery"
              label="Email address"
              :error="userCredentials.email.error"
              :success="userCredentials.email.success"
              icon="email"
              v-model:value="userCredentials.email.value"
            />
            <BaseButton
              id="recovery-submit"
              color="green"
              value="recover password"
            />
            <span class="auth-option go-login" @click="authSwap('login')"
              >I'm no longer a pleb and I'm ready to login</span
            >
          </form>
        </div>
      </transition>
    </div>
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
  text-transform: uppercase;
  font-weight: 600;
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
  font-weight: 500;
  background: var(--container-bg);
  padding: 0.5rem;
}

.auth-option {
  margin-top: 1.5rem;
  font-size: 1.125rem;
  padding: 0.5rem;
  cursor: pointer;
  font-weight: 500;
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
