"use client";
import React, { useState } from 'react';
import Header from '@/components/shared/header';
import { PopularOptions } from "@/constants";
import Image from "next/image";
import { ChevronRight } from 'lucide-react';
import TradingViewChart from "@/components/shared/tradingview";
import Link from "next/link";
import Alert from '@/components/shared/alert';

type titleType = (typeof PopularOptions)[number]["symbol"];

const Trade = () => {
    const [TradeOption, setTradeOption] = useState<titleType>("TVC:GOLD");
    const [isAlertOpen, setAlertOpen] = useState<boolean>(false);

    const AlertContent = (
        <div className="flex flex-col gap-6  justify-between h-full">

            <p className="text-zinc-600 font-normal text-xs ">
                No Available Funds to Buy or sell
            </p>

            <div className="flex flex-row gap-x-2 items-center w-full mt-3">


                <div className="ml-auto flex gap-x-3">

                    <Link
                        href="/profile/default/deposit"
                        className="text-link-color rounded-full px-4 py-1 border border-[#8593bf] flex items-center justify-center transition-all duration-300"
                    >
                        Deposit
                    </Link>

                    <button onClick={() => setAlertOpen(false)} className="text-link-color cursor-pointer font-normal rounded-full border border-[#8593bf] flex items-center justify-center px-4 py-1">
                        Ok
                    </button>

                </div>

            </div>
        </div>
    );

    const handleTradeClick = (symbol: titleType) => {
        setTradeOption(symbol);
    };

    return (
        <main className="h-screen relative ">
            <Header headerTitle="Popular Options" />

            <div className=" h-full ">
                <div className="flex flex-col w-full overflow-hidden pb-58 ">

                    {PopularOptions.map((trade, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleTradeClick(trade.symbol)}
                            className={`px-3 flex flex-col border-b border-zinc-200 cursor-pointer transition-colors duration-300 w-full
                            ${TradeOption === trade.symbol ? "bg-[rgba(66,133,244,.08)]" : "bg-white"}
                            hover:bg-[rgba(66,133,244,.08)]`}
                        >

                            {/* TOP ROW */}
                            <div className="relative flex items-center w-full py-2">

                                {/* LEFT */}
                                <div className="flex items-center gap-3 ">
                                    <Image
                                        alt={`Trade ${trade.name}`}
                                        src={trade.imgPath}
                                        width={20}
                                        height={20}
                                        priority
                                        className="w-6 h-6 object-contain rounded-[5px]"
                                    />

                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm font-semibold text-black">
                                                {trade.name}
                                            </span>
                                            <span className="text-zinc-500 font-semibold text-sm ">
                                                | {trade.ref} |
                                            </span>
                                        </div>

                                        <span className="text-zinc-500 font-medium text-sm">
                                            {trade.month}
                                        </span>
                                    </div>
                                </div>

                                {/* CENTER (TRUE CENTER) */}
                                <span
                                    className={`absolute left-1/2 translate-x-6 sm:-translate-x-2  px-2 py-[2px] text-sm rounded-sm
                                    ${trade.salePercentage.includes("-")
                                            ? "bg-red-100 text-red-400"
                                            : "bg-none text-green-500"
                                        }`}
                                >
                                    {trade.salePercentage}
                                </span>

                                {/* RIGHT */}
                                <div className="ml-auto">
                                    <button>
                                        <ChevronRight className="text-link-color mt-5" size={20} />
                                    </button>
                                </div>

                            </div>

                            {/* BOTTOM ROW */}
                            <div className="flex justify-between items-center w-[110%] sm:w-[90%] pb-2">

                                <div className="flex items-center space-x-1">
                                    <button onClick={() => setAlertOpen(true)} className="px-6 sm:px-8 py-0.5 border hover:border-transparent hover:bg-[#2e86fe] border-[#768496] rounded-full bg-transparent flex items-center justify-center text-black transition-colors duration-300 text-sm cursor-pointer">
                                        Sell
                                    </button>
                                    <span className="text-sm text-zinc-400">
                                        {trade.sellPrice}
                                    </span>
                                </div>

                                <div className="flex items-center space-x-1">
                                    <button onClick={() => setAlertOpen(true)} className="px-6 sm:px-8 py-0.5 border hover:border-transparent hover:bg-[#2e86fe] border-[#768496] rounded-full bg-transparent flex items-center justify-center text-black transition-colors duration-300 text-sm cursor-pointer">
                                        Buy
                                    </button>
                                    <span className="text-sm text-zinc-400">
                                        {trade.purchasePrice}
                                    </span>
                                </div>

                                <div />

                            </div>

                        </div>
                    ))}

                </div>
            </div>
            <div className="fixed bottom-0  overflow-hidden overscroll-hidden pb-0 scrollbar-none left-0 w-full sm:h-[45vh] h-[32vh]  bg-white border-t shadow-2xl z-50">
                <TradingViewChart symbol={TradeOption} />
            </div>
            <Alert open={isAlertOpen} setOpen={setAlertOpen} contentChildren={AlertContent} header="Info" />
        </main>
    );
};

export default Trade;