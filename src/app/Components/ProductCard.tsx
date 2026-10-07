import React from "react";
interface Products {
  image: string;
  nameBn: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
}

interface ProductCardProps {
  up?: Products;
  down?: Products;
  all?: Products;
}

const ProductCard = ({ up, down,all }: ProductCardProps) => {
  const product = up || down || all;

  if (!product) return null;

  const isUp = product.change.dir === "up";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_12px_rgba(0,0,0,0.12)]">
      {/* Image + Name */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-2xl">
          {product.image}
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800">{product.nameBn}</h2>

          <p className="text-sm text-gray-500">প্রতি কেজি</p>
        </div>
      </div>

      {/* Price + Change */}
      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-sm text-gray-500">আজকের দাম</p>

          <p className="text-xl font-bold text-gray-800">
            {product.today} <span className="text-sm font-normal">টাকা</span>
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            isUp ? "bg-red-50 text-red-500" : "bg-green-50 text-green-500"
          }`}
        >
          {isUp ? "▲" : "▼"} {product.change.pct}%
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
