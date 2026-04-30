"use client";
import React, { useState } from 'react'
import Image from "next/image"

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
                            <div key={idx} className='flex flex-row gap-x-2 items-center'>
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
                                    className='object-contain  rounded-3xl bg-white '
                                />
                                <span className='text-xs italic text-center font-semibold text-link-color hover:text-link-hover cursor-pointer '> Stock market Trade Bot </span>
                            </div>

                            <div className='flex flex-col gap-y-4 pb-4 items-start w-full'>
                                <p className='text-[13px] text-zinc-500 fomt-medium'> What you must know before you using Trade Bot? </p>
                                {botConditions.map((condition, idx) => (
                                    <div key={idx} className="flex flex-col gap-y-4">
                                        <span className='text-xs sm:text-[13px] text-zinc-600'>{condition}
                                            {condition}
                                        </span>
                                    </div>

                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Bot