import { Facebook, Apple, Google } from "@/components/icons/icons";
import { ComponentType, SVGProps } from "react";

export const tradingFeatures: string[] = [
    "Free and unlimited Demo trading",
    "Over 2800 leveraged instruments",
    "Tight spreads & no commissions",
    "Cutting-edge trading technology",
    "Comprehensive Trading Academy",
];

export const Languages: string[] = [
    "English",
    "العربية",
    "Deutsch",
    "Français",
    "Italiano",
    "עברית",
    "Türkçe",
    "Español",
    "Eλληνικά",
    "Česky",
    "Nederlands",
    "Polski",
    "Svenska",
    "Norsk",
    "Dansk",
    "Suomeksi",
    "Português",
    "Slovenčina",
    "Slovenski",
    "Eesti",
    "Pyccĸий",
    "Magyar",
    "Latviešu",
    "Lietuviškai",
    "Română",
    "български",
    "Hrvatski",
    "繁體中文",
    "简体中文",
    "日本語",
    "Bahasa Indonesia",
];

interface SocialMediaLoginProp {
    name: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
}


export const socialsMediaLogins = [
    {
        name: "Google",
        icon: Google
    },
    {
        name: "Facebook",
        icon: Facebook
    },
    {
        name: "Apple",
        icon: Apple
    }
];

export type PopularOptionProps = {
    imgPath: string;
    name: string;
    symbol: string;
    ref: string;
    salePercentage: string;
    sellPrice: string;
    purchasePrice: string;
    month: string;
};

export const PopularOptions: PopularOptionProps[] = [
    {
        imgPath: "/asset/images/popular market/gold.png",
        name: "Gold",
        symbol: "TVC:GOLD",
        ref: "call 4840",
        salePercentage: "35.22%",
        sellPrice: "74.81",
        purchasePrice: "78.94",
        month: "Jun"
    },
    {
        imgPath: "/asset/images/popular market/CL_border (1).png",
        name: "Oil",
        symbol: "TVC:USOIL",
        ref: "call 84.5",
        salePercentage: "-43.42%",
        sellPrice: "5.84",
        purchasePrice: "6.04",
        month: "Jun"
    },
    {
        imgPath: "/asset/images/popular market/ES.webp",
        name: "S&P 500",
        symbol: "CME_MINI:ES1!",
        ref: "Put 7075",
        salePercentage: "-42.48%",
        sellPrice: "45.26",
        purchasePrice: "46.50",
        month: "Apr"
    },
    {
        imgPath: "/asset/images/popular market/XAG (1).webp",
        name: "Silver",
        symbol: "TVC:SILVER",
        ref: "call 80",
        salePercentage: "4.07%",
        sellPrice: "2.676",
        purchasePrice: "3.389",
        month: "May"
    },
    {
        imgPath: "/asset/images/popular market/UK100.png",
        name: "Nasdaq 100",
        symbol: "NASDAQ:NDX",
        ref: "call 70",
        salePercentage: "1.34%",
        sellPrice: "26,842.22",
        purchasePrice: "26,840.44",
        month: "Apr"
    },

    {
        imgPath: "/asset/images/popular market/EB_border (1).png",
        name: "Brent Oil",
        symbol: "ICEBRENT:BRN1!",
        ref: "put 94.21",
        salePercentage: "-6.98%",
        sellPrice: "92.40",
        purchasePrice: "92.51",
        month: "Jun"
    },
    {
        imgPath: "/asset/images/popular market/BAIGUI (1).png",
        name: "AI Index",
        symbol: "NASDAQ:NDX",
        ref: "call 3812",
        salePercentage: "-6.98%",
        sellPrice: "3,492.56",
        purchasePrice: "3,511.82",
        month: "Apr"
    },
    {
        imgPath: "/asset/images/popular market/NG (1).png",
        name: "Natural Gas",
        symbol: "NYMEX:NG1!",
        ref: "call 2.2",
        salePercentage: "6.01%",
        sellPrice: "2.670",
        purchasePrice: "2.678",
        month: "May"
    },
    {
        imgPath: "/asset/images/popular market/HO_border.png",
        name: "Heating Oil",
        symbol: "NYMEX:HO1!",
        ref: "put 4.2",
        salePercentage: "-10.03%",
        sellPrice: "3.4448",
        purchasePrice: "3.4522",
        month: "Apr"
    },
    {
        imgPath: "/asset/images/popular market/FDAX (1).png",
        name: "Germany 40",
        symbol: "XETR:DAX",
        ref: "put 24300",
        salePercentage: "2.04%",
        sellPrice: "24,812.32",
        purchasePrice: "24,815.69",
        month: ""
    },
    {
        imgPath: "/asset/images/popular market/UK100.png",
        name: "UK 100",
        symbol: "FTSE:UKX",
        ref: "put 10922",
        salePercentage: "1.05%",
        sellPrice: "10,710.50",
        purchasePrice: "10,712.50",
        month: "Apr"
    },
    {
        imgPath: "/asset/images/popular market/YM.png",
        name: "USA 30",
        symbol: "DJ:DJI",
        ref: "call 49,298",
        salePercentage: "1.84%",
        sellPrice: "49,661",
        purchasePrice: "49,665",
        month: "Apr"
    },
    {
        imgPath: "/asset/images/popular market/NIY_border.png",
        name: "Japan 225",
        symbol: "TSE:NI225",
        ref: "call 62554",
        salePercentage: "0.72%",
        sellPrice: "59,759",
        purchasePrice: "59,771",
        month: "May"
    },
];


