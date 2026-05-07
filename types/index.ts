export type DepositMethod = "Card" | "Cryptocurrency" | "Bank Transfer" | "BRE Gift Card" | "PayPal";

export type AccountBalance = {
    Available: number;
    Equity: number;
    "M.Margin": number;
    profit: number,
    "I.Margin": number;

};

export interface SignUpParams {
    uid: string;
    name: string;
    email: string;
    password: string;
};

export type SignInParams = {
    email: string;
    idToken: string;
};
