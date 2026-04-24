"use client";
import React, { useState } from 'react';
import Header from "@/components/shared/header";
import { useBalanceStore } from '@/store';
import Link from "next/link";

const FundsManagement = () => {
    const currentBalance = useBalanceStore((state) =>
        state.balances[state.currentUserId]
    )

    return (
        <div className='h-dvh  flex flex-col relative '>
            <Header headerTitle="Fund Management" />
            <div className='px-4 sm:px-6'>
                <div className='absolute right-3 top-8 translate-y-8'>
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
                        <Link href="/deposit" className="w-40 h-14 transition-all cursor-pointer bg-[linear-gradient(90deg,#11afff_5%,#2e86fe_33%)] duration-300 border border-transparent ease-in-out rounded-3xl text-xl text-white  flex items-center justify-center font-semibold">
                            Deposit
                        </Link>
                        <button className="w-40 h-14  transition-all   bg-text-color cursor-pointer  text-link-color duration-300 border border-transparent ease-in-out rounded-3xl text-xl  flex items-center justify-center font-semibold">
                            Withdraw
                        </button>
                    </div>

                    <div className='  border border-zin-300  sm:w-11/12  flex-1 rounded-md h-auto overflow-hidden bg-transparent w-full '>
                        <div className="flex flex-col gap-2 p-4 items-start">
                            <p> enafkvanknklba </p>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default FundsManagement
