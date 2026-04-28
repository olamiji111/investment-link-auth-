"use client";
import React, { useState } from 'react';
import type { DepositMethod } from '@/types';
import AmountInput from './amountinput';
import { ChevronLeft } from 'lucide-react';
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger, PopoverDescription, PopoverTitle } from '../ui/popover';
import CryptoQRCode from './qrcode';

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




const CryptocurrencyDeposit = () => {
    const [isPopOveropen, setOpenPopover] = useState<boolean>(false);
    const [selectedCoin, setSelectedCoin] = useState<CryptoType | null>(null)

    const handlePopoverItem = (value: CryptoType) => {
        setSelectedCoin(value);
        setOpenPopover(false)
    }

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
    }
    return (
        <div className='flex flex-col gap-y-3 px-3 w-full relative'>
            <p className='text-[16px] font-bold text-zinc-400'>
                {" Account Name: "}
                <span className='text-zinc-500'> Olamiji odubote </span>
            </p>
            <div className='flex flex-col'>
                <AmountInput />
                <div className='py-6  sm:max-w-xl sm:mx-auto w-full flex-col gap-y-4 flex items-start'>
                    <div className="flex flex-col gap-y-2 items-start w-full">
                        <div className='flex flex-row items-center justify-between w-full'>
                            <span className=' font-semibold text-zinc-500 text-[15px]'> Cryptocurrency</span>
                            <span title="The cryptocurrency you'd like to use:" className='icon icon-help text-zinc-900 text-xl cursor-pointer ' />
                        </div>
                        <Popover open={isPopOveropen} onOpenChange={setOpenPopover}>
                            <PopoverTrigger asChild>
                                <button
                                    className={` pl-3 pr-0 cursor-pointer  bg-transparent flex flex-row justify-between border border-zinc-400 focus-within:border-green-500 h-10 items-center  w-full  transition-all ease-in-out outline-none duration-300 rounded-sm `}
                                >
                                    <span
                                        className='text-sm text-zinc-500'
                                    >
                                        {selectedCoin ? CryptocurrencyMethods[selectedCoin].symbol : "Select a Currency"}
                                    </span>
                                    <Image
                                        src="/asset/icons/download.svg"
                                        alt="dropdown"
                                        width={22}
                                        height={22}
                                        className='size-8 object-contain'
                                    />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent
                                align="center"
                                sideOffset={6}
                                className='w-52 z-9999  shadow-xl rounded-sm outline-none ring-0 ring-offset-0'
                            >
                                <PopoverTitle />

                                <div className='flex-col p-1 flex gap-4'>
                                    {Object.entries(CryptocurrencyMethods).map(([Key, coin]) => (
                                        <div key={Key} onClick={() => handlePopoverItem(Key as CryptoType)} className='flex items-center p-1 flex-row gap-x-1.5 rounded hover:font-semibold hover:bg-light-blue text-zinc-400 hover:text-white cursor-pointer ' >
                                            <Image
                                                src={coin.imgPath}
                                                alt={`coin image ${coin.symbol}`}
                                                width={20}
                                                height={20}
                                                className='size-5 rounded-full object-contain'
                                            />
                                            <span className='text-sm'> {coin.symbol}</span>
                                        </div>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                {selectedCoin && (
                    <div className='flex flex-col gap-2 '>
                        <p className="text-sm text-zinc-600 leading-relaxed">
                            We have successfully generated a{" "}
                            <span className="text-green-500 font-semibold">
                                {selectedCoin}
                            </span>{" "}
                            address for you, please ONLY send{" "}
                            <span className="text-green-500 font-semibold">
                                {selectedCoin}
                            </span>{" "}
                            on the{" "}
                            <span className="text-green-500 font-semibold">
                                {selectedCoin}
                            </span>{" "}
                            network to this address or your funds will be{" "}
                            <span className="text-red-500 font-semibold">permanently</span> lost,
                            do not send any other token to this address.
                        </p>


                        <p className="text-xs text-zinc-500 mt-2">
                            Any payment sent to:{" "}
                            <span
                                onClick={() =>
                                    handleCopy(CryptocurrencyMethods[selectedCoin].address)
                                }
                                className="font-mono text-zinc-900 font-bold cursor-pointer select-all hover:text-green-600 transition"
                            >
                                {CryptocurrencyMethods[selectedCoin].address}
                            </span>{" "}
                            will be credited to your account within{" "}
                            <span className="font-semibold">3 network confirmations</span>.
                        </p>


                    </div>
                )}
                {/* QR Code Scanner  */}
                <div className='flex items-center justify-center'>
                    {selectedCoin && (
                        <CryptoQRCode
                            value={CryptocurrencyMethods[selectedCoin].address}
                        />
                    )}
                </div>

                <div className="pb-6  flex flex-col gap-3 items-start text-[12px] text-zinc-500 font-normal">

                    <p>
                        Minimum of £200.00 per deposit. Cryptocurrency deposits are final and cannot be reversed once confirmed on the blockchain.
                    </p>

                    <p>
                        Please ensure you only send funds to the correct address on the selected network. Sending any other token or using the wrong network may result in permanent loss of funds.
                    </p>

                    <p>
                        Deposits will be credited to your account after the required network confirmations are completed.
                    </p>

                    <p>
                        We strongly recommend double-checking the wallet address before sending any transaction. Blockchain transactions are irreversible once broadcast.
                    </p>

                </div>

            </div>
        </div>

    )



}

export default CryptocurrencyDeposit;