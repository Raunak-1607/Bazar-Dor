"use client";

import Image from 'next/image';
import logo from '../assets/logo-icon.png'
import Link from 'next/link';
import { useState, useEffect } from 'react';

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

                <div className='flex gap-3 items-center'>
                    <button className='btn font-bold py-4  rounded-box'>সাইন ইন</button>
                    <button className='btn font-bold bg-green-600 hover:bg-green-800 text-white py-4 rounded-box'>সাইন আপ</button>
                </div>
            </section>
        </div>
    );
};

export default Navbar;