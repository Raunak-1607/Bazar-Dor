"use client";


import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Category {
    id: string;
    nameBn: string;
    icon: string;
}

const  CategoryNav = ({ categories }: { categories: Category[] })=> {
    const pathname = usePathname();

    return (
        <div className='flex flex-row flex-wrap gap-4 mt-6 container mx-auto px-4 justify-start'>
            {categories.map((category: Category, index: number) => {
                const href = `/Category/${category.id}`;
                const isActive = pathname === href;

                return (
                    <Link key={index} href={href}>
                        <div 
                            className={`flex justify-start gap-2 px-2 py-1 rounded-lg transition-colors duration-200 cursor-pointer 
                                ${isActive ? "bg-[#0b8a4f] text-white font-semibold" : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-100"}`
                            }
                        >
                            <span className="text-xl">{category.icon}</span> 
                            <span>{category.nameBn}</span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
export default  CategoryNav;