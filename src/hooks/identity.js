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
  return handleAuthPromise(
    auth.signup(email, password, {
      account: {
        nickname: nickname,
      },
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

export async function updateProfile(email, password) {
  const user = auth.currentUser();

  if (user) {
    const updateObject = {};

    if (email) {
      updateObject.email = email;
    }

    if (password) {
      updateObject.password = password;
    }

    // Check if there is any information to update
    if (Object.keys(updateObject).length === 0) {
      return { success: "", error: "There is nothing to update as this time." };
    }

    try {
      const response = await user.update(updateObject);
      return { success: response, error: "" };
    } catch (error) {
      return { success: "", error: parseErrorMessage(error) };
    }
  }
}

export async function authCallback(accessToken) {
  const userData = jwtDecode(accessToken);

  const userObject = {
    url: "https://crisp-sandbox.netlify.app/.netlify/identity",
    token: {
      access_token: accessToken,
      token_type: "bearer",
      expires_in: 2592000,
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

export function confirmRecovery(recoveryToken) {
  return handleAuthPromise(auth.recover(recoveryToken)).then((response) => {
    if (response.success) {
      return authCallback(response.success.token.access_token);
    }
    return response;
  });
}

export function confirmEmailChange(emailChangeToken) {
  const user = auth.currentUser();

  return handleAuthPromise(
    user.update({ email_change_token: emailChangeToken })
  ).then((response) => {
    return response;
  });
}
