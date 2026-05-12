import { AccountBalance } from "@/types";
import { create } from "zustand";
import { Balances } from "@/constants";
import { AppUser } from "@/types";
import { getCurrentUser } from "@/lib/actions/auth.action";

type BalanceState = {
    currentUserId: string;
    email: string | null;
    balances: Record<string, AccountBalance>;
    setUser: (userId: string) => void;
    setEmail: (email: string) => void;
    updateBalance: (userId: string, data: Partial<AccountBalance>) => void;
    getCurrentBalance: () => AccountBalance;
};


export const useBalanceStore = create<BalanceState>((set, get) => ({
    currentUserId: "user-1",

    email: "oduboteolamiji@gmail.com",

    balances: Balances,

    setUser: (userId) => set({ currentUserId: userId }),

    setEmail: (email) => set({ email }),

    updateBalance: (userId, data) =>
        set((state) => ({
            balances: {
                ...state.balances,
                [userId]: {
                    ...state.balances[userId],
                    ...data
                }
            }
        })),

    getCurrentBalance: () => {
        const { balances, currentUserId } = get();
        return balances[currentUserId];

    }

}));


type UserState = {
    user: AppUser | null;
    loading: boolean;

    setUser: (user: AppUser | null) => void;
    fetchUser: () => Promise<void>;
    clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
    user: null,
    loading: false,

    setUser: (user) => set({ user }),

    clearUser: () => set({ user: null }),

    fetchUser: async () => {
        set({ loading: true });

        try {
            const user = await getCurrentUser();

            if (!user) {
                set({ user: null });
                return;
            }

            set({ user });
        } catch (err) {
            console.log("fetchUser error:", err);
            set({ user: null });
        } finally {
            set({ loading: false });
        }
    },
}));

