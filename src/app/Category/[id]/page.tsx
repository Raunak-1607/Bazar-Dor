
import CategoryProducts from '../../Components/CategoryProducts';

const bnNumbers: Record<string, string> = {
  "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
  "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯", ".": "."
};

const toBnNum = (num: number | string) => 
  num.toString().split("").map(c => bnNumbers[c] || c).join("");

const CategroyDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  
  const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products?category=${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch category details");
  }
  
  const products = await res.json();
  
  if (!products || products.length === 0) {
    return <div className="text-center mt-10 text-gray-500 font-medium">কোনো পণ্য পাওয়া যায়নি</div>;
  }

  const categoryName = products[0]?.categoryNameBn;
  const categoryIcon = products[0]?.categoryIcon;

  return (
    <div className="min-h-screen  py-10 px-4 md:px-8 font-sans container mx-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        
       
        <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f5f5f5] text-4xl shadow-inner border border-gray-100">
            {categoryIcon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{categoryName}</h1>
            <p className="text-sm text-gray-500 font-medium mt-1">{toBnNum(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
          </div>
        </div>

        
        <div className="text-sm font-medium text-gray-500">
          মোট {toBnNum(products.length)}টি পণ্য দেখানো হচ্ছে
        </div>

        <CategoryProducts products={products} />

      </div>
    </div>
  );
};

export default CategroyDetailsPage;