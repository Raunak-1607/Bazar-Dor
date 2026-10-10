import React from 'react';

const Footer = () => {
    return (
        <div className='bg-white w-full mt-6 py-4'>

        <div className='flex flex-col md:flex-row justify-between items-center container mx-auto gap-2 md:gap-0 min-h-[80px] px-4 md:px-0 text-center md:text-left'>
            <h1 className='text-xs md:text-[14px] text-gray-600'>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</h1>
            <h1 className='text-xs md:text-[14px] text-gray-600'>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</h1>
        </div>
        </div>
    );
};

export default Footer;