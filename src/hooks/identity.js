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
      return { success: response.success.user, error: "" };
    } else {
      return response;
    }
  });
}

export function login(email, password) {
  return handleAuthPromise(auth.login(email, password)).then((response) => {
    if (response.success) {
      // Return user data upon successful login
      return { success: response.success.user, error: "" };
    } else {
      return response;
    }
  });
}

export function logout() {
  auth
    .currentUser()
    ?.logout()
    .then((response) => console.log("User logged out", response))
    .catch((error) => console.log("Logout error", error));
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

export function handleOAuthCallback() {
  // Get the hash part of the current URL
  const hashParams = new URLSearchParams(window.location.hash.substr(1));

  // If there's no access token, just return
  if (!hashParams.has("access_token")) {
    return;
  }

  // Get the access token and other information from the URL
  const accessToken = hashParams.get("access_token");
  const expiresIn = Number(hashParams.get("expires_in"));
  const tokenType = hashParams.get("token_type");

  // You have to use the access token to fetch the user's JWT
  // Check the GoTrue-js documentation to know how to do this
  const promise = auth.currentUser().jwt(true);

  // We can use your existing handleAuthPromise function to handle this promise
  handleAuthPromise(promise).then((response) => {
    if (response.success) {
      // Handle the successful OAuth login here
      console.log("OAuth login successful", response.success.user);
      return { success: response.success.user, error: "" };
    } else {
      console.log("OAuth login failed", response.error);
      return response;
    }
  });
}

export function getCurrentUser() {
  const user = auth.currentUser();
  if (user) {
    return { success: user, error: "" };
  } else {
    return { success: "", error: "Not logged in" };
  }
}