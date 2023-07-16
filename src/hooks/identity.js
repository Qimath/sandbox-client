import GoTrue from 'gotrue-js';

const auth = new GoTrue({
  APIUrl: 'https://crisp-sandbox.netlify.app/.netlify/identity',
  setCookie: true,
});

export function login(email, password) {
  return auth.login(email, password)
    .then(response => {
      console.log('Logged in successfully', response);
      return { success: 'Logged in successfully', error: '' };
    })
    .catch(error => {
      console.log("It's an error", error);
      return { success: '', error: error.message };
    });
}

export function signup(email, password) {
  return auth.signup(email, password)
    .then(response => {
      console.log('Signed up successfully', response);
      return { success: 'Signed up successfully', error: '' };
    })
    .catch(error => {
      console.log("It's an error", error);
      return { success: '', error: error.message };
    });
}

export function logout() {
  const user = auth.currentUser();

  if(user) {
    user.logout()
      .then(response => console.log("User logged out", response))
      .catch(error => console.log("Logout error", error));
  }
}

export function loginWithGoogle() {
  window.location.href = 'https://crisp-sandbox.netlify.app/.netlify/identity/authorize?provider=google'
}

export function loginWithGithub() {
  window.location.href = 'https://crisp-sandbox.netlify.app/.netlify/identity/authorize?provider=github'
}
