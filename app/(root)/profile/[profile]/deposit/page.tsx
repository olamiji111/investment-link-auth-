"use client";

import React, { useState } from 'react';
import Header from '@/components/shared/header';
import Image from "next/image";
import { depositMethods } from '@/constants';
import { ChevronRight } from 'lucide-react';
import { DepositMethod } from '@/types';
import Depositsheet from '@/components/shared/depositsheet';
import Alert from '@/components/shared/alert';



const Deposit = () => {
    const [isOpenDepositSheet, setOpenDepositSheet] = useState<boolean>(false);
    const [selectedBankType, setSelectedBankType] = useState<DepositMethod | null>(null);
    const [isAlertOpen, setAlertOpen] = useState<boolean>(false);

    const handleDeposit = (item: DepositMethod) => {
        setSelectedBankType(item);
        setOpenDepositSheet(true);
    }
    const AlertContent = (
        <div>
            <p> this is alert content </p>
        </div>
    );
    return (
        <main className='h-dvh  flex flex-col overflow-hidden!'>
            <Header headerTitle='Deposit' />
            <div className=' py-4 flex items-center justify-center max-w-full'>
                <div className='flex flex-row gap-x-4 items-start'>
                    <Image
                        src="/asset/images/Deposit/deposit.svg"
                        alt="Mobile Deposit"
                        width={40}
                        height={40}
                        priority
                        className='object-contain h-12 w-14'

                    />
                    <div className='flex flex-col  items-start'>
                        <h3 className="text-zinc-900 font-semibold text-2xl "> Deposit Funds</h3>
                        <p className='text-zinc-600 text-sm font-medium'> No deposit and withdrawal fees with us</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-1 flex-col py-6 gap-y-2 px-4 sm:px-6 max-w-full'>
                {depositMethods.map((method, idx) => (
                    <button key={idx} onClick={() => handleDeposit(method.name)} className='border cursor-pointer w-full bg-transaprent overflow-hidden  border-zinc-300 rounded-md'>
                        <div className='  flex flex-row items-center justify-between w-full px-4 py-2.5 '>
                            <span className='text-[15px] text-zinc-900 font-medium'> {method.name}</span>
                            <div className='flex flex-row gap-x-1 items-center'>
                                <Image
                                    src={method.imgPath}
                                    alt={`Method Image ${method.name}`}
                                    width={50}
                                    height={50}
                                    className='w-12 h-7 object-contain'
                                />
                                <ChevronRight strokeWidth={2} className='text-zinc-900' />
                            </div>
                        </div>

                    </button>
                ))}
            </div>
            <Alert open={isAlertOpen} setOpen={setAlertOpen} contentChildren={AlertContent} />
            <Depositsheet open={isOpenDepositSheet} setOpen={setOpenDepositSheet} selectedBank={selectedBankType} />
        </main>
    )
}

export default Deposit;
