"use client";
import React, { useEffect, useState, useRef } from 'react';
import Header from "@/components/shared/header";
import { useBalanceStore } from '@/store';
import Link from "next/link";

const FundsManagement = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const currentBalance = useBalanceStore((state) =>
        state.balances[state.currentUserId]
    )
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        let isMounted = true;

        const handleWheel = (e: WheelEvent) => {
            if (!isMounted) return;

            e.preventDefault();

            const direction = Math.sign(e.deltaY);
            const speed = Math.abs(e.deltaY);
            const normalized = direction * Math.min(speed, 80);

            el.scrollTop += normalized * 0.9;
        };

        el.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            isMounted = false;
            el.removeEventListener("wheel", handleWheel);
        };
    }, []);
    return (
        <div ref={scrollRef} id="scroll-container" className='h-dvh  flex flex-col relative overflow-y-auto no-scrollbar'>
            <Header headerTitle="Fund Management" />
            <div className='px-4 sm:px-6'>
                <div className='fixed z-50 right-3 top-8 translate-y-8'>
                    <button className='border-none text-[15px]  font-semibold text-link-color flex flex-row gap-x-1 items-center cursor-pointer ease-in-out transition-all duration-300 '>
                        <span>
                            Support
                        </span>
                        <span className='icon icon-contact text-2xl' />
                    </button>
                </div>
                <div className='flex   flex-col items-center justify-center py-6'>
                    <div className='flex flex-col gap-4 items-center'>
                        <div className='flex flex-row space-x-1 items-center '>
                            <span className='text-zinc-500 txt-[13px] font-medium'> Equity </span>
                            <span className='icon-pds icon-info text-black text-xl' />
                        </div>
                        <div className='flex flex-row text-link-color items-end'>
                            <span className='text-5xl  font-medium'>
                                £{currentBalance.Equity}
                            </span>
                            <span className='text-md font-medium text-xl'>
                                .00
                            </span>
                        </div>
                    </div>
                    <div className='flex gap-x-2 flex-row items-center py-10'>
                        <Link href="/profile/default/deposit" className="w-40 sm:w-62 h-14 transition-all cursor-pointer bg-[linear-gradient(90deg,#11afff_5%,#2e86fe_33%)] duration-300 border border-transparent ease-in-out rounded-3xl text-xl text-white  flex items-center justify-center font-semibold">
                            Deposit
                        </Link>
                        <button className="w-40 sm:w-62 h-14  transition-all   bg-text-color cursor-pointer  text-link-color duration-300 border border-transparent ease-in-out rounded-3xl text-xl  flex items-center justify-center font-semibold">
                            Withdraw
                        </button>
                    </div>

                    <div className='  border border-zin-300  md:w-1/2  flex-1 rounded-xl h-auto overflow-hidden bg-transparent w-full '>
                        <div className="flex flex-col gap-4 p-4 py-3 items-start">
                            <div className='flex text-zinc-800 font-medium gap-x-3  text-sm flex-row items-center justify-between w-full'>
                                <span className='shrink-0 capitalize'> Maintenance margin </span>
                                <div className="w-full  h-[1px] bg-[repeating-linear-gradient(to_right,_#9ca3af_0,_#9ca3af_4px,_transparent_4px,_transparent_8px)]" />
                                <span> £{currentBalance['M.Margin'].toFixed(2)}</span>
                            </div>
                            <div className='flex text-zinc-800 font-medium gap-x-3  text-sm flex-row items-center justify-between w-full'>
                                <span className='shrink-0 capitalize'> Initial margin </span>
                                <div className="w-full  h-[1px] bg-[repeating-linear-gradient(to_right,_#9ca3af_0,_#9ca3af_4px,_transparent_4px,_transparent_8px)]" />
                                <span> £{currentBalance['M.Margin'].toFixed(2)}</span>
                            </div>
                            <div className='flex text-zinc-800 font-medium gap-x-3  text-sm flex-row items-center justify-between w-full'>
                                <span className='shrink-0 capitalize'> Available to Withdraw </span>
                                <div className="w-full  h-[1px] bg-[repeating-linear-gradient(to_right,_#9ca3af_0,_#9ca3af_4px,_transparent_4px,_transparent_8px)]" />
                                <span> £{currentBalance['M.Margin'].toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className='py-4 flex flex-row gap-x-2 items-center'>
                        <button className='border text-[15px] font-bold border-[#8593bf] active:bg-[rgba(46,134,254,0.302))] hover:bg-[rgba(46,134,254,0.302))] text-link-color outline-none  rounded-md px-4 pr-6 py-2 flex items-center justify-center cursor-pointer gap-x-2 bg-transparent transition-all duration-300 ease-in-out '>
                            <span className='icon icon-cashflow text-2xl' />
                            <span> Cashflow</span>
                        </button>
                        <Link href="/payments" className='border text-[15px] font-bold border-[#8593bf] active:bg-[rgba(46,134,254,0.302))] hover:bg-[rgba(46,134,254,0.302))] text-link-color outline-none  rounded-md px-4 pr-6 py-2 flex items-center justify-center cursor-pointer gap-x-2 bg-transparent transition-all duration-300 ease-in-out '>
                            <span className='icon icon-payment-method text-2xl' />
                            <span className='capitalize'> Payment Method</span>
                        </Link>
                    </div>


                </div>

            </div>

        </div>
    )
}

export default FundsManagement
