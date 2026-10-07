import Link from 'next/link';
import React from 'react';

interface Category{
    nameBn:string,
    icon:string
}

const Category = async() => {
  
    
        const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
      
        if(!res.ok){
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();
     
    return (
        <div className='flex flex-row gap-8 mt-4 container mx-auto'>
            {
                data.map((category:Category,index:number) =><div key={index} >
                    <ul  >
                        <Link href="/">
                        <li >{category.icon} {category.nameBn}</li>
                        </Link>
                    </ul>
                </div>)
            }
        </div>
    );

    
};

export default Category;