import { Suspense } from "react";
import CategoryNav from "./CategoryNav";

interface Category {
  id: string;
  nameBn: string;
  icon: string;
}

const Category = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
    {
      cache: "force-cache",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();

  return (
    <Suspense fallback={<div className="container mx-auto mt-6 h-10 px-4" />}>
      <CategoryNav categories={data} />
    </Suspense>
  );
};

export default Category;
