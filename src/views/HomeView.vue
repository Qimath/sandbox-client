<script setup>
import { nextTick, reactive } from "vue";

import BaseContainer from "@/components/ui/BaseContainer.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseGuide from "@/components/ui/BaseGuide.vue";

import ImageSecrets from "@/assets/images/tutorial/secrets.png";
import ImageCopy from "@/assets/images/tutorial/copy.png";
import ImageSessionReset from "@/assets/images/tutorial/session_reset.png";
import ImageTroubleshoot from "@/assets/images/tutorial/troubleshoot.png";
import ImageWebsiteLoading from "@/assets/images/tutorial/website_loading.png";
import ImageConfig from "@/assets/images/tutorial/config.png";
import ImageAccount from "@/assets/images/tutorial/account.png";
import ImageSettings from "@/assets/images/tutorial/settings.png";
import ImageMore from "@/assets/images/tutorial/more.png";

const guides = reactive([
  {
    img: ImageSecrets,
    desc: `<p>Pops a modal which will allow you to set HMAC secrets for the Ticket Center and Email Verification.</p>
      <p>Secrets will remain saved for the current Website ID and be applied whenever it is loaded again.</p>
      <p>Loading a Contact Form & Ticket Center require this domain to be authorized. The latter also needs you to push an email address.</p>`,
  },
  {
    img: ImageCopy,
    desc: `<p>Click once to copy the Web SDK method & its value into the clipboard, and twice for the NPM version.</p>
      <p>If no value is present, a default placeholder will be created.</p>`,
  },
  {
    img: ImageSessionReset,
    desc: `<p>No need for incognito windows, the session can be reset automatically to start a fresh one.</p>
      <p>The 'clear LocalStorage on session reset' will clear all Crisp-stored data, and simulate a completely new visitor session. For instance to fire a trigger again.</p>`,
  },
  {
    img: ImageTroubleshoot,
    desc: `<p>The website's configuration is fetched, to consult all the of the current chatbox settings.</p>
      <p>'Troubleshoot Chatbox' will feed that data to an AI, and generate a somewhat questionable diagnostic.</p>`,
  },
  {
    img: ImageConfig,
    desc: `<p>The configuration file is also directly visible from this widget.</p>
      <p>'General informations, chatbox settings, but also customizations and triggers can be reviewed.</p>`,
  },
  {
    img: ImageWebsiteLoading,
    desc: `<p>Any Website ID can be loaded, and even if the chatbox visibility is restricted, the iFrame version can be displayed.</p>
      <p>It is also possible to load any (initiated) conversation by using its Session ID.</p>`,
  },
  {
    img: ImageAccount,
    desc: `<p>Account creation and login currently serves only to test Token IDs.</p>
      <p>Settings can be applied to 'Merge conversations', as described in the SDK documentation.</p>`,
  },
  {
    img: ImageSettings,
    desc: `<p>Set website preferences or chatbox configuration from this page.</p>
      <p>Settings such as Session Merge, Chatbox language, Cookie expiration timer, etc may require to reload the app.</p>
      <p>Crisp SDK callbacks can also be enabled to subscribe to certain events and be notified in the browser's console.</p>`,
  },
  {
    img: ImageMore,
    desc: `<p>More features are available such as the website's online status, loading chatbox iFrames, a Dark Theme, etc... Dig around!</p>
      <p>The sandbox's full code is available on Github, from the app's footer.</p>`,
  },
]);

const states = reactive({
  contentVisible: false,
  headerShrunk: false,
  inTransition: false,
});

const toggleContentVisibility = async () => {
  states.inTransition = true;
  await nextTick();

  if (states.contentVisible) {
    states.contentVisible = false;
    states.headerShrunk = false;
    await pause(1000);
  } else {
    states.headerShrunk = true;
    await pause(1000);
    states.contentVisible = true;
    await pause(1000);
  }

  states.inTransition = false;
};

// Helper function to pause execution
const pause = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));
</script>

<template>
  <div class="view-wrapper">
    <BaseContainer grow full>
      <template #container>
        <BaseCard>
          <template #card>
            <div
              class="home-header"
              :class="{
                shrink: states.headerShrunk,
                animated: states.inTransition,
              }"
            >
              <h1>a simple (crisp) sandbox</h1>
              <h2>
                quick and easy way to test, replicate or troubleshoot chatbox
                issues
              </h2>
              <div>
                <a href="#" @click.prevent="toggleContentVisibility"
                  >Getting Started</a
                >
                <span class="separator">|</span>
                <router-link to="/methods">Start Playing</router-link>
              </div>
            </div>
            <div class="home-content">
              <transition-group name="home-content" tag="div">
                <template v-if="states.contentVisible">
                  <BaseGuide
                    v-for="(guide, index) in guides"
                    :key="index"
                    :img="guide.img"
                    :desc="guide.desc"
                    :style="{ '--i': index, '--total': guides.length - 1 }"
                  />
                </template>
              </transition-group>
            </div>
          </template>
        </BaseCard>
      </template>
    </BaseContainer>
  </div>
</template>

<style scoped>
html[data-theme="light"] .container {
  background-image: url("@/assets/images/general/pattern-light.png");
}

html[data-theme="dark"] .container {
  background-image: url("@/assets/images/general/pattern-dark.png");
}

.home-header {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25vh;
  margin-bottom: 5rem;
}

.home-header.shrink {
  margin-top: 5vh;
}

.home-header.animated {
  transition: margin-top 1s cubic-bezier(0.5, 0, 0.2, 1);
}

.home-header h1 {
  font-family: "Fredoka", sans-serif;
  font-weight: 700;
  font-size: 3rem;
  color: var(--header-title);
}

.home-header h2 {
  font-family: "Fredoka", sans-serif;
  font-weight: 600;
  font-size: 1.75rem;
  color: var(--blue-pri);
}

.home-header a,
.home-header span {
  font-weight: 700;
  font-size: 1.375rem;
  margin: 1.5rem 0rem;
  padding: 0.5rem;
  justify-content: center;
  align-items: center;
  color: var(--header-title);
  transition: all 0.2s ease;
}

.home-header a:first-child:hover {
  color: var(--orange-pri);
}

.home-header a:last-child:hover {
  color: var(--green-pri);
}

.home-content {
  flex-direction: column;
  align-items: center;
  flex-direction: column;
  width: 75vw;
  min-width: 48rem;
  max-width: 72rem;
}

.home-header span.separator {
  font-size: 2rem;
  user-select: none;
}

.home-header span:not(.separator) {
  cursor: pointer;
}

.home-content > div {
  flex-direction: column;
}

.home-content-enter-active {
  animation: moveInLeft 0.5s ease both;
  animation-delay: calc(var(--i) * 0.25s);
}

.home-content-enter-active:nth-child(2n) {
  animation-name: moveInRight;
}

@keyframes moveInLeft {
  0% {
    transform: translateX(-50%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes moveInRight {
  0% {
    transform: translateX(50%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.home-content-leave-active {
  animation: moveOutDown 1s ease both;
}

@keyframes moveOutDown {
  0% {
    transform: translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: translate(0, 100%);
    opacity: 0;
  }
}
</style>
