"use client";

import React, { ChangeEvent, useRef, useState } from 'react';
import type { DepositMethod } from '@/types';

const AmountInput = () => {
    const [amount, setAmount] = useState("200");

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, "");

        const formatted =
            value.length > 3 ? Number(value).toLocaleString() : value;

        setAmount(formatted);
    };

    return (

        <div className=" w-full sm:max-w-xl sm:mx-auto">
            <div className='flex  sm:mx-auto flex-col gap-y-2 items-start '>
                <p className='text-zinc-500 text-[16px] font-semibold'>
                    Amount
                </p>

                <div className="flex  flex-row items-center w-full">

                    <div className="w-20 flex items-center border rounded-[3px] rounded-r-none border-zinc-400 justify-center h-10">
                        <span className="text-xl text-zinc-500">£</span>
                    </div>
                    <div className='pl-3 flex w-full h-10 border overflow-hidden rounded-[3px] rounded-l-none border-l-0 border-zinc-400'>
                        <div className=' flex flex-row justify-between w-full items-center'>
                            <input
                                name="amount"
                                type="text"
                                placeholder='Amount'
                                value={amount}
                                inputMode='numeric'
                                onChange={handleInput}
                                onFocus={() => { }}
                                onBlur={() => { }}
                                autoComplete='off'
                                className="flex-1 no-spinner   placeholder:font-extralight bg-transparent outline-none text-[15px] text-zinc-900  "
                            />


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default AmountInput;