interface navLinksProps {
    label: string;
    href: string;
    icon: string;
};

export const navLinks: navLinksProps[] = [
    {
        label: "Trade",
        href: "/profile/default/trade",
        icon: "trade",
    },
    {
        label: "Open Positions",
        href: "/profile/default/open-positions",
        icon: "open",
    },
    {
        label: "Orders",
        href: "/profile/default/orders",
        icon: "orders",
    },
    {
        label: "Closed Positions",
        href: "/profile/default/closed-positions",
        icon: "closed",
    },
    {
        label: "Funds",
        href: "/profile/default/funds",
        icon: "funds",
    },
    {
        label: "Trade Bot",
        href: "/profile/default/plus500-bot",
        icon: "bot",
    }
]

export const AccountCollapsibeLinks: navLinksProps[] = [
    {
        label: "+Me",
        href: "/profile/default/me",
        icon: "me"
    },
    {
        label: "Verify Account",
        href: "/profile/default/trade",
        icon: "verify"
    },
    {
        label: "Invite a Friend",
        href: "/profile/default/trade",
        icon: "invite"
    },
];

export const ToolCollapsibeLinks: navLinksProps[] = [
    {
        label: "Account Snapshot",
        href: "/profile/default/trade",
        icon: "snapshot"
    },
    {
        label: "Manage WatchList",
        href: "/profile/default/trade",
        icon: "watchlist"
    },
    {
        label: "Economy Calendar",
        href: "/profile/default/trade",
        icon: "calendar"
    },
    {
        label: "Market News",
        href: "/profile/default/trade",
        icon: "news"
    },
    {
        label: "Alerts",
        href: "/profile/default/trade",
        icon: "alerts"
    },
    {
        label: "Reports",
        href: "/profile/default/trade",
        icon: "reports"
    },
];

export const SettingsCollapsibeLinks: navLinksProps[] = [
    {
        label: "Privacy Settings",
        href: "/profile/default/trade",
        icon: "privacy"
    },
    {
        label: "Security Settings",
        href: "/profile/default/trade",
        icon: "security"
    },
    {
        label: "Notification Settings",
        href: "/profile/default/trade",
        icon: "notifications"
    },
    {
        label: "Display Settings",
        href: "/profile/default/contact",
        icon: "display"
    },

];

export const OtherNavLinks: navLinksProps[] = [
    {
        label: "Professional Accounts",
        href: "/profile/default/trade",
        icon: "professional"
    },
    {
        label: "+Insights",
        href: "/profile/default/trade",
        icon: "insights"
    },
    {
        label: "Log Out",
        href: "/",
        icon: "logout"
    },

];


export const HelpCollapsibeLinks: navLinksProps[] = [
    {
        label: "AI Academy",
        href: "/profile/default/trade",
        icon: "academy"
    },
    {
        label: "Platform Tour",
        href: "/profile/default/trade",
        icon: "tour"
    },
    {
        label: "Terms and Agreements",
        href: "/profile/default/trade",
        icon: "agreement"
    },
    {
        label: "Contact Us",
        href: "/profile/default/contact",
        icon: "contact"
    },

];















