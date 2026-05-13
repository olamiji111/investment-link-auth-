"use client";

import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    OAuthProvider,
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

    // ✅ THIS IS YOUR ORIGINAL STATE (keep it)
    const [socialloading, setSocialLoading] = useState<boolean>(false);

    const handleSocialLogin = async (providerName: string) => {
        const currentRequest = ++loginRef.current;
        let timeoutId: NodeJS.Timeout | null = null;

        try {
            setSocialLoading(true); // ✅ start loading

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
                    setSocialLoading(false); // ✅ stop loading on timeout
                    toast.error("Login timed out. Please try again.");
                }
            }, 20000);

            const result = await signInWithPopup(auth, provider);

            if (loginRef.current !== currentRequest) return;

            if (timeoutId) clearTimeout(timeoutId);

            const user = result.user;
            const idToken = await user.getIdToken();

            const signInResult = await signIn({
                email: user.email || "",
                idToken,
            });

            if (signInResult.success) {
                await setSessionCookie(idToken);

                toast.success("Signing In with an existing email", { duration: 3000 });

                router.push(`/profile/${user.uid}/trade`);
                return user;
            }

            await signUpUser({
                uid: user.uid,
                name: user.displayName || "",
                email: user.email || "",
            });

            await setSessionCookie(idToken);

            toast.success("New account created succesfully");

            router.push(`/profile/${user.uid}/trade`);

            return user;

        } catch (error: unknown) {
            if (loginRef.current !== currentRequest) return;

            if (timeoutId) clearTimeout(timeoutId);

            toast.error(getAuthErrorMessage(error, providerName));

        } finally {
            if (loginRef.current === currentRequest) {
                if (timeoutId) clearTimeout(timeoutId);
                setSocialLoading(false); // ✅ ALWAYS reset loading
            }
        }
    };

    return { handleSocialLogin, socialloading };
};