import React from "react";
 export interface Products {
  id: string | number;
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



const ProductCard = ({ up, down, all }: ProductCardProps) => {
  const product = up || down || all;

  if (!product) return null;

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_12px_rgba(0,0,0,0.12)] flex flex-col justify-between">
      {/* Image + Name */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f5f5f5] text-3xl shadow-inner border border-gray-100">
          {product.image}
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800">{product.nameBn}</h2>
          <p className="text-sm text-gray-500 font-medium">প্রতি কেজি</p>
        </div>
      </div>

      {/* Price + Change */}
      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-500 font-medium mb-1">আজকের দাম</p>

          <p className="text-2xl font-black text-gray-800">
            {(product.today).toLocaleString("bn-BD")} <span className="text-base font-normal">টাকা</span>
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-bold flex items-center gap-1 ${
            isUp
              ? "bg-red-50 text-red-500"
              : isDown
              ? "bg-green-50 text-green-500"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"} {(product.change.pct).toLocaleString("bn-BD")}%
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
