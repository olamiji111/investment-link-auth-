import React, { ChangeEvent, useRef, useState, SyntheticEvent } from 'react';
import AmountInput from './amountinput';
import Image from "next/image";

const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
);
const years = Array.from({ length: 21 }, (_, i) => 2026 + i);

const CardDeposit = () => {

    const formRef = useRef<HTMLFormElement | null>(null);
    const [formValue, setFormValue] = useState({
        cardNumber: "",
        cvv: "",
        validThr: {
            month: "04",
            year: "2026"
        },
    })

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const cleanedValue = value.replace(/[^0-9]/g, "");
        setFormValue((prev) => ({
            ...prev, [name]: cleanedValue
        }));

    };
    const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        setFormValue((prev) => ({
            ...prev,
            validThr: {
                ...prev.validThr,
                month: value,
            }
        }))
    };
    const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        setFormValue((prev) => ({
            ...prev,
            validThr: {
                ...prev.validThr,
                year: value,
            }
        }))
    };


    const handleDeposit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formValue.cardNumber
            || !formValue.cvv || !formValue.validThr.month
            || !formValue.validThr.year
        ) {
            console.log(" Input All Fields")
            return;
        }
        //block for handle card Desposit
        try {
            console.log("Processing your Deposit", formValue)
        } catch {
            console.log("Deposit Failed", formValue)
        }

    }

    return (
        <div className='flex flex-col gap-y-5 px-3 w-full relative'>
            <p className='text-[16px] font-bold text-zinc-400'>
                {" Card Holder's Name: "}
                <span className='text-zinc-500'> Olamiji odubote </span>
            </p>
            <div className='flex flex-col'>
                <AmountInput />
                <form ref={formRef} className='py-4  sm:max-w-xl sm:mx-auto w-full flex-col gap-y-5 flex items-start'>
                    <div data-set="Card Number" className='w-full flex flex-col gap-2'>
                        <div className='flex flex-row items-center justify-between w-full'>
                            <label htmlFor='cardNumber' className=' font-semibold text-zinc-500 text-[15px] '> Card Number</label>
                            <div className='border rounded border-zinc-300 py-0.5 px-2 inline-flex items-center justify-center'>
                                <Image
                                    src="/asset/images/Deposit/logo-card.png"
                                    alt="Card logo"
                                    width={20}
                                    height={20}
                                    className='object-contain w-6 h-6'
                                />
                            </div>
                        </div>
                        <input
                            name="cardNumber"
                            value={formValue.cardNumber}
                            type="text"
                            onChange={handleInput}
                            inputMode='numeric'
                            className='border border-zinc-400 rounded w-full h-10 outline-none ring-0 ring-offset-0 px-3'

                        />
                    </div>

                    <div data-set="Valid Thru" className='flex flex-col gap-2 w-full'>
                        <label htmlFor='validThru' className=' font-semibold text-zinc-500 text-[15px] '>Valid Thru:</label>
                        <div className='flex-row flex  gap-x-2 item-center '>
                            <div className='relative w-1/2'>
                                <select
                                    value={formValue.validThr.month}
                                    onChange={handleMonthChange}
                                    className="appearance-none w-full h-10 cursor-pointer rounded-md bg-transparent  border border-zinc-400 py-1 pl-3  text-sm font-normal hover:bg-zinc-50 focus:outline-none"
                                >
                                    {months.map((month, idx) => (
                                        <option key={idx} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>

                                <Image
                                    src="/asset/icons/download.svg"
                                    alt="dropdown"
                                    width={22}
                                    height={22}
                                    className="absolute -right-0 top-1/2 size-8 -translate-y-1/2 pointer-events-none"
                                />
                            </div>
                            <div className='relative w-1/2'>
                                <select
                                    value={formValue.validThr.year}
                                    onChange={handleYearChange}
                                    className="appearance-none w-full  h-10 cursor-pointer  rounded-md bg-transparent  border border-zinc-400 py-1 pl-3  text-sm font-normal hover:bg-zinc-50 focus:outline-none"
                                >
                                    {years.map((year, idx) => (
                                        <option key={idx} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>

                                <Image
                                    src="/asset/icons/download.svg"
                                    alt="dropdown"
                                    width={22}
                                    height={22}
                                    className="absolute -right-0 top-1/2 size-8 -translate-y-1/2 pointer-events-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div data-set="CVV Code" className='flex flex-col gap-2 w-full'>
                        <label htmlFor='CVV Code' className=' font-semibold text-zinc-500 text-[15px] '>
                            CVV code
                        </label>

                        <input
                            name="cvv"
                            value={formValue.cvv}
                            type="text"
                            onChange={handleInput}
                            inputMode='numeric'
                            className='border border-zinc-400 rounded w-full h-10 outline-none ring-0 ring-offset-0 px-3'

                        />
                    </div>
                </form>
                <div className='pb-28   flex flex-col gap-3 items-start text-[12px] text-zinc-500 font-normal'>
                    <p> Minimum of  £200.00 per deposit.</p>
                    <p> I declare that: (a) this Payment Method (Card) is registered in the name of “Logged In User Name” and I am authorised to use it for payment (this may be verified); and (b) all funds deposited into my account are subject to risk of possible loss.
                        The beneficiary name that will appear on your card statement is “TradeBot”.
                    </p>
                    <p>
                        TradeBot will never charge your card except for your actual deposit transactions.
                    </p>
                    <p>
                        We will always attempt to send withdrawals to your original source of remittance, whenever possible.
                        Until the verification of your account is completed, the requested deposit amount will remain with your Card as reserved funds and will not be credited to your trading account, or available for use.
                    </p>
                </div>
            </div>
            <div className='fixed bottom-0 z-50 left-0 bg-white   pb-4 shadow-none w-full flex flex-col items-center justify-center gap-2.5'>
                <button className=" sm:w-72 w-52 mt-2  py-2 cursor-pointer bg-[linear-gradient(90deg,#11afff_2%,#2e86fe_33%)] duration-300 border-none ease-in-out rounded-sm  overflow-hidden text-white  flex items-center justify-center font-normal text-[15px]">
                    Deposit
                </button>
                <div className=' text-zinc-500  font-normal   flex flex-row gap-x-2 items-center justify-center'>
                    <span className='icon icon-padlock text-lg' />
                    <span className="text-xs"> Secure by SSL</span>
                </div>
            </div>
        </div>
    );
}

export default CardDeposit;