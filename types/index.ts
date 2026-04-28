

export type DepositMethod = "Card" | "Cryptocurrency" | "Bank Transfer" | "BRE Gift Card" | "PayPal";

export type AccountBalance = {
    Available: number;
    Equity: number;
    "M.Margin": number;
    profit: number,
    "I.Margin": number;

};
