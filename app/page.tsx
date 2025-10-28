"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 text-center p-8 font-sans">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          👋 Welcome to Khamsone Shop
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          ระบบจัดการหมวดหมู่และสินค้าออนไลน์
          สร้างด้วย <span className="font-semibold text-blue-600">Next.js + Tailwind CSS</span> 🚀
        </p>

        {/* ปุ่มนำทาง */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/category"
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition"
          >
            📦 ดูหมวดหมู่สินค้า
          </Link>

          <Link
            href="/products"
            className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 transition"
          >
            🛍️ ดูรายการสินค้า
          </Link>
        </div>

        {/* ส่วนล่าง */}
        <footer className="mt-12 text-gray-400 text-sm">
          © {new Date().getFullYear()} Khamsone Store — Powered by Next.js
        </footer>
      </div>
    </main>
  );
}
