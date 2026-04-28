import React from 'react';
import AmountInput from './amountinput';
import { Checkbox } from '../ui/checkbox';
import Image from "next/image";

const Paypal = () => {
    return (
        <div className='flex flex-col gap-y-4 px-3 w-full relative'>
            <p className='text-[16px] font-bold text-zinc-400'>
                {" Account Name: "}
                <span className='text-zinc-500'> Olamiji odubote </span>
            </p>

            <div className='flex flex-col'>
                <AmountInput />
                <div className='py-6  sm:max-w-xl sm:mx-auto w-full flex-col gap-y-4 flex items-start'>
                    <div className='flex flex-row gap-x-2 items-center'>
                        <Checkbox defaultChecked className='size-6 data-checked:bg-medium-blue data-checked:border-transparent' />
                        <span className='text-zinc-500 txt-[13px]'> One click payment </span>
                        <span className='icon icon-info-2 text-zinc-400' />
                    </div>
                </div>

            </div>
            <div className="pb-32  flex flex-col gap-3 items-start text-[12px] text-zinc-500 font-normal">
                <p> Minimum of £200.00 per deposit. </p>
                <p>
                    Your PayPal account will never be charged more than the amount that you deposit here.
                </p>
                <p>
                    Enable One Click Payment to skip re-authenticating your PayPal account after the initial approval. You can revoke this permission at any time from your PayPal settings.
                </p>
                <p>
                    If you are not using One Click Payment, you will be referred to PayPal site for each deposit.
                </p>
                <p>
                    We will always attempt to send withdrawals to your original source of remittance, whenever possible.
                </p>
                <p>
                    Until the verification of your account is completed, the requested deposit amount will remain with your PayPal as reserved funds and will not be credited to your trading account, or available for use.
                </p>
                <p>
                    I declare that: (a) this Payment Method (PayPal) is registered in the name of Olamiji Odubote and I am authorised to use it for payment (this may be verified); and (b) all funds deposited into my account are subject to risk of possible loss.
                </p>
            </div>
            <div className='fixed bottom-0 z-50 left-0 pt-4 bg-white   pb-4 shadow-none w-full flex flex-col items-center justify-center gap-1'>
                <button className=" sm:w-72 w-52 mt-2   h-10 cursor-pointer bg-yellow-500 duration-300 border-none ease-in-out rounded-sm   text-white  flex items-center justify-center gap-x-1 font-normal text-[15px]">
                    <Image
                        src="/asset/images/Deposit/paypal-logo-svgrepo-com.svg"
                        alt="Paypal Payment"
                        width={70}
                        height={20}
                        className="  object-contain"
                    />
                    <span className='text-[11px] text-black mt-1 font-normal'> Checkout</span>
                </button>
                <span className="text-black font-semibold text-[12px]"> Th safer, easier way to pay </span>
                <div className=' text-zinc-500  font-normal mt-2   flex flex-row gap-x-2 items-center justify-center'>
                    <span className='icon icon-padlock text-lg' />
                    <span className="text-xs"> Secure by SSL</span>
                </div>
            </div>
        </div>
    )
}

export default Paypal;
