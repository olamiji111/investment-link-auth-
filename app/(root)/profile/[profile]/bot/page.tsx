"use client";
import React, { useState } from 'react'
import Image from "next/image";
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';

const botConditions: string[] = [
    "The system trades on your behalf without controlling your funds.",
    "It executes buy and sell actions using advanced, profit-focused strategies",
    "It is optimized to identify high-probability market opportunities.",
    "It is optimized to identify high-probability market opportunities.",
    "The system is designed to enhance profit potential far beyond human ability"
];

const aboutTradeBot: string[] = [
    "TradeBot leverages advanced machine learning models trained over years of market data to identify high-probability trading opportunities.",
    "It delivers real-time market analysis, scanning multiple assets and trends simultaneously with precision.",
    "TradeBot automates trade execution to eliminate emotional bias and improve consistency in decision-making.",
    "Built for dynamic markets, it continuously adapts its strategies based on changing market conditions and patterns.",
    "The system is optimized for both speed and accuracy, ensuring timely execution in fast-moving environments.",
    "TradeBot simplifies complex data into clear, actionable insights for smarter and more confident trading decisions.",
    "Designed for scalability and reliability, it enhances efficiency while supporting automated trading workflows."
];
const Bot = () => {
    const [isBotStarted, setIsBotTraded] = useState<boolean>(false);
    const [botLoading, setBotLoading] = useState<boolean>(false);

    const handleClick = () => {
        setBotLoading(true);

        setTimeout(() => {
            setIsBotTraded((prev) => !prev);
            setBotLoading(false);
        }, 3000);
    };
    return (
        <div className='h-dvh flex-col flex  overflow-y-auto no-scrollbar relative '>

            <div className='px-4 py-8 items-center justify-center  flex flex-col w-full  sm:mx-auto sm:max-w-2xl md:max-w-4xl'>
                <div className='px-5 py-3 flex flex-col  gap-y-4 items-center size-full'>
                    <Image
                        src="/asset/images/IMG_6349.AVIF"
                        alt="Bot Image"
                        width={500}
                        height={80}
                        className='object-contain  '
                    />
                    <div className='flex flex-row items-center justify-between w-full'>
                        <h3 className='text-[1rem] text-link-color font-extrabold'> About TradeBot</h3>
                        <span className='icon-pds icon-info text-zinc-900 text-xl cursor-pointer titel="About Tradebot"' />
                    </div>
                    <div className='flex flex-col gap-y-4 pb-4 items-start w-full'>
                        {aboutTradeBot.map((about, idx) => (
                            <div key={idx} className='flex flex-row gap-x-2 items-start'>
                                <span className='icon-pds icon-info text-zinc-500 text-xl cursor-pointer' />
                                <span className='text-[13px] text-zinc-500 font-normal text-justify'> {about} </span>
                            </div>
                        ))}
                    </div>
                    <div className=' border overflow-hidden border-transparent rounded-md w-full shadow-[0_5px_20px_0_rgba(0,0,0,0.051),0_2px_4px_0_rgba(12,39,128,0.2)] bg-white '>
                        <div className='flex flex-col py-3 px-4 items-center justify-center gap-y-3'>
                            <div className='relative flex flex-col gap-y-1'>
                                <Image
                                    src="/asset/images/IMG_6351.PNG"
                                    alt="Bot Image"
                                    width={300}
                                    height={80}
                                    className={`object-contain rounded-3xl bg-white transition-all duration-500
                                                ${isBotStarted ? "animate-bounce scale-[0.8]" : ""}
                                    `}
                                />
                                <span className="flex items-center justify-center gap-2 text-[11px] font-semibold cursor-pointer">

                                    {/* blinking dot */}
                                    {isBotStarted && (
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                                    )}

                                    {/* text */}
                                    <span className={!isBotStarted ? "text-link-color" : "text-green-600"}>
                                        {!isBotStarted
                                            ? "click start button below to activate bot"
                                            : "Bot is Activated Successfully"}
                                    </span>

                                </span>
                            </div>

                            <div className='flex flex-col gap-y-4 pb-4 items-start w-full'>
                                <p className='text-[13px] text-zinc-500 font-semibold'> What you must know before you using Trade Bot? </p>
                                {botConditions.map((condition, idx) => (
                                    <div key={idx} className="flex flex-col gap-y-4">
                                        <span className='text-xs sm:text-[13px] text-zinc-600'>{condition}
                                            {condition}
                                        </span>
                                    </div>
                                ))}
                                <div className='flex flex-row gap-x-2 items-center'>
                                    <Checkbox defaultChecked className='size-4 rounded-[2px] data-checked:bg-medium-blue data-checked:border-transparent' />
                                    <span className='text-xs text-link-color'> Agree to terms & agreements </span>
                                </div>
                            </div>
                            <button
                                onClick={handleClick}
                                disabled={botLoading}
                                className={`sm:w-72 w-52 mt-2 py-2 cursor-pointer duration-300 rounded-sm text-white flex items-center justify-center text-[15px]
                                            ${!isBotStarted
                                        ? "bg-[linear-gradient(90deg,#11afff_2%,#2e86fe_33%)]"
                                        : "bg-[linear-gradient(90deg,#ff4d4f_0%,#d93e3e_100%)]"
                                    } ${botLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                            >
                                {botLoading
                                    ? "Processing..."
                                    : !isBotStarted
                                        ? "Start Bot"
                                        : "Disable Bot"}
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
export default Bot