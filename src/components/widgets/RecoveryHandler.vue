<script setup>
import { reactive, watch } from "vue";

import { recovery } from "@/hooks/identity.js";

import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const emits = defineEmits(["auth-window", "banner"]);

const userRecoveryCredentials = reactive({
  email: {
    value: "",
    error: "",
  },
});

watch(
  () => [userRecoveryCredentials.email.value],
  ([newEmail], [oldEmail]) => {
    if (newEmail !== oldEmail && userRecoveryCredentials.email.error) {
      userRecoveryCredentials.email.error = "";
    }
  }
);

async function userRecovery() {
  userRecoveryCredentials.email.error = "";

  const email = userRecoveryCredentials.email.value;

  // validating user inputs
  if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    ) ||
    email.length > 64
  ) {
    userRecoveryCredentials.email.error = "Email address invalid";
    return;
  }

  try {
    const result = await recovery(email);

    // handling password recovery result
    if (result.error && result.error !== "") {
      emits("banner", {
        message: result.error,
        type: "error",
        animate: true,
      });
    } else {
      emits("banner", {
        message: "A recovery link was sent to your email address",
        type: "info",
        action: "login",
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
    <form @submit.prevent="userRecovery">
      <div class="auth-container">
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
        <span
          class="auth-option go-login"
          @click="$emit('auth-window', 'login')"
          >I'm no longer a pleb and I'm ready to login</span
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
