"use client";
import React, { useState } from 'react';
import Header from '@/components/shared/header';
import Image from "next/image";
import Link from "next/link";


interface TemplateInputProps {
    header: string;
    content?: string;
}

const PageTemplate = ({ header, content }: TemplateInputProps) => {
    return (

        <div className='relative  overflow-hidden px-2 flex flex-col gap-4  items-center justify-center h-full '>
            <Image
                src="/asset/images/empty-screen.svg"
                alt="Empty state"
                width={200}
                height={200}
                className="  object-contain w-[50%] h-30  "
            />

            <h4 className='text-[19px] text-link-color  tracking-tight font-medium '> {header} </h4>
            {content && (
                <p className='text-black text-[16px] font-normal leading-6 text-center'> {content}</p>
            )}

            <Link href="/profile/default/trade" className=' font-medium bg-transaparent px-4 py-1 cursor-pointer flex items-center justify-center rounded-full border border-[rgb(210,227,252)] hover:bg-medium-blue ease-in-out transition-colors duration-300 hover:text-white active:bg-medium-blue'>
                Go To Trade Screen
            </Link>

        </div>

    )
}

export default PageTemplate;
