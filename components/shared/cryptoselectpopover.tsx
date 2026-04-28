"use client";
import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent, PopoverDescription } from '../ui/popover';
interface cryptoInfoProps {
    symbol: string;
    imgPath: string;
    address: string;
}
type CryptocurrencyMethodsProps = Record<CryptoType, cryptoInfoProps>
type CryptoType = "bitcoin" | "ethereum" | "xrp" | "tron" | "solana" | "polygon" | "smartchain"

const CryptocurrencyMethods: CryptocurrencyMethodsProps = {
    bitcoin: {
        symbol: "BTC",
        imgPath: "/asset/images/cryptocurrency/bitcoin-btc-logo.svg",
        address: "bc1qnk6wx8d5j6ufump0qkfdx9we29k3978p46m2hl"
    },
    ethereum: {
        symbol: "ETH",
        imgPath: "/asset/images/cryptocurrency/ethereum-eth-logo.svg",
        address: "0xC33d49A65B3279774EB5156Af9916271d3777506"
    },
    xrp: {
        symbol: "XRP",
        imgPath: "/asset/images/cryptocurrency/xrp-xrp-logo.svg",
        address: "rsjuCpzKFkjtpPpBe7mwrgbMp19yGotmNF"
    },
    tron: {
        symbol: "TRX",
        imgPath: "/asset/images/cryptocurrency/tron-trx-logo.svg",
        address: "TTdfCMzH6AbtQRJsmjsLMj48wfrKSq1BXb"
    },
    solana: {
        symbol: "SOL",
        imgPath: "/asset/images/cryptocurrency/solana-sol-logo.svg",
        address: "9GQgrJ2pmjNb1tNjbLWNm1K5ZJydW3Eo26wcikDmQT5h"
    },
    polygon: {
        symbol: "MATIC",
        imgPath: "/asset/images/cryptocurrency/polygon-matic-logo.svg",
        address: "0xC33d49A65B3279774EB5156Af9916271d3777506"
    },
    smartchain: {
        symbol: "BNB",
        imgPath: "/asset/images/cryptocurrency/bnb-bnb-logo.svg",
        address: "0xC33d49A65B3279774EB5156Af9916271d3777506"
    }

}


function Cryptoselectpopover() {
    const [selectedCoin, setSelectedCoin] = useState<CryptoType | null>(null)

    return (
        <div>

        </div>
    )
}

export default Cryptoselectpopover
