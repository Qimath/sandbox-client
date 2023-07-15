import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { createAuth0 } from '@auth0/auth0-vue'

import { useConfigStore } from './stores/config.js'
import { useUserStore } from './stores/user.js'

import VueCookies from 'vue-cookies'

import Crisp from './plugins/crisp.js'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueCookies)
app.use(
  createAuth0({
    domain: 'qimath.eu.auth0.com',
    clientId: 'zZubwhjaJQXhX3hV2Qvt3MPm49wicuNV',
    authorizationParams: {
      redirect_uri: 'https://crisp-sandbox.netlify.app/account'
    }
  })
)

const userStore = useUserStore()
const configStore = useConfigStore()

userStore.initializeStore()
configStore.initializeStore()

app.use(Crisp)

app.mount('#app')
