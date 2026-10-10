
import Link from "next/link";
import { FaArrowLeft, FaHouse, FaMagnifyingGlass } from "react-icons/fa6";
 
export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#F0F5F1] px-4 py-12">
      <div className="w-full max-w-xl text-center">
        {/* 404 Illustration */}
        <div className="relative mx-auto mb-6 flex h-44 w-44 items-center justify-center rounded-full bg-green-100">
          <FaMagnifyingGlass className="text-7xl text-green-700" />

          <span className="absolute -right-2 -top-1 rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600">
            404
          </span>
        </div>

        {/* Heading */}
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-green-700">
          Page Not Found
        </p>

        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          এই পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-gray-600">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে,
          ঠিকানা পরিবর্তন হয়েছে অথবা পেজটি আর উপলব্ধ নেই।
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-md"
          >
            <FaHouse />
            হোম পেজে ফিরে যান
          </Link>

         
        </div>

        {/* Footer note */}
        <p className="mt-10 text-sm text-gray-500">
          BazarDor — আপনার প্রতিদিনের বাজারের বিশ্বস্ত সঙ্গী।
        </p>
      </div>
    </main>
  )
}