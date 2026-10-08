import React from "react";
const bnNumbers: Record<string, string> = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
  ".": ".",
};

const toBnNum = (num: number | string) =>
  num
    .toString()
    .split("")
    .map((c) => bnNumbers[c] || c)
    .join("");

const ProductsDetailsPage = async ({ params }) => {
  const { ProductId } = await params;
  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${ProductId}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch product details page");
  }
  const data = await res.json();
  const market = data.markets;
  //   console.log(market);

  const findMinPrice = market.reduce((a, b) => {
    return b.min < a.min ? b : a;
  });
  const findMaxPrice = market.reduce((a, b) => {
    return b.max > a.max ? b : a;
  });

  const average = (findMinPrice.min + findMaxPrice.max) / 2;

  console.log(findMinPrice.min);
  console.log(findMaxPrice.max);
  console.log(average);
  return (
    <>
      <section className="container mx-auto">
        {/* 1st card */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm mt-9">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            {/* Product Image */}
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f2f6f3] text-3xl">
              {data.image}
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-xl font-bold text-gray-800">{data.nameBn}</h1>

              <p className="text-xs text-gray-500">
                প্রতি {data.unit === "kg" ? "কেজি" : data.unit} ·{" "}
                {data.categoryNameBn}
              </p>

              <p className="mt-1 text-xs text-gray-600">
                গতকালের তুলনায় আজ দাম{" "}
                {data.today > data.yesterday ? (
                  <span className="font-semibold text-gray-800">বেড়েছে</span>
                ) : (
                  <span className="font-semibold text-gray-800">কমেছে</span>
                )}{" "}
                · {toBnNum(Math.abs(data.today - data.yesterday))} টাকা
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex min-w-[75px] flex-col items-center rounded-xl bg-[#f2f6f3] px-3 py-2">
            <p className="text-[9px] text-gray-500">আজকের দাম</p>

            <h1 className="text-xl font-bold text-gray-800">
              {toBnNum(data.today)}
            </h1>

            <p className="text-[10px] text-gray-500">
              টাকা / {data.unit === "kg" ? "কেজি" : data.unit}
            </p>

            <p
              className={
                data.change.dir === "up"
                  ? "mt-1 text-[10px] font-semibold text-red-500"
                  : "mt-1 text-[10px] font-semibold text-green-500"
              }
            >
              {data.change.dir === "up" ? "▲" : "▼"} {toBnNum(data.change.pct)}%
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto shadow-sm rounded-xl border border-gray-200 bg-white px-4 py-3 mt-6">
        <h1 className="font-semibold mb-3 text-xl">দামের সারসংক্ষেপ</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Minimum */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col gap-2">
            <p className="text-sm text-gray-600">সর্বনিম্ন দাম</p>

            <h1 className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-green-600">
                {toBnNum(findMinPrice.min)}
              </span>
              <span className="text-sm text-green-600">টাকা</span>
            </h1>

            <span className="text-sm text-gray-600">
              সবচেয়ে কম দামের বাজার
            </span>
          </div>

          {/* Maximum */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col gap-2">
            <p className="text-sm text-gray-600">সর্বাধিক দাম</p>

            <h1 className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-red-500">
                {toBnNum(findMaxPrice.max)}
              </span>
              <span className="text-sm text-red-500">টাকা</span>
            </h1>

            <span className="text-sm text-gray-600">
              সবচেয়ে বেশি দামের বাজার
            </span>
          </div>

          {/* Average */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col gap-2">
            <p className="text-sm text-gray-600">গড় দাম</p>

            <h1 className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-green-600">
                {toBnNum(average)}
              </span>
              <span className="text-sm text-green-600">টাকা</span>
            </h1>

            <span className="text-sm text-gray-600">প্রতি কেজি-এর হিসাবে</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsDetailsPage;
