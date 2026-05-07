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




type AuthError = {
    code?: string;
    message?: string;
};

const getAuthErrorMessage = (error: unknown, provider: string) => {
    const err = error as AuthError;
    const code = err?.code;

    switch (code) {
        case "auth/popup-closed-by-user":
            return "Login cancelled";

        case "auth/cancelled-popup-request":
            return "Login cancelled";

        case "auth/account-exists-with-different-credential":
            return "Account exists. Signing you in...";

        case "auth/operation-not-allowed":
            return `${provider} login is not available at the moment`;

        case "auth/network-request-failed":
            return "Network error. Check your connection";

        default:
            return `${provider} login failed. Please try again`;
    }
};

export const useSocialLogin = () => {
    const loginRef = useRef(0);
    const router = useRouter();
    const [socialloading, setSocialLoading] = useState<boolean>(false);

    const handleSocialLogin = async (providerName: string) => {
        const currentRequest = ++loginRef.current;

        let timeoutId: NodeJS.Timeout | null = null;

        try {
            setSocialLoading(true);

            let provider;

            switch (providerName) {
                case "google":
                    provider = new GoogleAuthProvider();
                    provider.setCustomParameters({
                        prompt: "select_account",
                    });
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
            }, 30000);

            const result = await signInWithPopup(auth, provider);


            if (loginRef.current !== currentRequest) return;

            if (timeoutId) clearTimeout(timeoutId);

            const user = result.user;

            toast.success("Signing in with existing account...");

            router.push(`/profile/${user.uid}/trade`);

            return user;

        } catch (error: unknown) {


            if (loginRef.current !== currentRequest) return;

            if (timeoutId) clearTimeout(timeoutId);

            const errMessage = getAuthErrorMessage(error, providerName);

            toast.error(errMessage);

        } finally {
            if (loginRef.current === currentRequest) {
                if (timeoutId) clearTimeout(timeoutId);
                setSocialLoading(false);
            }
        }
    };

    return { handleSocialLogin, socialloading };
};