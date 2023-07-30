<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

import { useUserStore } from "@/stores/user.js";
import { logout } from "@/hooks/identity.js";

import BaseButton from "@/components/ui/BaseButton.vue";
import BasePreview from "@/components/ui/BasePreview.vue";

const emits = defineEmits(["auth-window", "banner"]);

const userStore = useUserStore();

const router = useRouter();
const route = useRoute();

const userName = computed(() => userStore.getAccount().nickname);
const userEmail = computed(() => userStore.getAccount().email);
const userAvatar = computed(() => userStore.getAccount().avatar);
const userStatus = computed(() => userStore.getAccount().login);

async function authLogout() {
  try {
    const result = await logout();

    // handling logout result
    if (result.error && result.error !== "") {
      emits("banner", {
        message: result.error,
        type: "error",
        animate: true,
      });
    } else {
      window.sessionStorage.setItem("loggedOut", "true");
      router.push({ name: "account" }).then(() => router.go());
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
        <h3>Account Profile</h3>
        <BasePreview
          :primary="userName"
          :secondary="userEmail"
          :picture="userAvatar"
          :status="userStatus"
        />
        <BaseButton id="logout" color="red" button @click.prevent="authLogout">
          <template #button>logout</template>
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
