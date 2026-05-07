"use client";
import React, { useState, useRef, useLayoutEffect } from 'react'
import Header from '@/components/shared/header';
import Image from "next/image";
import Link from "next/link";
import { RiskManagement } from '@/components/icons/icons';

interface UsageAnalysisProps {
    title: string;
    percentage: string;
    icon: string;
}

const UsageAnalysis: UsageAnalysisProps[] = [
    {
        title: "Basic Usage",
        percentage: "19%",
        icon: "basic"
    },
    {
        title: "Moderate Usage",
        percentage: "38%",
        icon: "moderate"
    },
    {
        title: "Frequent Usage",
        percentage: "43%",
        icon: "frequent"
    },

];

const MarketTypeAnalysis: string[] = [
    "Forex", "Commodities", "Indices", "Shares", "ETFs", "Options"
];


type AverageGradeProps = Record<string, React.ReactNode>;

const BelowAverage = () => (
    <div className="flex flex-col items-center gap-[3px]">
        {/* up (gray) */}
        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-[rgba(0,0,0,0.25)]" />

        {/* down (red) */}
        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#d93e3e]" />
    </div>
);

const Average = () => (
    <div className="flex flex-col items-center gap-[3px]">
        {/* up (orange) */}
        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-[#f59e0b]" />

        {/* down (orange) */}
        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#f59e0b]" />
    </div>
);

const AboveAverage = () => (
    <div className="flex flex-col items-center gap-[3px]">
        {/* up (green) */}
        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-[#22c55e]" />

        {/* down (gray) */}
        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[rgba(0,0,0,0.25)]" />
    </div>
);

const AverageGrade: AverageGradeProps = {
    "Below Average": <BelowAverage />,
    "Average": <Average />,
    "Above Average": <AboveAverage />,
};

interface mostTradedProps {
    index: number;
    imgPath: string;
    name: string;
    percentage: string;
}
const mostTraded: mostTradedProps[] = [
    {
        index: 1,
        imgPath: "/asset/images/popular market/CL_border (1).png",
        name: "Oil",
        percentage: "0.39%"
    },
    {
        index: 2,
        imgPath: "/asset/images/popular market/gold.png",
        name: "Gold",
        percentage: "-0.20%"
    },
    {
        index: 3,
        imgPath: "/asset/images/popular market/NQ (1).png",
        name: "Nasdaq 100",
        percentage: "0.30%"
    },
    {
        index: 4,
        imgPath: "/asset/images/popular market/EB_border (1).png",
        name: "Brent Oil",
        percentage: "0.49%"
    },
    {
        index: 5,
        imgPath: "/asset/images/popular market/FDAX (1).png",
        name: "Germany 40",
        percentage: "-0.11%"
    }
];

const PositionHistory: string[] = [

    "Total Positions",
    "Last 7 days",
    "Last 30 days"
]

const MostTraded = () => {

    return (
        <div className='border w-full max-w-full border-transparent  bg-[#f8f9fb] h-auto  '>
            <div className='flex flex-col px-5 py-4'>
                <div className='flex flex-row items-center justify-between w-full'>
                    <h3 className='text-[1rem] text-link-color font-extrabold'> Plus500 Traders’ Most Traded</h3>
                    <span className='icon-pds icon-info text-zinc-900 text-xl' />
                </div>
            </div>

            <div className='py-8 pb-12 flex flex-row items-center no-scrollbar shrink-0 px-3 gap-x-4 overflow-x-auto w-full scroll-smooth select-none touch-pan-x snap-x snap-mandatory overflow-y-hidden scroll-pl-3'>
                {
                    mostTraded.map((trade, idx) => (
                        <Link href="/profile/default/trade" key={idx} className='w-44  h-[11rem] shrink-0 rounded-md bg-white cursor-pointer border-none outline-none  shadow-[0_5px_20px_0_rgba(0,0,0,0.051),0_2px_4px_0_rgba(12,39,128,0.2)] hover:shadow-[0_0_10px_3px_rgba(46,134,254,0.502)]'>
                            <div className='py-4 px-4 flex flex-row items-start justify-between w-full'>
                                <span className='text-black font-bold text-[18px]'> {trade.index} </span>
                                <div className="flex flex-col gap-y-2 items-center justify-center mt-6">
                                    <Image
                                        src={trade.imgPath}
                                        alt={`trade image ${trade.name}`}
                                        width={30}
                                        height={10}
                                        className='rounded-[4px] object-contain'
                                    />
                                    <h3 className="text-lg text-link-color font-bold text-nowrap"> {trade.name}</h3>
                                    <span className={` text-xl font-extrabold ${trade.percentage.includes("-") ? "text-red-600" : "text-green-700"}`}> {trade.percentage} </span>
                                    <div className="size-10 rounded-full bg-white border-none mt-1 relative inline-flex items-center justify-center">
                                        <div className="size-8 bg-[linear-gradient(90deg,#11afff_2%,#2e86fe_33%)] rounded-full border-none inline-flex items-center justify-center ">
                                            <span className="icon icon-insights text-2xl text-white" />
                                        </div>
                                    </div>
                                </div>
                                <span title="Add/ remove from watchlist" className="icon icon-bookmark text-2xl text-link-color hover:text-link-hover" />

                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
};


const Profile = () => {
    const AverageGradeValue = Object.entries(AverageGrade);
    const [first, ...rest] = PositionHistory;
    const updatedRest = [...rest, "Last 0 days"];
    return (
        <div className='h-dvh flex col overflow-y-auto relative '>
            <Header headerTitle="" />
            <div
                className="absolute top-0 left-0 size-full bg-[#2e86fe] bg-no-repeat"
                style={{
                    backgroundImage: `
      url('/asset/images/plus-me-mobile-bg.svg'),
      linear-gradient(to bottom, transparent 14rem, #fff 24rem),
      linear-gradient(to bottom left, #57d7f0 0%, #2e86fe 26rem)
    `,
                    backgroundPosition: "100% 2rem, 0 0, 0 0",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className='px-4 sm:px-6 pt-20'>
                    <div className='flex flex-row gap-x-3 items-start'>
                        <span className='icon icon-me text-4xl text-white' />
                        <div className='flex flex-col text-white '>
                            <span className='font-medium text-[15px]'> Hi there,</span>
                            <span className='text-3xl font-extrabold'> Ola </span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-8 items-start mt-4'>
                        <div className='border-2 border-[#abcfff] bg-transparent text-white rounded-sm w-full '>
                            <div className='px-4 items-center justify-center  py-1'>
                                <span className='text-sm font-semibold'> Compare your trading habits with other TradeBot traders worldwide.</span>
                            </div>
                        </div>
                        <div className=' px-1.5 flex flex-row items-center justify-between w-full'>
                            <span className="text-white font-extrabold text-[16px]"> My Most Traded </span>
                            <span className='icon-pds icon-info text-white text-xl' />
                        </div>
                    </div>
                    <div className='flex item-center mx-auto justify-center mt-2 max-w-full'>
                        <div className='bg-white cursor-pointer relative border-none w-60  rounded-md h-[11.8rem]  shadow-[0_5px_20px_0_rgba(0,0,0,0.051),0_2px_4px_0_rgba(12,39,128,0.2)] hover:shadow-[0_0_10px_3px_rgba(46,134,254,0.502)]'>
                            <div className=' px-3 pt-4 flex flex-col gap-4 items-center justify-around'>
                                <Image
                                    src="/asset/images/starr.svg"
                                    alt="The Image User"
                                    width={40}
                                    height={20}
                                    className="object-contain"
                                />
                                <p className="text-center text-[13px] font-medium text-link-color" >
                                    You haven&apos;t traded in the last 7 days. Open a position to unlock your insights.
                                </p>
                                <div title="Trade" className='p-3 flex items-center justify-center rounded-full bg-link-color border-none  hover:bg-link-hover '>
                                    <span className="icon icon-lasttrade text-2xl text-white font-semibold" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex-col flex pt-6 py-6 mt-3'>
                    <MostTraded />
                </div>
                {/* Small Scrren Arrangement */}
                <div className='px-6 py-4 sm:hidden'>
                    <div className="  flex  flex-col gap-y-3">
                        <div className='flex flex-row items-center justify-between w-full'>
                            <h3 className='text-[1rem] text-link-color font-extrabold'> My Trading Preferences </h3>
                            <span className='icon-pds icon-info text-zinc-900 text-xl' />
                        </div>
                        {MarketTypeAnalysis.map((market, idx) => (
                            <div key={idx} className='w-full h-9 bg-white shadow-[0_5px_20px_0_rgba(0,0,0,0.051),0_2px_4px_0_rgba(12,39,128,0.2)] cursor-dafault border border-transparent rounded-[4px]'>
                                <div className='px-5 flex flex-row h-full items-center justify-between w-full'>
                                    <div className='flex flex-row items-center  gap-x-4'>
                                        <div className="flex  flex-col items-center gap-[3px]">
                                            {/* up */}
                                            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-[rgba(0,0,0,0.25)]" />

                                            {/* down */}
                                            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#d93e3e]" />
                                        </div>
                                        <span className='text-zinc-500 text-sm font-medium'> {market}</span>
                                    </div>
                                    <span className='text-zinc-400 font-medium text-[16px]'> 0.00%</span>
                                </div>
                            </div>
                        ))}
                        <div className='border overflow-hidden border-zinc-300 rounded-md w-full h-20 bg-transparent'>
                            <div className='flex flex-col gap-3  items-center justify-center h-full w-full px-6 '>
                                <span className='font-normal text-zinc-400 text-sm'> Compare Index </span>
                                <div className='flex flex-row gap-x-8 items-center  '>
                                    {AverageGradeValue.map(([Key, value]) => {
                                        const Value = value as React.ReactNode
                                        return (
                                            <div key={Key} className=' flex flex-row gap-x-1 items-center '>
                                                {Value}
                                                <span className='text-zinc-500 text-sm font-normal'> {Key} </span>
                                            </div>
                                        )

                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='py-8 mt-4 flex flex-col gap-y-3'>
                        <div className='flex flex-row items-center justify-between w-full'>
                            <h3 className='text-[1rem] text-link-color font-extrabold'> My Position History </h3>
                            <span className='icon-pds icon-info text-zinc-900 text-xl' />
                        </div>
                        <div className='border overflow-hidden border-transparent rounded-md w-full shadow-[0_5px_20px_0_rgba(0,0,0,0.051),0_2px_4px_0_rgba(12,39,128,0.2)] bg-white h-24'>
                            <div className='flex flex-col gap-y-2 items-center justify-center h-full w-full'>
                                <span className='text-4xl text-zinc-700 font-bold'> 0 </span>
                                <span className='text-sm text-zinc-500 font-normal'> {first} </span>
                            </div>

                        </div>
                        <div className='flex-row gap-x-3 w-full flex items-center max-w-full'>
                            {rest.map((position, idx) => (
                                <div key={idx} className='w-1/2 border border-transparent rounded-md bg-white h-24 shadow-[0_5px_20px_0_rgba(0,0,0,0.051),0_2px_4px_0_rgba(12,39,128,0.2)] overflow-hidden '>
                                    <div className='flex flex-col gap-y-2 items-center justify-center h-full w-full'>
                                        <span className='text-4xl text-zinc-700 font-bold'> 0 </span>
                                        <span className='text-sm text-zinc-500 font-normal'> {position} </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className=" py-2 flex  flex-col gap-y-3">
                        <div className='flex flex-row items-center justify-between w-full'>
                            <h3 className='text-[1rem] text-link-color font-extrabold'> Risk Management</h3>
                            <span className='icon-pds icon-info text-zinc-900 text-xl' />
                        </div>
                        <div className='relative border overflow-hidden border-transparent rounded-md w-full shadow-[0_5px_20px_0_rgba(0,0,0,0.051),0_2px_4px_0_rgba(12,39,128,0.2)] bg-white h-[20rem]'>
                            <div className='flex flex-col py-4 gap-y-4 h-full w-full px-4 items-center justify-center'>
                                <RiskManagement />
                                <div className="absolute top-25 -translate-x-6 left-1/2 ">
                                    <Image
                                        src="/asset/images/starr-grey.svg"
                                        alt="The Image User"
                                        width={40}
                                        height={20}
                                        className="object-contain"
                                    />
                                </div>
                                <span className='text-sm text-zinc-900 text-center '>
                                    Try using a Risk Management tool when you place your next trade to explore this insight.
                                </span>
                                <Link href="/profile/default/trade" className='text-sm text-link-color hover:text-link-hover'>
                                    Learn more
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className=" py-8  flex  flex-col gap-y-3">
                        <div className='flex flex-row items-center justify-between w-full'>
                            <h3 className='text-[1rem] text-link-color font-extrabold'> Plus500 Traders’ Risk Management</h3>
                            <span className='icon-pds icon-info text-zinc-900 text-xl' />
                        </div>
                        {UsageAnalysis.map((usage, idx) => (
                            <div key={idx} className='w-full h-20 bg-white shadow-[0_5px_20px_0_rgba(0,0,0,0.051),0_2px_4px_0_rgba(12,39,128,0.2)] cursor-dafault border border-transparent rounded-[4px]'>
                                <div className='py-2 flex flex-row items-center h-full justify-between w-full px-4 '>
                                    <div className='flex flex-row gap-x-2 items-center'>
                                        <span className={` icon icon-${usage.icon} text-2xl text-zinc-800`} />
                                        <h2 className="text-zinc-600 text-xl  font-medium"> {usage.title} </h2>
                                    </div>
                                    <span className='text-zinc-700 font-bold text-2xl'> {usage.percentage}</span>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='hidden sm:flex flex-col py-4 px-4'>
                    <div className='flex flex-row w-full gap-6 items-start '>
                        <div className="  flex  flex-col gap-y-3 w-1/2">
                            <div className='flex flex-row items-center justify-between w-full'>
                                <h3 className='text-[1rem] text-link-color font-extrabold'> My Trading Preferences </h3>
                                <span className='icon-pds icon-info text-zinc-900 text-xl' />
                            </div>
                            {MarketTypeAnalysis.map((market, idx) => (
                                <div key={idx} className='w-full h-9 bg-white shadow-[0_5px_20px_0_rgba(0,0,0,0.051),0_2px_4px_0_rgba(12,39,128,0.2)] cursor-dafault border border-transparent rounded-[4px]'>
                                    <div className='px-5 flex flex-row h-full items-center justify-between w-full'>
                                        <div className='flex flex-row items-center  gap-x-4'>
                                            <div className="flex  flex-col items-center gap-[3px]">
                                                {/* up */}
                                                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-[rgba(0,0,0,0.25)]" />

                                                {/* down */}
                                                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#d93e3e]" />
                                            </div>
                                            <span className='text-zinc-500 text-sm font-medium'> {market}</span>
                                        </div>
                                        <span className='text-zinc-400 font-medium text-[16px]'> 0.00%</span>
                                    </div>
                                </div>
                            ))}
                            <div className='border overflow-hidden border-zinc-300 rounded-md w-full h-20 bg-transparent'>
                                <div className='flex flex-col gap-3  items-center justify-center h-full w-full px-6 '>
                                    <span className='font-normal text-zinc-400 text-sm'> Compare Index </span>
                                    <div className='flex flex-row gap-x-8 items-center  '>
                                        {AverageGradeValue.map(([Key, value]) => {
                                            const Value = value as React.ReactNode
                                            return (
                                                <div key={Key} className=' flex flex-row gap-x-1 items-center '>
                                                    {Value}
                                                    <span className='text-zinc-500 text-sm font-normal'> {Key} </span>
                                                </div>
                                            )

                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex  flex-col gap-y-3 w-1/2">
                            <div className='flex flex-row items-center justify-between w-full'>
                                <h3 className='text-[1rem] text-link-color font-extrabold'> Risk Management</h3>
                                <span className='icon-pds icon-info text-zinc-900 text-xl' />
                            </div>
                            <div className='relative border overflow-hidden border-transparent rounded-md w-full shadow-[0_5px_20px_0_rgba(0,0,0,0.051),0_2px_4px_0_rgba(12,39,128,0.2)] bg-white h-[20rem]'>
                                <div className='flex flex-col py-4 gap-y-4 h-full w-full px-4 items-center justify-center'>
                                    <RiskManagement />
                                    <div className="absolute top-25 -translate-x-6 left-1/2 ">
                                        <Image
                                            src="/asset/images/starr-grey.svg"
                                            alt="The Image User"
                                            width={40}
                                            height={20}
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className='text-sm text-zinc-900 text-center '>
                                        Try using a Risk Management tool when you place your next trade to explore this insight.
                                    </span>
                                    <Link href="/profile/default/trade" className='text-sm text-link-color hover:text-link-hover'>
                                        Learn more
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='py-8 flex flex-row w-full gap-6 items-center'>
                        <div className='flex flex-col gap-y-3 w-1/2'>
                            <div className='flex flex-row items-center justify-between w-full'>
                                <h3 className='text-[1rem] text-link-color font-extrabold'> My Position History </h3>
                                <span className='icon-pds icon-info text-zinc-900 text-xl' />
                            </div>
                            <div className='border overflow-hidden border-transparent rounded-md w-full shadow-[0_5px_20px_0_rgba(0,0,0,0.051),0_2px_4px_0_rgba(12,39,128,0.2)] bg-white h-24'>
                                <div className='flex flex-col gap-y-2 items-center justify-center h-full w-full'>
                                    <span className='text-4xl text-zinc-700 font-bold'> 0 </span>
                                    <span className='text-sm text-zinc-500 font-normal'> {first} </span>
                                </div>

                            </div>
                            <div className='flex-row gap-x-3 w-full flex items-center max-w-full'>
                                {rest.map((position, idx) => (
                                    <div key={idx} className='w-1/2 border border-transparent rounded-md bg-white h-24 shadow-[0_5px_20px_0_rgba(0,0,0,0.051),0_2px_4px_0_rgba(12,39,128,0.2)] overflow-hidden '>
                                        <div className='flex flex-col gap-y-2 items-center justify-center h-full w-full'>
                                            <span className='text-4xl text-zinc-700 font-bold'> 0 </span>
                                            <span className='text-sm text-zinc-500 font-normal'> {position} </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex  flex-col gap-y-3 w-1/2">
                            <div className='flex flex-row items-center justify-between w-full'>
                                <h3 className='text-[1rem] text-link-color font-extrabold'> Plus500 Traders’ Risk Management</h3>
                                <span className='icon-pds icon-info text-zinc-900 text-xl' />
                            </div>
                            {UsageAnalysis.map((usage, idx) => (
                                <div key={idx} className='w-full h-20 bg-white shadow-[0_5px_20px_0_rgba(0,0,0,0.051),0_2px_4px_0_rgba(12,39,128,0.2)] cursor-dafault border border-transparent rounded-[4px]'>
                                    <div className='py-2 flex flex-row items-center h-full justify-between w-full px-4 '>
                                        <div className='flex flex-row gap-x-2 items-center'>
                                            <span className={` icon icon-${usage.icon} text-2xl text-zinc-800`} />
                                            <h2 className="text-zinc-600 text-xl  font-medium"> {usage.title} </h2>
                                        </div>
                                        <span className='text-zinc-700 font-bold text-2xl'> {usage.percentage}</span>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile;

