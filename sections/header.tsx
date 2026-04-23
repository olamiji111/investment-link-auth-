'use client';
import React, { useState } from 'react'
import Image from "next/image";
import { PlusBotLogo } from '@/components/icons/icons';
import Link from 'next/link';
import { Select, SelectItem, SelectLabel, SelectContent, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { ArrowDown } from 'lucide-react';
import { Languages } from '@/constants';


type LanguageType = typeof Languages[number];

const Header = () => {
  const [language, setLanguage] = useState<LanguageType>("English");
  return (
    <header className='fixed bg-white top-0 border-b w-full border-zinc-300  transition-all z-40'>
      <div className='max-w-full py-3 px-4 sm:px-5 lg:px-6 flex flex-row items-center justify-between w-full'>
        <Link href="http://localhost:3001" aria-label='NorthBridge Investment Home page' className=' flex items-center   cursor-pointer flex-row  -space-x-7  duration-300 hover:-translate-z-0.5 active:translate-0.5'>
          <PlusBotLogo />
        </Link>
        <div className="relative w-[150px]">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as LanguageType)}
            className="appearance-none w-full cursor-pointer rounded-md bg-transparent border border-zinc-400 py-1 pl-3  text-sm font-normal hover:bg-zinc-50 focus:outline-none"
          >
            {Languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
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
    </header>
  )
}

export default Header;
