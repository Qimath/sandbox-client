import { useUserStore } from "@/stores/user.js";
import GoTrue from "gotrue-js";

const auth = new GoTrue({
  APIUrl: "https://crisp-sandbox.netlify.app/.netlify/identity",
  setCookie: true,
});

const AUTH_URL =
  "https://crisp-sandbox.netlify.app/.netlify/identity/authorize?provider=";

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
  }

  if (
    error.message.includes(
      "A user with this email address has already been registered"
    )
  ) {
    return "An account with this email address already exists";
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
  ).then((response) => {
    if (response.success) {
      // Return user data upon successful signup
      return { success: response.success, error: "" };
    } else {
      return response;
    }
  });
}

export function login(email, password) {
  return handleAuthPromise(auth.login(email, password, true)).then(
    (response) => {
      if (response.success) {
        startUserSession();
        // Return user data upon successful login
        return { success: response.success, error: "" };
      } else {
        return response;
      }
    }
  );
}

export function logout() {
  const userStore = useUserStore();

  const currentUser = auth.currentUser();
  if (!currentUser) {
    return Promise.resolve({ success: "", error: "No user is logged in" });
  }

  return currentUser
    .logout()
    .then((response) => {
      console.log("User logged out", response);
      try {
        userStore.clearUserAccount();
      } catch (error) {
        console.error("An error occurred while clearing user data", error);
        return { success: "", error: parseErrorMessage(error) };
      }
      return { success: response, error: "" };
    })
    .catch((error) => {
      console.log("Logout error", error);
      return { success: "", error: parseErrorMessage(error) };
    });
}
  
export function loginWithGoogle() {
  window.location.href = `${AUTH_URL}google`;
}

export function loginWithGithub() {
  window.location.href = `${AUTH_URL}github`;
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
