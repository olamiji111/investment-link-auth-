type FirebaseAuthError = {
    code?: string;
    message?: string;
};

export const getLoginErrorMessage = (error: unknown) => {
    const err = error as FirebaseAuthError;

    switch (err?.code) {

        case "auth/invalid-credential":
            return "Incorrect email or password";

        case "auth/wrong-password":
            return "Incorrect password";

        case "auth/user-not-found":
            return "Account does not exist";

        case "auth/email-already-in-use":
            return "This email is already in use";

        case "auth/user-disabled":
            return "This account has been disabled";

        case "auth/too-many-requests":
            return "Too many attempts. Try again later";

        case "auth/network-request-failed":
            return "Network error. Check your internet connection";

        case "auth/popup-closed-by-user":
            return "Login cancelled";

        case "auth/cancelled-popup-request":
            return "Login cancelled";

        case "auth/popup-blocked":
            return "Popup blocked by browser";

        default:
            return "Failed to sign in. Please try again";
    }
};