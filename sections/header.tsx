import React from 'react'
import Image from "next/image";
import { PlusBotLogo } from '@/components/icons/icons';
import Link from 'next/link';


const Header = () => {
  return (
    <header className='bg-transparent border-b border-zinc-400  transition-all duration-300 backdrop-blur-sm backdrop-saturate-50'>
      <div className='max-w-full py-3'>
        <Link href="https://www.plus500.com/" aria-label='NorthBridge Investment Home page' className=' flex items-baseline scale-80 sm:scale-100   cursor-pointer flex-row   gap-0  duration-300 hover:-translate-z-0.5 active:translate-0.5'>
          <PlusBotLogo />
          <span className='font-extrabold text-4xl text-[#040c29] tracking-[-0.2rem]'> BOT </span>
        </Link>
      </div>
    </header>
  )
}

export default Header;
