"use client";

import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    OAuthProvider,
    getAdditionalUserInfo
} from "firebase/auth";

import { auth } from "@/firebase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { signUpUser, signIn } from "@/lib/actions/auth.action";
import { setSessionCookie } from "@/lib/actions/auth.action";



type AuthError = {
    code?: string;
    message?: string;
};

const getAuthErrorMessage = (error: unknown, provider: string) => {
    const err = error as AuthError;
    const code = err?.code;

    switch (code) {
        case "auth/popup-closed-by-user":
            return "Signing Up  Cancelled";

        case "auth/cancelled-popup-request":
            return "Signup process cancelled";

        case "auth/account-exists-with-different-credential":
            return "Account exists. Logging you in...";

        case "auth/operation-not-allowed":
            return `${provider} signup  is not available at the moment`;

        case "auth/network-request-failed":
            return "Network error. Check your connection";

        default:
            return `${provider} signup failed. Please try again`;
    }
};

export const useSocialLogin = () => {

    const loginRef = useRef(0);

    const router = useRouter();

    const [socialloading, setSocialLoading] = useState(false);

    const handleSocialLogin = async (providerName: string) => {

        const currentRequest = ++loginRef.current;

        let timeoutId: NodeJS.Timeout | null = null;

        try {

            setSocialLoading(true);

            let provider;

            switch (providerName) {

                case "google":

                    provider = new GoogleAuthProvider();

                    provider.setCustomParameters({ prompt: "select_account" });

                    break;

                case "facebook":

                    provider = new FacebookAuthProvider();

                    break;

                case "apple":

                    provider = new OAuthProvider("apple.com");

                    provider.addScope("email");

                    provider.addScope("name");

                    break;

                default:

                    toast.error("Unsupported login method");

                    return;

            }

            timeoutId = setTimeout(() => {

                if (loginRef.current === currentRequest) {

                    setSocialLoading(false);

                    toast.error("Login timed out. Please try again.");

                }

            }, 20000);

            const result = await signInWithPopup(auth, provider);

            if (loginRef.current !== currentRequest) return;

            if (timeoutId) clearTimeout(timeoutId);

            const user = result.user;

            const idToken = await user.getIdToken();

            // 🔥 REAL SOURCE OF TRUTH

            const additionalInfo = getAdditionalUserInfo(result);

            const isNewUser = additionalInfo?.isNewUser;

            // ========================

            // ✅ EXISTING USER LOGIN

            // ========================

            if (!isNewUser) {

                const loginRes = await signIn({

                    email: user.email || "",

                    idToken,

                });

                if (!loginRes.success) {

                    toast.error(loginRes.message || "Login failed");

                    return;

                }

                await setSessionCookie(idToken);

                toast.success("Logging you in...");

                router.push(`/profile/${user.uid}/trade`);

                return user;

            }

            // ========================

            // 🆕 NEW USER SIGNUP

            // ========================

            await signUpUser({

                uid: user.uid,

                name: user.displayName || "",

                email: user.email || "",

            });

            toast.success("No existed Account found.Signing you up...");

            await setSessionCookie(idToken);

            router.push(`/profile/${user.uid}/trade?welcome=true`);

            return user;

        } catch (error: unknown) {

            if (loginRef.current !== currentRequest) return;

            if (timeoutId) clearTimeout(timeoutId);

            toast.error(getAuthErrorMessage(error, providerName));

        } finally {

            if (loginRef.current === currentRequest) {

                if (timeoutId) clearTimeout(timeoutId);

                setSocialLoading(false);

            }

        }

    };

    return { handleSocialLogin, socialloading };

};