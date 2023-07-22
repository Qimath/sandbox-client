import { useUserStore } from "@/stores/user.js";
import GoTrue from "gotrue-js";

const auth = new GoTrue({
  APIUrl: "https://crisp-sandbox.netlify.app/.netlify/identity",
  setCookie: true,
});

function parseErrorMessage(error) {
  if (error.message) {
    if (
      error.message.includes(
        "invalid_grant: No user found with that email, or password invalid."
      )
    ) {
      return "Email address or password incorrect";
    }

    if (error.message.includes("User not found")) {
      return "No account matching this email address was found";
    }

    if (
      error.message.includes(
        "A user with this email address has already been registered"
      )
    ) {
      return "An account with this email address already exists";
    }
  }
  return "Unknown error";
}


function handleAuthPromise(promise) {
  return promise
    .then((response) => {
      console.log("Success", response);
      return { success: response, error: "" };
    })
    .catch((error) => {
      console.error("Error", error);
      return { success: "", error: parseErrorMessage(error) };
    });
}

export function signup(email, password, nickname) {
  return handleAuthPromise(
    auth.signup(email, password, { nickname: nickname })
  );
}

export function login(email, password) {
  return handleAuthPromise(auth.login(email, password, true)).then(
    (response) => {
      if (response.success) {
        startUserSession();
      }
      return response;
    }
  );
}

export async function logout() {
  const userStore = useUserStore();

  const currentUser = auth.currentUser();
  if (!currentUser) {
    return { success: "", error: "No user is logged in" };
  }

  try {
    const response = await currentUser.logout();
    console.log("User logged out", response);

    try {
      userStore.clearUserAccount();
    } catch (error) {
      console.error("An error occurred while clearing user data", error);
      return { success: "", error: parseErrorMessage(error) };
    }

    return { success: response, error: "" };
  } catch (error) {
    console.log("Logout error", error);
    return { success: "", error: parseErrorMessage(error) };
  }
}


export function loginWithGoogle() {
  window.location.href = "https://crisp-sandbox.netlify.app/.netlify/identity/authorize?provider=google";
}

export function loginWithGithub() {
  window.location.href = "https://crisp-sandbox.netlify.app/.netlify/identity/authorize?provider=github";
}

export function requestPasswordRecovery(email) {
  return handleAuthPromise(auth.requestPasswordRecovery(email));
}

export function getCurrentUser() {
  const user = auth.currentUser();
  console.log(user);
  if (user) {
    return { success: user, error: "" };
  } else {
    return { success: "", error: "Not logged in" };
  }
}

export function startUserSession() {
  const userStore = useUserStore();
  const userSession = getCurrentUser();

  if (userSession && userSession.success !== "") {
    userStore.setUserAccount(userSession.success);
  }
}

export async function initializeUserSession() {
  const params = new URLSearchParams(window.location.hash.slice(1));
  const accessToken = params.get('access_token');
  const tokenType = params.get('token_type');
  const expiresIn = params.get('expires_in');
  const refreshToken = params.get('refresh_token');

  if (accessToken) {
    const expires_at = expiresIn * 1000 + new Date().getTime();
    auth.setUser({ token: { access_token: accessToken, token_type: tokenType, expires_in: expiresIn, refresh_token: refreshToken, expires_at: expires_at } });

    // Fetch and store user data
    const user = await auth.refreshUser();
    const userStore = useUserStore();
    userStore.setUserAccount(user);

    window.history.replaceState(null, document.title, ".");
  }
}


function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}
