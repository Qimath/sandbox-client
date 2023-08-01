<script setup>
import { computed, reactive, watch } from "vue";

import { useUserStore } from "@/stores/user.js";
import { updateProfile } from "@/hooks/identity.js";

import BaseButton from "@/components/ui/BaseButton.vue";
import BasePreview from "@/components/ui/BasePreview.vue";
import BaseInput from "@/components/ui/BaseInput.vue";

const emits = defineEmits(["auth-window", "banner"]);

const userStore = useUserStore();

const userName = computed(() => userStore.getAccount().nickname);
const userEmail = computed(() => userStore.getAccount().email);
const userAvatar = computed(() => userStore.getAccount().avatar);
const userStatus = computed(() => userStore.getAccount().login);

const userProvider = computed(() => userStore.getAccount().provider);
const isEmailProvider = userProvider.value === "email" ? true : false;

const userProfileCredentials = reactive({
  email: {
    value: userEmail.value,
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
});

watch(
  () => [
    userProfileCredentials.email.value,
    userProfileCredentials.password.value,
    userProfileCredentials.confirmPassword.value,
  ],
  (
    [newEmail, newPassword, newConfirmPassword],
    [oldEmail, oldPassword, oldConfirmPassword]
  ) => {
    if (newEmail !== oldEmail && userProfileCredentials.email.error) {
      userProfileCredentials.email.error = "";
    }
    if (newPassword !== oldPassword && userProfileCredentials.password.error) {
      userProfileCredentials.password.error = "";
    }
    if (
      newConfirmPassword !== oldConfirmPassword &&
      userProfileCredentials.confirmPassword.error
    ) {
      userProfileCredentials.confirmPassword.error = "";
    }
  }
);

async function userUpdate() {
  userProfileCredentials.result = null;

  userProfileCredentials.email.error = "";
  userProfileCredentials.password.error = "";
  userProfileCredentials.confirmPassword.error = "";

  const password = userProfileCredentials.password.value;
  const confirmPassword = userProfileCredentials.confirmPassword.value;
  const email = userProfileCredentials.email.value;

  // validating user inputs
  let hasError = false;

  // Only validate the email if the field is not empty
  if (
    email &&
    (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    ) ||
      email.length > 64)
  ) {
    setTimeout(() => {
      userProfileCredentials.email.error = "Email address invalid";
    }, 1);
    hasError = true;
  }

  // Only validate the password if the field is not empty
  if (password) {
    // Password field is not empty, check the length
    if (password.length < 8 || password.length > 64) {
      setTimeout(() => {
        userProfileCredentials.password.error = "Invalid password length";
      }, 1);
      hasError = true;
    }

    // If confirm password doesn't match password or is empty
    if (confirmPassword !== password || confirmPassword === "") {
      setTimeout(() => {
        userProfileCredentials.confirmPassword.error = "Passwords do not match";
      }, 1);
      hasError = true;
    }
  }

  if (hasError) return;

  try {
    const result = await updateProfile(email, password);

    // handling signup result
    if (result.error && result.error !== "") {
      emits("banner", {
        message: result.error,
        type: "error",
        animate: true,
      });
    } else {
      emits("banner", {
        message: "Your profile has been successfully updated!",
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
    <div class="form">
      <div class="auth-container">
        <h3>Account Overview</h3>
        <BasePreview
          :primary="userName"
          :secondary="userEmail"
          :picture="userAvatar"
          :status="userStatus"
        />
        <form @submit.prevent="userUpdate">
          <BaseInput
            id="user-email"
            label="Email address"
            :error="userProfileCredentials.email.error"
            :success="userProfileCredentials.email.success"
            icon="email"
            v-model:value="userProfileCredentials.email.value"
            :disabled="!isEmailProvider"
          />
          <BaseInput
            id="user-password"
            label="Password"
            :error="userProfileCredentials.password.error"
            :success="userProfileCredentials.password.success"
            icon="lock"
            v-model:value="userProfileCredentials.password.value"
            type="password"
            :disabled="!isEmailProvider"
          />
          <BaseInput
            id="user-password-confirm"
            label="Confirm password"
            :error="userProfileCredentials.confirmPassword.error"
            :success="userProfileCredentials.confirmPassword.success"
            icon="lock"
            v-model:value="userProfileCredentials.confirmPassword.value"
            type="password"
            :disabled="!isEmailProvider"
          />
          <BaseButton id="profile-submit" color="blue" value="update & save" />
        </form>
        <div class="or-separator"><span>or</span></div>
        <BaseButton
          id="go-overview"
          color="default"
          button
          @click.prevent="$emit('auth-window', 'overview')"
        >
          <template #button>profile overview</template>
        </BaseButton>
      </div>
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

.preview-info {
  margin-bottom: 2rem;
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
