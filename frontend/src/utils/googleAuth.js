/* global google */
// Утилита для безопасной инициализации Google Sign-In
export const initializeGoogleSignIn = (clientId, callback) => {
  try {
    if (typeof google === "undefined") {
      console.warn("Google Sign-In API not loaded");
      return false;
    }

    google.accounts.id.initialize({
      client_id: clientId,
      callback: callback,
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    return true;
  } catch (error) {
    console.error("Error initializing Google Sign-In:", error);
    return false;
  }
};

export const renderGoogleButton = (elementId, options = {}) => {
  try {
    if (typeof google === "undefined") {
      console.warn("Google Sign-In API not loaded");
      return false;
    }

    const defaultOptions = {
      theme: "outline",
      size: "large",
      type: "standard",
      ...options,
    };

    google.accounts.id.renderButton(
      document.getElementById(elementId),
      defaultOptions
    );
    return true;
  } catch (error) {
    console.error("Error rendering Google button:", error);
    return false;
  }
};

export const promptGoogleSignIn = () => {
  try {
    if (typeof google === "undefined") {
      console.warn("Google Sign-In API not loaded");
      return false;
    }

    // Проверяем поддержку FedCM перед вызовом prompt
    if (window.navigator.credentials && window.navigator.credentials.get) {
      try {
        google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          }
        });
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error prompting Google Sign-In:", error);
    return false;
  }
};

export const isGoogleSignInSupported = () => {
  return (
    typeof google !== "undefined" &&
    google.accounts &&
    google.accounts.id &&
    window.navigator.credentials
  );
};
