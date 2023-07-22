<script setup>
import { ref, reactive, watch, onMounted } from "vue";

import {
  login,
  signup,
  logout,
  loginWithGoogle,
  loginWithGithub,
  requestPasswordRecovery,
  startUserSession,
} from "@/hooks/identity.js";

import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBanner from "@/components/ui/BaseBanner.vue";

import IconGoogle from "@/assets/images/general/IconGoogle.vue";
import IconGithub from "@/assets/images/general/IconGithub.vue";

import { useBanner } from "@/hooks/banner.js";

const { bannerOptions, displayBanner, closeBanner } = useBanner();

const userSignupCredentials = reactive({
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
  result: null,
});

const userLoginCredentials = reactive({
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
  successTimeoutId: null,
  result: null,
});

const userRecoveryCredentials = reactive({
  email: {
    value: "",
    error: "",
    success: "",
  },
  successTimeoutId: null,
  result: null,
});

// resetting errors on user input
watch(
  () => [
    userLoginCredentials.email.value,
    userLoginCredentials.password.value,
    userSignupCredentials.email.value,
    userSignupCredentials.password.value,
    userRecoveryCredentials.email.value,
  ],
  () => {
    if (
      userLoginCredentials.email.error &&
      userLoginCredentials.email.value !== ""
    ) {
      userLoginCredentials.email.error = "";
    }
    if (
      userLoginCredentials.password.error &&
      userLoginCredentials.password.value !== ""
    ) {
      userLoginCredentials.password.error = "";
    }
    if (
      userSignupCredentials.email.error &&
      userSignupCredentials.email.value !== ""
    ) {
      userSignupCredentials.email.error = "";
    }
    if (
      userSignupCredentials.password.error &&
      userSignupCredentials.password.value !== ""
    ) {
      userSignupCredentials.password.error = "";
    }
    if (
      userRecoveryCredentials.email.error &&
      userRecoveryCredentials.email.value !== ""
    ) {
      userRecoveryCredentials.email.error = "";
    }
  }
);

// handle auth callback for social login/signup
onMounted( () => {
  startUserSession()
});

// login handler
async function userLogin() {
  userLoginCredentials.result = null;

  userLoginCredentials.email.error = "";
  userLoginCredentials.password.error = "";

  userLoginCredentials.email.success = "";
  userLoginCredentials.password.success = "";

  const password = userLoginCredentials.password.value;
  const email = userLoginCredentials.email.value;

  // validating user inputs
  let hasError = false;

  if (password.length < 8 || password.length > 64) {
    setTimeout(() => {
      userLoginCredentials.password.error = "Password invalid";
    }, 1);
    hasError = true;
  }

  if (
    !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email) ||
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
      displayBanner({
        message: result.error,
        type: "error",
        animate: true,
      });
    } else {
      const userNickname =
        result.success.user_metadata.full_name ||
        result.success.user_metadata.nickname;
      displayBanner({
        message: `You are now logged in as <strong>${userNickname}</strong>`,
        type: "success",
        animate: true,
      });
    }
  } catch (error) {
    console.error("App error => Login: ", error);
  }
}

// signup handler
async function userSignup() {
  userSignupCredentials.result = null;

  userSignupCredentials.nickname.error = "";
  userSignupCredentials.email.error = "";
  userSignupCredentials.password.error = "";
  userSignupCredentials.confirmPassword.error = "";

  userSignupCredentials.nickname.success = "";
  userSignupCredentials.email.success = "";
  userSignupCredentials.password.success = "";
  userSignupCredentials.confirmPassword.success = "";

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
    !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email) ||
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
      displayBanner({
        message: result.error,
        type: "error",
        animate: true,
      });
    } else {
      authWindow.value = "login";
      userLoginCredentials.email.value = userSignupCredentials.email.value;
      userLoginCredentials.password.value =
        userSignupCredentials.password.value;
      displayBanner({
        message: "Your account was successfully created! You can now login",
        type: "success",
        animate: true,
      });
    }
  } catch (error) {
    console.error("An app error occurred:", error);
  }
}

// password recovery handler
async function passwordRecovery() {
  userRecoveryCredentials.result = null;

  userRecoveryCredentials.email.error = "";
  userRecoveryCredentials.email.success = "";

  const email = userRecoveryCredentials.email.value;

  // validating user inputs
  if (
    !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email) ||
    email.length > 64
  ) {
    userRecoveryCredentials.email.error = "Email address invalid";
    return;
  }

  try {
    const result = await requestPasswordRecovery(email);

    // handling password recovery result
    if (result.error && result.error !== "") {
      displayBanner({
        message: result.error,
        type: "error",
        animate: true,
      });
    } else {
      displayBanner({
        message: "A recovery link was sent to your email address",
        type: "info",
        action: "login",
        animate: true,
      });
    }

    console.log("recovery: ", userRecoveryCredentials.result);
  } catch (error) {
    console.error("An app error occurred:", error);
  }
}

// logout handler
function userLogout() {
  try {
    logout();
  } catch (error) {
    console.error("An app error occurred:", error);
  }
}

// authentication window (login, signup, password recovery)
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
              :error="userSignupCredentials.nickname.error"
              :success="userSignupCredentials.nickname.success"
              icon="people"
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
            />
            <BaseInput
              id="user-password-confirm"
              label="Confirm password"
              :error="userSignupCredentials.confirmPassword.error"
              :success="userSignupCredentials.confirmPassword.success"
              icon="lock"
              v-model:value="userSignupCredentials.confirmPassword.value"
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
              :error="userRecoveryCredentials.email.error"
              :success="userRecoveryCredentials.email.success"
              icon="email"
              v-model:value="userRecoveryCredentials.email.value"
            />
            <BaseButton
              id="recovery-submit"
              color="orange"
              value="recover password"
            />
            <div class="or-separator"><span>or</span></div>
            <BaseButton
              id="recovery-google"
              color="blue"
              button
              @click.prevent="loginWithGoogle"
            >
              <template #button>recover with google</template>
            </BaseButton>
            <BaseButton
              id="recovery-github"
              color="blue"
              button
              @click.prevent="loginWithGithub"
            >
              <template #button>recover with github</template>
            </BaseButton>
            <span class="auth-option go-login" @click="authSwap('login')"
              >I'm no longer a pleb and I'm ready to login</span
            >
          </form>
        </div>
      </transition>
    </div>
  </div>

  <teleport to="#app">
    <transition name="banner" mode="out-in">
      <BaseBanner
        v-if="bannerOptions.visibility"
        @bannerClose="closeBanner"
        :message="bannerOptions.message"
        :action="bannerOptions.action"
        :animate="bannerOptions.animate"
        :type="bannerOptions.type"
      />
    </transition>
  </teleport>
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
