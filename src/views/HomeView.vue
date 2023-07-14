<script setup>
import { ref, reactive } from 'vue'

import BaseContainer from '../components/ui/BaseContainer.vue'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseGuide from '../components/ui/BaseGuide.vue'

import ImageSecrets from '../assets/tutorial/secrets.png'
import ImageCopy from '../assets/tutorial/copy.png'
import ImageSessionReset from '../assets/tutorial/session_reset.png'
import ImageTroubleshoot from '../assets/tutorial/troubleshoot.png'
import ImageWebsiteLoading from '../assets/tutorial/website_loading.png'
import ImageConfig from '../assets/tutorial/config.png'
import ImageSettings from '../assets/tutorial/settings.png'

const guides = reactive([
  {
    img: ImageSecrets,
    desc: `<p>Pops a modal which will allow you to set HMAC secrets for the Ticket Center and Email Verification.</p>
      <p>Secrets will remain saved for the current Website ID and be applied whenever it is loaded again.</p>
      <p>Loading a Contact Form & Ticket Center require this domain to be authorized. The latter also needs you to push an email address.</p>`
  },
  {
    img: ImageCopy,
    desc: `<p>Click once to copy the Web SDK method & its value into the clipboard, and twice for the NPM version.</p>
      <p>If no value is present, a default placeholder will be created.</p>`
  },
  {
    img: ImageSessionReset,
    desc: `<p>No need for incognito windows, the session can be reset automatically to start a fresh one.</p>
      <p>The 'clear LocalStorage on session reset' will clear all Crisp-stored data, and simulate a completely new visitor session. For instance to fire a trigger again.</p>`
  },
  {
    img: ImageTroubleshoot,
    desc: `<p>The website's configuration is fetched, to consult all the of the current chatbox settings.</p>
      <p>'Troubleshoot Chatbox' will feed that data to an AI, and generate a somewhat questionable diagnostic.</p>`
  },
  {
    img: ImageConfig,
    desc: `<p>The configuration file is also directly visible from this widget.</p>
      <p>'General informations, chatbox settings, but also customizations and triggers can be reviewed.</p>`
  },
  {
    img: ImageWebsiteLoading,
    desc: `<p>Any Website ID can be loaded, and even if the chatbox visibility is restricted, the iFrame version can be displayed.</p>
      <p>It is also possible to load any (initiated) conversation by using its Session ID.</p>`
  },
  {
    img: ImageWebsiteLoading,
    desc: `<p>Account creation and login currently serves only to test Token IDs.</p>
      <p>Settings can be applied to 'Merge conversations', as described in the SDK documentation.</p>`
  },
  {
    img: ImageSettings,
    desc: `<p>Set website preferences or chatbox configuration from this page.</p>
      <p>Settings such as Session Merge, Chatbox language, Cookie expiration timer, etc may require to reload the app.</p>
      <p>Crisp SDK callbacks can also be enabled to subscribe to certain events and be notified in the browser's console.</p>`
  },
  {
    img: ImageSettings,
    desc: `<p>More features are available such as the website's online status, loading chatbox iFrames, a Dark Theme, etc... Dig around!</p>
      <p>The sandbox's full code is available on Github, from the app's footer.</p>`
  }
])

const contentVisibility = ref(false)
const headerAnimation = ref(false)

async function displayContent() {
  let timeout = guides.length * 200
  if (contentVisibility.value) {
    contentVisibility.value = !contentVisibility.value
    await new Promise((resolve) => setTimeout(resolve, timeout))
    headerAnimation.value = !headerAnimation.value
  } else {
    headerAnimation.value = !headerAnimation.value
    await new Promise((resolve) => setTimeout(resolve, timeout))
    contentVisibility.value = !contentVisibility.value
  }
}
</script>

<template>
  <div class="view-wrapper">
    <BaseContainer grow full>
      <template #container>
        <BaseCard>
          <template #card>
            <div class="home-header" :class="{ shrink: headerAnimation }">
              <h1>a simple (crisp) sandbox</h1>
              <h2>quick and easy way to test, replicate or troubleshoot chatbox issues</h2>
              <div>
                <a href="#" @click="displayContent">Getting Started</a>
                <span class="separator">|</span>
                <router-link to="/methods">Start Playing</router-link>
              </div>
            </div>
            <div class="home-content">
              <transition-group name="home-content" tag="div">
                <BaseGuide
                  v-if="contentVisibility"
                  v-for="(guide, index) in guides"
                  :key="index"
                  :img="guide.img"
                  :desc="guide.desc"
                  :style="{ '--i': index, '--total': guides.length - 1 }"
                />
              </transition-group>
            </div>
          </template>
        </BaseCard>
      </template>
    </BaseContainer>
  </div>
</template>

<style scoped>
html[data-theme='light'] .container {
  background-image: url('../assets/pattern-light.png');
}

html[data-theme='dark'] .container {
  background-image: url('../assets/pattern-dark.png');
}

.home-header {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 1s cubic-bezier(0.5, 0, 0.2, 1);
  top: 30%;
  margin-bottom: 5rem;
}

.home-header.shrink {
  top: 0;
}

.home-header h1 {
  font-weight: 700;
  font-size: 3rem;
  color: var(--header-title);
}

.home-header h2 {
  font-weight: 600;
  font-size: 1.75rem;
  color: var(--blue-pri);
}

.home-header a,
.home-header span {
  font-weight: 500;
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

.home-content span.separator {
  font-size: 2rem;
  user-select: none;
}

.home-content span:not(.separator) {
  cursor: pointer;
}

.home-content > div {
  flex-direction: column;
}

.home-content-enter-active {
  animation: moveInLeft 0.5s ease both;
  animation-delay: calc(var(--i) * 0.2s);
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
  animation: moveOutLeft 0.5s ease both;
  animation-delay: calc((var(--total) - var(--i)) * 0.2s);
}

.home-content-leave-active:nth-child(2n) {
  animation-name: moveOutRight;
}

@keyframes moveOutLeft {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%);
    opacity: 0;
  }
}

@keyframes moveOutRight {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(50%);
    opacity: 0;
  }
}
</style>
