import { ref, onMounted, onUnmounted } from 'vue'
import netlifyIdentity from 'netlify-identity-widget'

export default function useNetlifyIdentity() {
  const user = ref(null)

  const login = () => netlifyIdentity.open('login')
  const signup = () => netlifyIdentity.open('signup')
  const logout = () => netlifyIdentity.logout()

  onMounted(() => {
    netlifyIdentity.init()

    netlifyIdentity.on('login', (loggedInUser) => {
      console.log('Logged in: ', loggedInUser)
      user.value = loggedInUser
    })

    netlifyIdentity.on('logout', () => {
      console.log('Logged out')
      user.value = null
    })
  })

  onUnmounted(() => {
    netlifyIdentity.close()
  })

  return { user, login, logout, signup }
}
