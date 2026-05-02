"use client";

import React, { useState } from "react";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetTitle,

} from "@/components/ui/sheet";
import { User } from "@/components/icons/icons";
import {
    navLinks,
    AccountCollapsibeLinks,
    ToolCollapsibeLinks,
    HelpCollapsibeLinks,
    SettingsCollapsibeLinks,
    OtherNavLinks,
} from "@/constants";
import Link from "next/link";
import CollapsibleAction from "./collapsible";
import { ChevronDown } from "lucide-react";
import type { AccountBalance } from "@/types";
import { useBalanceStore } from "@/store";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";


interface SheetProps {
    open: boolean;
    setOpen: (b: boolean) => void;
    children: React.ReactNode;
}

const defaulTAccountBalance: AccountBalance = {
    Available: 0.0,
    Equity: 0.0,
    "M.Margin": 0.0,
    profit: 0.0,
    "I.Margin": 0.0,
}

const Sidebarsheet = ({ open, setOpen, children }: SheetProps) => {
    const [isAccountCollapsed, setIsAccountCollapsed] = useState(false);
    const [isToolCollapsed, setIsToolCollapsed] = useState(false);
    const [isHelpCollapsed, setIsHelpCollapsed] = useState(false);
    const [isSettingsCollapsed, setIsSettingsCollapsed] = useState(false);
    const currentBalance = useBalanceStore((state) =>
        state.balances[state.currentUserId] ?? defaulTAccountBalance
    );
    const router = useRouter();
    const pathname = usePathname()

    const handleNavClick = (href: string) => {
        if (pathname === href) {
            router.refresh()
        } else {
            router.push(href);
        }

        setOpen(false);
    }

    const balanceItems = Object.entries(currentBalance);

    // 🔹 Reusable Trigger UI
    const createTrigger = (icon: string, label: string) => (
        <button className=' px-2  rounded-md hover:bg-[#2e86fe]  outline-none cursor-pointer  flex flex-row data-[state=open]:opacity-50 data-[state=open]:hover:bg-transparent data-[state=open]:hover:text-link-color hover:text-white group justify-between text-[16px] py-2.5 w-full  ease-in-out transition-all duration-300 bg-white text-link-color font-medium'>
            <div className="flex gap-x-4 items-center">
                <span className={`icon icon-${icon}`} />
                <span>{label}</span>
            </div>
            <ChevronDown
                size={18}
                className="text-inherit transition-transform duration-300 group-data-[state=open]:rotate-180"
            />
        </button>
    );

    // 🔹 Reusable Content UI
    const createContent = (data: { label: string; href: string; icon: string }[]) => (
        <div className="flex flex-col gap-3">
            {data.map((item, idx) => (
                <div
                    onClick={() => handleNavClick(item.href)}
                    key={idx}
                    className="font-medium text-[16px] flex items-center gap-x-2 py-2 hover:bg-[#2e86fe] text-link-color hover:text-white rounded-md w-full transition-all"
                >
                    <span className={`icon icon-${item.icon} text-xl px-2`} />
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );

    return (
        <Sheet open={open} onOpenChange={setOpen} >
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetTitle />


            <SheetContent
                side="left"
                showCloseButton={false}
                className="  flex-1   overflow-hidden sm:overflow-auto left-0 top-0  bg-[#F1F6FE] border-none outline-none rounded-r-2xl flex flex-col"
            >

                {/* 🔹 SCROLLABLE AREA */}
                <div className="  px-4 py-6 pb-0 overflow-y-auto flex-1  sm:overflow-y-visible">

                    {/* USER */}
                    <div className="flex gap-x-3 items-center ">
                        <User />
                        <div>
                            <span className="text-sm font-medium text-black">
                                Olamiji Odubote
                            </span>
                            <span className="text-sm text-zinc-500 block">
                                oduboteolamiji@gmail.comss
                            </span>
                        </div>
                    </div>

                    {/* NAV LINKS */}
                    <div className="pt-5 sm:pt-12 flex flex-col gap-3">
                        {navLinks.map((item, idx) => (
                            <div
                                onClick={() => handleNavClick(item.href)}
                                key={idx}
                                className="font-medium text-[16px] flex items-center gap-x-2 py-2 hover:bg-[#2e86fe] active:bg-[#2e86fe] text-link-color hover:text-white rounded-md w-full transition-all"
                            >
                                <span
                                    className={`icon-pds icon-${item.icon} text-xl px-2`}
                                />
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* COLLAPSIBLES */}
                    <div className="flex flex-col gap-y-2 mt-3">
                        <CollapsibleAction
                            open={isAccountCollapsed}
                            setOpen={setIsAccountCollapsed}
                            buttonChildren={createTrigger("account", "Account")}
                            contentChildren={createContent(AccountCollapsibeLinks)}
                        />

                        <CollapsibleAction
                            open={isToolCollapsed}
                            setOpen={setIsToolCollapsed}
                            buttonChildren={createTrigger("tools", "Tools")}
                            contentChildren={createContent(ToolCollapsibeLinks)}
                        />

                        <CollapsibleAction
                            open={isHelpCollapsed}
                            setOpen={setIsHelpCollapsed}
                            buttonChildren={createTrigger("help", "Help")}
                            contentChildren={createContent(HelpCollapsibeLinks)}
                        />

                        <CollapsibleAction
                            open={isSettingsCollapsed}
                            setOpen={setIsSettingsCollapsed}
                            buttonChildren={createTrigger("settings", "Settings")}
                            contentChildren={createContent(SettingsCollapsibeLinks)}
                        />

                        {/* OTHER LINKS */}
                        <div className="py-2 flex flex-col gap-3">
                            {OtherNavLinks.map((item, idx) => (
                                <Link
                                    href={item.href}
                                    key={idx}
                                    className="font-medium text-[16px] flex items-center gap-x-2 py-2 hover:bg-[#2e86fe] text-link-color hover:text-white rounded-md w-full transition-all"
                                >
                                    <span className={`icon icon-${item.icon} text-xl px-2`} />
                                    <span>{item.label}</span>
                                </Link>
                            ))}

                        </div>

                    </div>
                </div>

                <div className="w-full sm:overflow-hidden  sm:sticky  right-0 left-0  shrink-0   bg-[#2c3a4d]  bottom-0 rounded-rb-full flex flex-col items-center justify-center p-4 pb-2">
                    <Link href="/profile/default/deposit" className="bg-medium-blue cursor-pointer hover:opacity-90 duration-300 py-2 px-6  flex  flex-row gap-x-4  items-center justify-center rounded-full border border-transparent w-full text-white ">
                        <span className="icon icon-add-funds text-[1.5rem] md:text-3xl" />
                        <span className='text-md sm:text-lg lg:text-xl font-semibold'> Add Funds</span>
                    </Link>

                    <div className="flex flex-col gap-y-3 items-start w-full my-3 shrink-0">
                        {balanceItems.map(([Key, value], idx) => (
                            <div key={idx} className="w-full  text-[#d4d4d4] text-sm font-medium flex flex-row gap-x-3 justify-between items-center">
                                <span className="capitalize text-[17px]"> {Key} </span>

                                <div className="w-full mt-1 h-[1px] bg-[repeating-linear-gradient(to_right,_#d4d4d4_0,_#d4d4d4_4px,_transparent_4px,_transparent_8px)]" />
                                <div className="flex flex-row gap-x-1 items-center">
                                    <span className=" text-white text-[15px] font-medium tracking-wide"> £{value.toFixed(2)} </span>
                                    <span className="icon-info icon-pds   text-xl" />
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet >
    );
};

export default Sidebarsheet;