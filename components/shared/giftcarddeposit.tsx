import React, { ChangeEvent, useState } from 'react';
import AmountInput from './amountinput';
import Image from "next/image";

function Giftcarddeposit() {
    const [giftCardValue, setGiftCardVlue] = useState("")

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setGiftCardVlue(String(value));
    }

    const handleDeposit = () => {

        console.log(giftCardValue);
    }
    return (
        <div className='flex flex-col gap-y-3 px-3 w-full relative'>
            <p className='text-[16px] font-bold text-zinc-400'>
                {" Account Name: "}
                <span className='text-zinc-500'> Olamiji odubote </span>
            </p>
            <div className='flex flex-col'>
                <AmountInput />
                <div className='py-6  sm:max-w-xl sm:mx-auto w-full flex-col gap-y-4 flex items-start'>
                    <div className="flex flex-col gap-y-2 items-start w-full">
                        <span className=' font-semibold text-zinc-500 text-[15px]'> Promotion/Voucher Code </span>
                        <span className='text-[12px] text-zinc-500'> Found a promotion code? Redeem it here!</span>

                        <input
                            name="GiftCard"
                            value={giftCardValue}
                            type="text"
                            onChange={handleInput}
                            placeholder="Promo Code"
                            inputMode='text'
                            className='border focus-within:border-green-500 border-zinc-400 rounded w-full h-10 outline-none ring-0 ring-offset-0 px-3 text-[15px] text-zinc-900   '

                        />
                    </div>
                </div>
            </div>
            <div className="pb-20 flex flex-col gap-3 items-start text-[12px] text-zinc-500 font-normal">

                <p>
                    Minimum of £200.00 per deposit. Gift card submissions are subject to verification and approval.
                </p>

                <p>
                    Please ensure that the gift card code entered is valid and has not been previously redeemed. Invalid or already-used codes will not be accepted.
                </p>

                <p>
                    Deposits will be credited to your account once the gift card has been successfully verified.
                </p>

                <p>
                    We strongly recommend double-checking the gift card details before submission. Incorrect entries may result in delays or rejection of the deposit.
                </p>

            </div>
            <div className='fixed bottom-0 z-50 left-0 bg-white font-medium  pb-4 shadow-none w-full flex flex-col items-center justify-center gap-2.5'>
                <button onClick={() => handleDeposit} className=" sm:w-72 w-52 mt-2 h-8 cursor-pointer gap-x-2 bg-[linear-gradient(90deg,#11afff_2%,#2e86fe_33%)] duration-300 border-none ease-in-out rounded-sm  overflow-hidden text-white  flex items-center justify-center font-normal text-[15px]">
                    <span> Redeem </span>
                    <Image
                        src="/asset/images/Deposit/1507915.png"
                        alt="GiftCard Payment"
                        width={20}
                        height={20}
                        className="h-8 w-8 object-contain"

                    />
                </button>
            </div>
        </div>
    )
}

export default Giftcarddeposit
