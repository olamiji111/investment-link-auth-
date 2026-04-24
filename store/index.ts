import { AccountBalance } from "@/types";
import { create } from "zustand";
import { Balances } from "@/constants";


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

