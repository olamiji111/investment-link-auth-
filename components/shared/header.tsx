"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Menu, ChevronDown, Wallet } from 'lucide-react';
import { Search } from '@/components/icons/icons';
import Link from "next/link";
import Sidebarsheet from './sidebarsheet';

const Header = ({ headerTitle }: { headerTitle: string }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const [showDiv, setShowDiv] = useState<boolean>(true)
    const addFundRef = useRef<HTMLDivElement | null>(null)

    const handleNotClick = () => {
        alert("Notifications sent to your registered Email")
    }

    const handleDivCancel = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowDiv(false);
    }

    const isTrue = headerTitle.replace(/\s/g, '').toLocaleLowerCase() === "popularoptions";

    return (
        <>
            <header className='fixed top-0 z-20 bg-white border-none transition-all backdrop-blur-none duration-300 w-full overflow-y-hidden'>
                <div className='py-3 px-4 flex  flex-row justify-between items-center max-w-full w-full'>
                    <div className='flex flex-row gap-4 items-center'>

                        {/* Opening the Left Sheet */}
                        <Sidebarsheet open={isSidebarOpen} setOpen={setIsSidebarOpen}>
                            <button className='px-1 transition-all duration-300 cursor-pointer outline-none ring-0 '>
                                <Menu size={20} strokeWidth={1.5} className='text-black' />
                            </button>
                        </Sidebarsheet>
                        <button className='px-1 transition-all ease-in-out duration-300 cursor-pointer flex flex-row gap-3 items-center'>
                            <span className=' capitalize text-[16px] font-bold text-black'> {headerTitle} </span>
                            {headerTitle.replace(/\s/g, '').toLocaleLowerCase() === "popularoptions" && (
                                <ChevronDown size={22} strokeWidth={2} className='text-black mt-1' />
                            )}
                        </button>

                    </div>
                    <div className='flex flex-row gap-3 items-center'>
                        <button className='transition-all duration-300 cursor-pointer px-2s'>
                            <Search className='size-6 text-black mt-1' />
                        </button>
                        <div className="relative inline-flex">

                            {/* slow pulse ring */}
                            <span className="absolute top-1/2 left-1/2 w-[80%] h-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c71f5d] opacity-100 animate-[ping_3s_ease-in-out_infinite]"></span>

                            {/* button */}
                            <button
                                onClick={handleNotClick}
                                title="notification"
                                className="relative size-9 border-2 border-white text-sm cursor-pointer rounded-full bg-[#c71f5d] text-white font-normal flex items-center justify-center"
                            >
                                <span>3</span>
                            </button>

                        </div>
                    </div>
                </div>
                {showDiv && isTrue && (
                    <Link href="/profile/default/deposit" className='px-4  cursor-pointer text-sm text-white transition-all duration-300relative  py-3 bg-[linear-gradient(to_right,#11affd_0%,#2e86fe_100%)] flex items-center justify-between flex-row '>
                        <div />
                        <div className='flex fles-row gap-3 items-center '>
                            <span className="icon icon-add-funds text-[1.5rem] md:text-3xl" />
                            <span className='text-md sm:text-lg lg:text-xl font-medium '> Add Funds</span>
                        </div>


                        <button onClick={handleDivCancel} className="text-white cursor-pointer transition-all duration-300">
                            <span className="icon icon-cancel text-[1.5rem]" />
                        </button>
                    </Link>
                )}

            </header>
            <div className={` ${showDiv && isTrue ? "pt-24" : "pt-12"}`} />
        </>

    )

}

export default Header;
