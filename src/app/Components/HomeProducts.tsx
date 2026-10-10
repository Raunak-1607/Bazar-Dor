import React from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
interface Products{
    id: string | number;
    image:string,
    nameBn:string,
    today:number,
    change:{
        dir:string,
        pct:number
    }
}
const HomeProducts = async() => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products" ,  {
      cache: "force-cache",
    });
    if(!res.ok){
        throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    
    const priceUpProducts = data.filter((pr:Products)=> pr.change.dir == "up");
    const priceDownProducts = data.filter((pr:Products)=> pr.change.dir == "down");
    return <>
    <div className='container mx-auto flex gap-2 mt-7 items-center px-4 md:px-0'>

    <span className='text-red-600 '>▲</span><h1 className='font-bold text-2xl'>আজ দাম বেড়েছে</h1>
    </div>
    <div className='container mx-auto mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-0'>
        
        {
          priceUpProducts.map((up:Products , index:number) => (
            <Link href={`/ProductDetails/${up.id}`} key={up.id || index}>
                <ProductCard up={up}/>
            </Link>
          ))
        }
    </div>
    <div className='container mx-auto flex gap-2 mt-7 items-center px-4 md:px-0'>
        <span className='text-green-600 '>▼</span><h1 className='font-bold text-2xl'>আজ দাম কমেছে</h1>
    </div>
    <div className='container mx-auto mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-0'>
        {
           priceDownProducts.map((down:Products , index:number) => (
            <Link href={`/ProductDetails/${down.id}`} key={down.id || index}>
                <ProductCard down={down}/>
            </Link>
           ))  
        }
    </div>

    <div  className='container mx-auto flex flex-col gap-2 mt-7 px-4 md:px-0'>
        <span className='font-bold text-2xl'>সব পণ্য</span>
        <p className=' text-base leading-7 text-gray-500'>{`মোট ${data.length}টি পণ্য দেখানো হচ্ছে`}</p>
    </div>
    <div className='container mx-auto mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-0'>
        {
            data.map((all:Products , index:number) => (
                <Link href={`/ProductDetails/${all.id}`} key={all.id || index}>
                    <ProductCard all={all}/>
                </Link>
            ))
        }
    </div>
    
    </>
};

export default HomeProducts;