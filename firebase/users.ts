import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/client";
import { User as FirebaseUser } from "firebase/auth";

const defaultUserData = (user: FirebaseUser) => ({
    name: user.displayName || "",
    email: user.email || "",
    photoURL: user.photoURL || "",

    Available: 0,
    Equity: 0,
    "M.Margin": 0,
    "I.Margin": 0,
    profit: 0,

    createdAt: new Date().toISOString(),
});

export const ensureUserProfile = async (user: FirebaseUser) => {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
        await setDoc(ref, defaultUserData(user));
    }
};