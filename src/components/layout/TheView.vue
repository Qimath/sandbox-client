<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
let transitionName = ref("default-transition");

router.beforeEach((to, from, next) => {
  if (
    to.name === "home" ||
    to.name === "settings" ||
    to.name === "account" ||
    to.name === "dashboard" ||
    from.name === "home" ||
    from.name === "settings" ||
    from.name === "account" ||
    from.name === "dashboard"
  ) {
    transitionName.value = "home";
  } else {
    transitionName.value = "default";
  }
  next();
});
</script>

<template>
  <div class="view">
    <router-view v-slot="{ Component }">
      <transition :name="transitionName" mode="out-in">
        <keep-alive
          :include="[
            'MethodsView',
            'DebuggingView',
            'TicketView',
            'ContactView',
            'LaboratoryView',
            'AccountView',
          ]"
        >
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style>
div.view {
  flex-direction: row;
  justify-content: center;
  align-items: start;
  margin: 1rem 0 1rem 1rem;
  height: calc(
    100vh - var(--layout-header-height) - var(--layout-footer-height) - 2rem
  );
  min-height: calc(
    100vh - var(--layout-header-height) - var(--layout-footer-height) - 2rem
  );
  max-height: calc(
    100vh - var(--layout-header-height) - var(--layout-footer-height) - 2rem
  );
}

.view-wrapper {
  width: 100%;
  height: 100%;
}

.home-enter-active,
.home-leave-active {
  transition: all 0.5s ease;
}
.home-enter-from,
.home-leave-to {
  transform: translateY(5%);
  opacity: 0;
}
.home-enter-to,
.home-leave-from {
  transform: translateY(0);
}

.default-enter-active,
.default-leave-active {
  transition: all 0 ease;
}
.default-enter-from,
.default-leave-to {
  transform: scale(1);
}
.default-enter-to,
.default-leave-from {
  transform: scale(1);
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.75rem;
}

.button-group > * {
  margin-top: 0 !important;
}

.button-group > :first-child {
  margin-right: 0.75rem;
}

.void-zone {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25vh;
  margin-bottom: 5rem;
}
</style>
