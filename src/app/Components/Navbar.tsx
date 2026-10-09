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
            <section className='flex justify-between container mx-auto'>
                <Link href="/">
                <div className='flex gap-2 items-center'>
                    <div >

                    <Image src={logo} height={40} width={60} alt="Logo" className='bg-green-700 rounded-2xl p-4'/>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <h1 className='font-bold text-2xl'>বাজার দর</h1>
                        <p suppressHydrationWarning>{date}</p>
                    </div>
                </div>
                </Link>

                <NavBtn/>
            </section>
        </div>
    );
};

export default Navbar;