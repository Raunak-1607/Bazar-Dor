import React from 'react';
import ProductCard from './ProductCard';
interface Products{
    image:string,
    nameBn:string,
    today:number,
    change:{
        dir:string,
        pct:number
    }
}
const HomeProducts = async() => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
    if(!res.ok){
        throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    
    const priceUpProducts = data.filter((pr:Products)=> pr.change.dir == "up");
    const priceDownProducts = data.filter((pr:Products)=> pr.change.dir == "down");
    return <>
    <div className='container mx-auto flex gap-2 mt-7 items-center'>

    <span className='text-red-600 '>▲</span><h1 className='font-bold text-2xl'>আজ দাম বেড়েছে</h1>
    </div>
    <div className='container mx-auto mt-3 grid grid-cols-3 gap-4'>
        
        {
          priceUpProducts.map((up:Products , index:number) => <ProductCard key={index} up={up}/>)
        }
    </div>
    <div className='container mx-auto flex gap-2 mt-7 items-center'>
        <span className='text-green-600 '>▲</span><h1 className='font-bold text-2xl'>আজ দাম কমেছে</h1>
    </div>
    <div className='container mx-auto mt-3 grid grid-cols-3 gap-4'>
        {
           priceDownProducts.map((down:Products , index:number) => <ProductCard key={index} down={down}/>)  
        }
    </div>

    <div  className='container mx-auto flex flex-col gap-2 mt-7 '>
        <span className='font-bold text-2xl'>সব পণ্য</span>
        <p className=' text-base leading-7 text-gray-500'>{`মোট ${data.length}টি পণ্য দেখানো হচ্ছে`}</p>
    </div>
    <div className='container mx-auto mt-3 grid grid-cols-3 gap-4'>
        {
            data.map((all:Products , index:number) => <ProductCard key={index} all={all}/>)
        }
    </div>
    
    </>
};

export default HomeProducts;