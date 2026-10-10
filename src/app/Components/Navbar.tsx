"use client";

import Image from 'next/image';
import logo from '../assets/logo-icon.png'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import NavBtn from './NavBtn';

const Navbar = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(new Date().toLocaleDateString("bn-BD", {
      dateStyle: "full"
    }));
  }, []);

// console.log(date);
    return (
        <div className='mt-3 '>
            <section className='flex items-center justify-between container mx-auto px-4 md:px-0'>
                <Link href="/">
                <div className='flex gap-2 md:gap-4 items-center'>
                    <div className="shrink-0">
                        <Image src={logo} height={40} width={60} alt="Logo" className='bg-green-700 rounded-xl md:rounded-2xl p-2 md:p-4 w-12 md:w-[30px] h-auto md:box-content'/>
                    </div>

                    <div className='flex flex-col gap-0 md:gap-1'>
                        <h1 className='font-bold text-xl md:text-2xl leading-tight'>বাজার দর</h1>
                        <p className='text-[11px] md:text-base text-gray-700' suppressHydrationWarning>{date}</p>
                    </div>
                </div>
                </Link>

                <div className="shrink-0">
                    <NavBtn/>
                </div>
            </section>
        </div>
    );
};

export default Navbar;