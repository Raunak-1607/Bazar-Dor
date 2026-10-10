
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import hero from "../assets/bazar-hero.png";

const Hero = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
      })
    );
  }, []);
  return (
    <section className="container mx-auto mt-15 px-4 md:px-0">
      <div className="flex flex-col md:flex-row items-center justify-between rounded-3xl border border-gray-200 bg-white px-6 md:px-8 py-6 gap-6 md:gap-0">
        <div className="flex w-full md:w-[65%] flex-col gap-4">
          <span className="w-fit rounded-3xl bg-green-100 px-4 py-2 text-xs text-green-600">
            {date}
          </span>

          <h1 className="text-4xl font-bold text-gray-900">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="max-w-2xl text-base leading-7 text-gray-500">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <button className="btn w-fit rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_6px_10px_rgba(0,0,0,0.2)]">
            সব পণ্য দেখুন
          </button>
        </div>

        <div className="flex w-full md:w-[30%] justify-center">
          <Image
            src={hero}
            alt="বাজারের পণ্য"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
