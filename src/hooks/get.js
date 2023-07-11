import { reactive } from 'vue'
import { useSessionStore } from './../stores/session.js'
import { Crisp } from 'crisp-sdk-web'

function getNickname() {
  const result = reactive({})
  const sessionStore = useSessionStore()

  try {
    result.value = Crisp.user.getNickname() || 'N/A'
    result.success = 'Nickname fetched'
    sessionStore.setSessionContent({ nickname: result.value })
    return result
  } catch (error) {
    console.error(error)
    result.error = error.message
    return result
  }
}

function getEmail() {
  const result = reactive({})
  const sessionStore = useSessionStore()

  try {
    result.value = Crisp.user.getEmail() || 'N/A'
    result.success = 'Email fetched'
    sessionStore.setSessionContent({ email: result.value })
    return result
  } catch (error) {
    console.error(error)
    result.error = error.message
    return result
  }
}

function getPhone() {
  const result = reactive({})
  const sessionStore = useSessionStore()

  try {
    result.value = Crisp.user.getPhone() || 'N/A'
    result.success = 'Phone fetched'
    sessionStore.setSessionContent({ phone: result.value })
    return result
  } catch (error) {
    console.error(error)
    result.error = error.message
    return result
  }
}

function getCompany() {
  const result = reactive({})
  const sessionStore = useSessionStore()

  try {
    result.value = Crisp.user.getCompany()?.name || 'N/A'
    result.success = 'Company fetched'
    sessionStore.setSessionContent({ company: result.value })
    return result
  } catch (error) {
    console.error(error)
    result.error = error.message
    return result
  }
}

function getAvatar() {
  const result = reactive({})
  const sessionStore = useSessionStore()

  try {
    result.value = Crisp.user.getAvatar() || 'N/A'
    result.success = 'Avatar fetched'
    sessionStore.setSessionContent({ avatar: result.value })
    return result
  } catch (error) {
    console.error(error)
    result.error = error.message
    return result
  }
}

function getData() {
  const result = reactive({})
  const sessionStore = useSessionStore()

  try {
    result.value = Crisp.session.getData()
    result.success = 'Data fetched'
    sessionStore.setSessionContent({ data: result.value })
    return result
  } catch (error) {
    console.error(error)
    result.error = error.message
    return result
  }
}

export default function useMethodGetter(id) {
  const getters = {
    'session-nickname': () => getNickname(),
    'session-email': () => getEmail(),
    'session-phone': () => getPhone(),
    'session-company': () => getCompany(),
    'session-avatar': () => getAvatar(),
    'session-data': () => getData()
  }

  return getters[id] ? getters[id]() : null
}
