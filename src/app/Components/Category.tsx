
import CategoryNav from './CategoryNav';

interface Category{
    id: string,
    nameBn:string,
    icon:string
}

const Category = async() => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");
  
    if(!res.ok){
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();
 
    return (
        <CategoryNav categories={data} />
    );
};

export default Category;