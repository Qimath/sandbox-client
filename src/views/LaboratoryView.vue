<script setup>
import { onActivated, ref } from "vue";

import BaseContainer from "@/components/ui/BaseContainer.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseBanner from "@/components/ui/BaseBanner.vue";

import { useBanner } from "@/hooks/banner.js";

const { bannerOptions, displayBanner, closeBanner } = useBanner();

onActivated(() => {
  restrictedAccessError();
});

function restrictedAccessError() {
  displayBanner({
    message:
      "Access Restricted. You do not have permission to view this content at the moment.",
    type: "error",
    animate: true,
  });
}

const isDeploy = ref(true);
const isLive = ref(true);

function swapSaveDeploy() {
  isDeploy.value = !isDeploy.value;
}
function swapDraftLive() {
  isLive.value = !isLive.value;
}
</script>

<template>
  <div class="view-wrapper">
    <BaseContainer grow full>
      <template #container>
        <BaseCard>
          <template #card>
            <nav class="chrisp">
              <div class="wrapper">
                <section class="left">
                  <div class="bot-exit">
                    <span class="label">exit</span>
                  </div>
                  <div class="bot-back">
                    <span class="material-symbols-outlined">undo</span>
                  </div>
                  <div class="bot-next">
                    <span class="material-symbols-outlined">redo</span>
                  </div>
                  <div class="bot-actions">
                    <span class="material-symbols-outlined">apps</span>
                    <span class="label">actions</span>
                  </div>
                  <div class="bot-deploy" v-if="isDeploy" @click="swapSaveDeploy">
                    <span class="material-symbols-outlined">rocket_launch</span>
                    <span class="label">deploy</span>
                  </div>
                  <div class="bot-save" v-if="!isDeploy" @click="swapSaveDeploy">
                    <span class="material-symbols-outlined">save</span>
                    <span class="label">save</span>
                  </div>
                </section>
                <section class="mid">
                  <h3 class="bot-title">My Weekend Responder</h3>
                </section>
                <section class="right">
                  <div class="bot-lang">
                    <img src="https://static.crisp.help/images/site/common/flags/fr.png" />
                    <span class="label">French</span>
                    <span class="material-symbols-outlined">arrow_drop_down</span>
                  </div>
                  <div class="bot-view" @click="swapDraftLive">
                    <span class="material-symbols-outlined">visibility</span>
                    <span class="label" v-if="isLive">live</span>
                    <span class="label" v-if="!isLive">draft</span>
                  </div>
                  <div class="bot-test">
                    <span class="material-symbols-outlined">smart_toy</span>
                    <span class="label">test</span>
                  </div>
                </section>
              </div>
            </nav>
          </template>
        </BaseCard>
      </template>
    </BaseContainer>

    <teleport to="body">
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
  </div>
</template>

<style scoped>
.container {
  background: rgb(241, 243, 245) !important;
}
nav.chrisp {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  background: white;
  border-top: 1px solid rgb(214, 216, 220);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 8px 16px, rgba(0, 0, 0, 0.05) 0px 4px 4px;
}

.wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
}

section {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

section.left {
  justify-content: left;
}

section.right {
  justify-content: right;
}

section.mid {
  width: 15%;
}

.bot-title {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: rgb(95, 97, 98);
}

.left div {
  height: 100%;
  border-right: 1px solid rgb(228, 229, 232);
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right div {
  height: 100%;
  border-left: 1px solid rgb(228, 229, 232);
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

span.material-symbols-outlined {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-variation-settings: "FILL" 1, "wght" 700, "GRAD" 0, "opsz" 48;
}
.label {
  text-transform: uppercase;
  padding-top: 2px;
  font-size: 12px;
  font-weight: 600;
}

.bot-deploy .label,
.bot-save .label,
.bot-view .label,
.bot-test .label,
.bot-actions .label {
  margin-left: 10px;
}

.bot-lang .label {
  margin-left: 10px;
  margin-right: 80px;
  text-transform: none;
  font-size: 14px;
  font-weight: 500;
}

.bot-deploy {
  color: white;
  background: var(--green-duo);
}

.bot-save {
  color: white;
  background: var(--blue-duo);
}

.bot-test {
  color: var(--orange-duo);
}

.bot-lang img {
  width: 24px;
  height: 16px;
}

section div,
section div * {
  cursor: pointer;
  user-select: none;
}

section div {
  transition: 0.1s linear;
}

section div:hover {
  background: var(--indigo-light);
  color: white;
}

section div:active {
  background: var(--indigo-plus);
  color: white;
}

section div.bot-deploy:hover {
  background: var(--green-pri);
  color: white;
}

section div.bot-deploy:active {
  background: var(--green-tri);
  color: white;
}

section div.bot-save:hover {
  background: var(--blue-pri);
  color: white;
}

section div.bot-save:active {
  background: var(--blue-tri);
  color: white;
}

section div.bot-test:hover {
  background: var(--orange-duo);
  color: white;
}

section div.bot-test:active {
  background: var(--orange-tri);
  color: white;
}
</style>
