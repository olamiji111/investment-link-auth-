import { AccountBalance } from "@/types";
import { create } from "zustand";
import { AppUser } from "@/types";
import { getCurrentUser } from "@/lib/actions/auth.action";


type BalanceState = {
    balance: AccountBalance;
    setBalance: (data: AccountBalance) => void;
};

export const useBalanceStore = create<BalanceState>((set) => ({
    balance: {
        Available: 0,
        Equity: 0,
        "M.Margin": 0,
        profit: 0,
        "I.Margin": 0,
    },

    setBalance: (data) =>
        set({
            balance: {
                Available: data.Available ?? 0,
                Equity: data.Equity ?? 0,
                "M.Margin": data["M.Margin"] ?? 0,
                profit: data.profit ?? 0,
                "I.Margin": data["I.Margin"] ?? 0,
            },
        }),
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

    clearUser: () => {

        set({ user: null });

        // optional: reset balances when user logs out

        useBalanceStore.setState({

            balance: {

                Available: 0,

                Equity: 0,

                "M.Margin": 0,

                profit: 0,

                "I.Margin": 0,

            },

        });


    },

    fetchUser: async () => {

        set({ loading: true });

        try {

            const user = await getCurrentUser();

            if (!user) {

                set({ user: null });

                useBalanceStore.setState({

                    balance: {

                        Available: 0,

                        Equity: 0,

                        "M.Margin": 0,

                        profit: 0,

                        "I.Margin": 0,

                    },

                });

                return;

            }

            // ✅ set user

            set({ user });

            // ✅ sync balances from firestore

            useBalanceStore.getState().setBalance({

                Available: Number(user.Available || 0),

                Equity: Number(user.Equity || 0),

                "M.Margin": Number(user["M.Margin"] || 0),

                profit: Number(user.profit || 0),

                "I.Margin": Number(user["I.Margin"] || 0),

            });

        } catch (err) {

            console.log("fetchUser error:", err);

            set({ user: null });

        } finally {

            set({ loading: false });

        }

    },

}));