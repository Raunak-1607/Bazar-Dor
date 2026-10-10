import React from "react";

export const instant = false;

  interface Market{
    market:string,
    division:string,
    min:number,
    max:number;
  }

const ProductsDetailsPage = async ({ params } : { params: Promise<{ ProductId: string }> }) => {
  const { ProductId } = await params;
  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${ProductId}`, {
      cache: "force-cache",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch product details page");
  }
  const data = await res.json();
  const market = data.markets;
  //   console.log(market);

  const findMinPrice = market.reduce((a: Market, b: Market) => {
    return b.min < a.min ? b : a;
  });
  const findMaxPrice = market.reduce((a: Market, b: Market) => {
    return b.max > a.max ? b : a;
  });

  const average = (findMinPrice.min + findMaxPrice.max) / 2;

  console.log(findMinPrice.min);
  console.log(findMaxPrice.max);
  console.log(average);
  return (
    <>
      <section className="container mx-auto px-4 md:px-0">
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
                · {(Math.abs(data.today - data.yesterday)).toLocaleString("bn-BD")} টাকা
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex min-w-[75px] flex-col items-center rounded-xl bg-[#f2f6f3] px-3 py-2">
            <p className="text-[9px] text-gray-500">আজকের দাম</p>

            <h1 className="text-3xl font-bold text-gray-800">
              {(data.today).toLocaleString("bn-BD")}
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
              {data.change.dir === "up" ? "▲" : "▼"} {(data.change.pct).toLocaleString("bn-BD")}%
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto shadow-sm rounded-xl border border-gray-200 bg-white px-4 py-3 mt-6 mx-4 md:mx-auto w-[calc(100%-2rem)] md:w-full">
        <h1 className="font-semibold mb-3 text-xl">দামের সারসংক্ষেপ</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Minimum */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col gap-2">
            <p className="text-sm text-gray-600">সর্বনিম্ন দাম</p>

            <h1 className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-green-600">
                {(findMinPrice.min).toLocaleString("bn-BD")}
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
                {(findMaxPrice.max).toLocaleString("bn-BD")}
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
                {(average).toLocaleString("bn-BD")}
              </span>
              <span className="text-sm text-green-600">টাকা</span>
            </h1>

            <span className="text-sm text-gray-600">প্রতি কেজি-এর হিসাবে</span>
          </div>
        </div>

        <h1 className="font-semibold mb-3 text-xl mt-6">
          বাজারভিত্তিক আজকের দাম
        </h1>
        <div className="shadow-sm rounded-xl border border-gray-200 bg-white px-4 py-3 overflow-x-auto">
          <table className="w-full min-w-[500px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="p-3">বাজার</th>
                <th className="p-3">বিভাগ</th>
                <th className="p-3">সর্বনিম্ন</th>
                <th className="p-3">সর্বাধিক</th>
                <th className="p-3 text-right">গড়</th>
              </tr>
            </thead>

            <tbody>
              {market.map((product : Market, index: number) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 even:bg-gray-50 hover:bg-green-50"
                >
                  <td className="p-3">{product.market}</td>
                  <td className="p-3">{product.division}</td>
                  <td className="p-3">{(product.min).toLocaleString("bn-BD")} টাকা</td>
                  <td className="p-3">{(product.max).toLocaleString("bn-BD")} টাকা</td>
                  <td className="p-3 text-right font-semibold">
                    {((product.max + product.min) / 2).toLocaleString("bn-BD")}{" "}
                    টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ProductsDetailsPage;
