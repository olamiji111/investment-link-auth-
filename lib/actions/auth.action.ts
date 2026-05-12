
"use server";
import { auth, db } from "@/firebase/admin";
import { SignUpParams, SignInParams } from "@/types";
import { cookies } from "next/headers";
import { AppUser } from "@/types";

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24;

// Set session cookie
export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();

    // Create session cookie
    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: SESSION_DURATION * 1000, // milliseconds
    });

    // Set cookie in the browser
    cookieStore.set("session", sessionCookie, {
        maxAge: SESSION_DURATION,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
    });
}

type SignUpResponse =
    | { success: true; uid: string }
    | { success: false; message: string };

export async function signUpUser(params: SignUpParams) {
    const { uid, name, email } = params;

    try {
        const userDoc = await db.collection("users").doc(uid).get();

        if (userDoc.exists) {
            return {
                success: true,
                message: "User profile already synced.",
            };
        }

        await db.collection("users").doc(uid).set({
            name,
            email,
            createdAt: new Date().toISOString(),


            Available: 0,
            Equity: 0,
            "M.Margin": 0,
            "I.Margin": 0,
            profit: 0,

        });

        return {
            success: true,
            message: "Account created successfully.",
        };

    } catch (error: unknown) {
        console.error("Server Action Error:", error);

        let message = "Failed to sync user data. Please try again.";

        if (error instanceof Error) {
            if (error.message.includes("DECODER")) {
                message = "Server Configuration Error: Invalid Firebase Private Key.";
            } else {
                message = error.message;
            }
        }

        return {
            success: false,
            message,
        };
    }
};


//Sign In...
export async function signIn(params: SignInParams) {
    const { email, idToken } = params;

    try {
        // 🔍 CHECK USER EXISTS
        const userRecord = await auth.getUserByEmail(email);

        if (!userRecord) {
            return {
                success: false,
                message: "User does not exist. Create an account.",
            };
        }

        // 🍪 CREATE SESSION COOKIE
        await setSessionCookie(idToken);

        return {
            success: true,
            message: "Login successful",
            uid: userRecord.uid,
        };

    } catch (error: unknown) {
        console.error("SIGN IN ERROR:", error);

        return {
            success: false,
            message: "Failed to log into account. Please try again.",
        };
    }
}

//get current User
export async function getCurrentUser(): Promise<AppUser | null> {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("session")?.value;

        if (!sessionCookie) return null;


        const decoded = await auth.verifySessionCookie(sessionCookie, true);
        const uid = decoded.uid;


        const userSnap = await db.collection("users").doc(uid).get();

        if (!userSnap.exists) {
            return null;
        }

        const data = userSnap.data() as AppUser;


        let authUser = null;

        try {
            authUser = await auth.getUser(uid);
        } catch {
            authUser = null;
        }

        return {
            id: uid,

            name: data?.name || authUser?.displayName || "",
            email: data?.email || authUser?.email || "",

            Available: data?.Available ?? 0,
            Equity: data?.Equity ?? 0,
            "M.Margin": data?.["M.Margin"] ?? 0,
            "I.Margin": data?.["I.Margin"] ?? 0,
            profit: data?.profit ?? 0,

            createdAt: data?.createdAt ?? "",
        };
    } catch (error) {
        console.log("getCurrentUser error:", error);
        return null;
    }
}