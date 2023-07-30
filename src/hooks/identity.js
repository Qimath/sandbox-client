import { useUserStore } from "@/stores/user.js";
import GoTrue from "gotrue-js";
import jwtDecode from "jwt-decode";

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
      return { success: response, error: "" };
    })
    .catch((error) => {
      console.error("Error", error);
      return { success: "", error: parseErrorMessage(error) };
    });
}

export function signup(email, password, nickname) {
  const userStore = useUserStore();

  return handleAuthPromise(
    auth.signup(email, password, {
      account: {
        nickname: nickname,
      },
      preferences: userStore.getPreferences(),
      options: userStore.getOptions(),
      callbacks: userStore.getCallbacks(),
    })
  );
}

export function login(email, password) {
  return handleAuthPromise(auth.login(email, password, true)).then(
    (response) => {
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
    return { success: response, error: "" };
  } catch (error) {
    return { success: "", error: parseErrorMessage(error) };
  }
}

export function authGoogle() {
  window.location.href =
    "https://crisp-sandbox.netlify.app/.netlify/identity/authorize?provider=google";
}

export function authGithub() {
  window.location.href =
    "https://crisp-sandbox.netlify.app/.netlify/identity/authorize?provider=github";
}

export function recovery(email) {
  return handleAuthPromise(auth.requestPasswordRecovery(email));
}

export function getUser() {
  const user = auth.currentUser();
  return user ? user : false;
}

export async function syncUserSettings() {
  const userStore = useUserStore();

  const newMeta = {
    preferences: userStore.getPreferences(),
    options: userStore.getOptions(),
    callbacks: userStore.getCallbacks(),
  };

  return updateMeta(newMeta);
}

export async function updateMeta(newMeta) {
  const user = auth.currentUser();

  if (user) {
    try {
      const oldMeta = user.user_metadata?.data || {};
      const mergedMeta = { ...oldMeta, ...newMeta };

      const response = await user.update({ data: mergedMeta });
      return { success: response, error: "" };
    } catch (error) {
      console.error("App error [Identity => updateMeta]: ", error);
      return { success: "", error: parseErrorMessage(error) };
    }
  }
}

export async function authCallback() {
  const hashParams = new URLSearchParams(window.location.hash.substr(1));

  if (!hashParams.has("access_token")) {
    throw new Error("No access token found.");
  }

  const accessToken = hashParams.get("access_token");
  const userData = jwtDecode(accessToken);

  const userObject = {
    url: "https://crisp-sandbox.netlify.app/.netlify/identity",
    token: {
      access_token: accessToken,
      token_type: "bearer",
      expires_in: 3600,
      expires_at: userData.exp * 1000,
    },
    id: userData.sub,
    email: userData.email,
    app_metadata: userData.app_metadata || {},
    user_metadata: userData.user_metadata || {},
    created_at: userData.iat,
    updated_at: userData.iat,
  };

  localStorage.setItem("gotrue.user", JSON.stringify(userObject));
  window.history.replaceState({}, document.title, window.location.pathname);

  return userObject;
}