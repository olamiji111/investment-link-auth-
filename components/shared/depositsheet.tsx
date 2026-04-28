"use client";
import React, { ChangeEvent, useRef, useState } from 'react';
import type { DepositMethod } from '@/types';
import { Sheet, SheetContent, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";
import Header from "@/components/shared/header";
import { ChevronLeft } from 'lucide-react';
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectGroup, SelectTrigger, SelectValue } from "@/components/ui/select"
import CardDeposit from './carddeposit';
import CryptocurrencyDeposit from './cryptocurrencydeposit';
import Giftcarddeposit from './giftcarddeposit';
import Banktransfer from './banktransfer';
import Paypal from './paypal';

interface DepositsheetProps {
    open: boolean;
    setOpen: (b: boolean) => void;
    selectedBank: DepositMethod | null;
};

interface ImageProperty {
    imgPath: string,
    borderColor: string
}
type DepsositImageSourceProp = Record<DepositMethod, ImageProperty>;



const BankImageSource: DepsositImageSourceProp = {
    Card: {
        imgPath: "/asset/images/Deposit/logo-cards.svg",
        borderColor: ""
    },
    Cryptocurrency: {
        imgPath: "/asset/images/Deposit/cryptocurrency.svg",
        borderColor: "border-b border-yellow-400"
    },
    "Bank Transfer": {
        imgPath: "/asset/images/Deposit/logo-wire.svg",
        borderColor: "border-b border-link-color"
    },
    "BRE Gift Card": {
        imgPath: "/asset/images/Deposit/1507915.png",
        borderColor: "border-b border-yellow-500"
    },
    PayPal: {
        imgPath: "/asset/images/Deposit/logo-paypal.svg",
        borderColor: "border-b border-link-hover"
    }

};

type DepositMethodComponent = Record<DepositMethod, React.ReactNode>




const Depositsheet = ({ open, setOpen, selectedBank }: DepositsheetProps) => {
    const DepositComponets: DepositMethodComponent = {
        Card: <CardDeposit />,
        Cryptocurrency: <CryptocurrencyDeposit />,
        "Bank Transfer": <Banktransfer />,
        "BRE Gift Card": <Giftcarddeposit />,
        PayPal: <Paypal />

    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger />
            <SheetContent
                side="top"
                showCloseButton={false}
                className=' h-full w-full  no-scrollbar overflow-y-auto bg-white outline-none flex-1 flex flex-col'
            >
                <SheetTitle />

                <Header headerTitle='Deposit' />
                <div className={` relative  bg-[linear-gradient(180deg,#ffffff_9.76%,#e7e9f2_100%)] h-[7.625rem] w-full   ${selectedBank ? `${BankImageSource[selectedBank].borderColor}` : ""}  `}>
                    <div className='-pt-10 mt-2 px-4 sm:px-6 flex flex-row justify-between w-full items-center '>
                        <div className='flex flex-row gap-x-1 items-center'>
                            <button onClick={() => setOpen(false)} className='text-link-color cursor-pointer transition-all duration-300 outline-none ease-in-out'>
                                <ChevronLeft strokeWidth={2} size={20} />
                            </button>
                            <span className='text-zinc-900 font-bold text-[15px]'> Deposit via {selectedBank ?? ""}</span>
                            <span className='icon icon-info-2 text-link-color text-sm font-bold' />
                        </div>
                        <button className="flex items-center justify-center p-2.5 rounded-full bg-[#e7e9f2] transtion-transform text-link-color ease-in-out duration-300 cursor-pointer">
                            <span className='icon icon-livechat text-lg' />
                        </button>
                    </div>
                    <div className='flex items-center justify-center mt-4 h-full '>
                        <Image
                            src={

                                selectedBank

                                    ? BankImageSource[selectedBank].imgPath

                                    : "/asset/images/Deposit/default.png"
                            }
                            alt={`Bank image of ${selectedBank}`}
                            width={30}
                            height={30}
                            className={` ${selectedBank === "Card" ? "h-15" : "h-11"} absolute bottom-0  w-full object-contain `}

                        />
                    </div>
                </div>
                <div className='px-4 sm:px-6 py-3'>
                    {selectedBank && DepositComponets[selectedBank]}
                </div>
            </SheetContent>

        </Sheet>
    )
}

export default Depositsheet
