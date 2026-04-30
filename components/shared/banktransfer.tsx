import React from 'react';
import { Loader2 } from "lucide-react"
import Image from "next/image";

type AccountDetailsType = Record<string, string>;

const AccountDetails: AccountDetailsType = {
    "Beneficiary": "TradeBot UK LTD",
    "Beneficiary Address": "27 Angel Court, Copthall Avenue | London EC2R 7HJ, UK",
    "Bank Name": "Deutsche Bank AG",
    "Address": "Winchester House 1 Great Winchester Street London EC2N 2DB, UK",
    "Bank Account Currency": "GBP",
    "Bank Account Number": "XXXXX",
    "Sort Code": "289048",
    "IBAN": "GB52VEUV40508117702206",
    "SWIFT/BIC": "DEUTGB2LXXX",
    "Reference (mandatory)": "234958211",

}

function Banktransfer() {

    const handleSend = (e: MouseEvent) => {
        e.preventDefault()
    }
    return (
        <div className='flex flex-col gap-y-4  px-3 w-full relative'>
            <div className='flex flex-col items-center justify-center'>
                <Image
                    src="/asset/images/Deposit/logo-deutscheBank.webp"
                    alt="Bank Image for transfer"
                    width={200}
                    height={50}
                    className='  object-contain  '
                />
            </div>
            <div className='flex flex-col gap-y-3 py-4 items-start'>
                <span className=' font-semibold text-zinc-500 text-[15px]'>
                    Details for a bank transfer:
                </span>
                <div className='flex flex-col items-start gap-3'>
                    {Object.entries(AccountDetails).map(([Key, value]) => (
                        <div key={Key} className='flex flex-row gap-1  item-start'>
                            <span className='text-zinc-500 mt-0.5 font-normal text-[13px] cursor-default flex shrink-0 '> {Key}: </span>
                            <div className='flex flex-row items-start space-x-1'>
                                <span onClick={() => alert('copied')} className='text-zinc-500 font-semibold text-[14px] text-justify'> {value} </span>
                                {value === "XXXXX" && (
                                    <Loader2 className='w-4 h-4 ml-1 mt-0.5 animate-spin text-link-color' />
                                )}
                                <span className="icon icon-clipboard mt-1 text-link-color hover:text-link-hover cursor-pointer" />
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            <div className='pb-22 flex flex-col gap-y-4 items-start text-zinc-500 text-[13px]'>
                <p> Minimum of £200.00 per deposit. </p>
                <p>
                    The transfer must be made from an account in your name (Ola Bunday).
                </p>
                <p>
                    Funds should be updated in your account within 5 business days. Make sure to provide the reference number (264653218) to avoid delays.
                </p>
                <p>
                    We will always attempt to send withdrawals to the original payment method, whenever possible.
                </p>
                <p className='py-2'>
                    Please note that until the verification of your trading account is completed your requested deposit amount will remain pending and unavailable for use.
                </p>
            </div>

            <div className='fixed bottom-0 z-50 left-0 pt-4 bg-white   pb-4 shadow-none w-full flex flex-col items-center justify-center gap-2'>
                <span className="text-black font-semibold"> Want the details by email? </span>
                <button className=" sm:w-72 w-52 mt-2  py-2 cursor-pointer bg-[linear-gradient(90deg,#11afff_2%,#2e86fe_33%)] duration-300 border-none ease-in-out rounded-sm  overflow-hidden text-white  flex items-center justify-center font-normal text-[15px]">
                    Send me
                </button>

            </div>
        </div>
    )
}

export default Banktransfer;
