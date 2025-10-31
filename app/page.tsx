"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

export default function HomePage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  // ✅ โหลดข้อมูลเริ่มต้นจาก API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch("https://nalongview.codelao.com/pages/api/get_catgory.php"),
          fetch("https://nalongview.codelao.com/pages/api/get_products.php"),
        ]);

        const catData = await catRes.json();
        const prodData = await prodRes.json();

        setCategories(catData);
        setAllProducts(prodData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ ค้นหาสินค้าจาก API
  const fetchProducts = async (keyword = "") => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://nalongview.codelao.com/pages/api/get_products.php?product_id=${encodeURIComponent(
          keyword
        )}`
      );
      const data = await res.json();
      setAllProducts(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }

  };

  // ✅ ฟังก์ชันจัดการ URL รูปภาพ
  const getImageUrl = (url: string) => {
    if (!url) return "/no-image.png";
    const cleanPath = url.replace("../", "");
    return `https://nalongview.codelao.com/pages/${cleanPath}`;
  };

  // ✅ ฟังก์ชันกรองสินค้า (ใช้ useMemo ป้องกัน re-render)
  const filteredProducts = useMemo(() => {
    let result = allProducts;

    if (selectedCategory) {
      result = result.filter(
        (item) => Number(item.category_id) === selectedCategory
      );
    }

    if (search.trim() !== "") {
      result = result.filter((item) =>
        item.product_name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return result;
  }, [allProducts, selectedCategory, search]);

  // ✅ แสดงข้อความ error
  if (error) {
    return (
      <div className="text-center text-red-500 mt-20 text-lg">
        ❌ ຜິດພາດໃນການໂຫຼດຂໍ້ມູນ: {error}
      </div>
    );
  }

  if (loading)
    return (
      <div className="text-center text-gray-500 mt-20 text-lg animate-pulse">
        ⏳ ກຳລັງໂຫຼດຂໍ້ມູນ...
      </div>
    );

  return (
    <main className="container mx-auto px-4 py-10 font-lao">
      <h1 className="text-4xl font-bold text-orange-600 mb-6 text-center">
        🍜 ຮ້ານອາຫານຄຳສອນ
      </h1>

      {/* ✅ ช่องค้นหา */}
      <div className="flex justify-center items-center gap-2 mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchProducts(search)}
          placeholder="🔍 ຄົ້ນຫາຊື່ສິນຄ້າ ຫຼື ລະຫັດ..."
          className="border border-orange-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={() => fetchProducts(search)}
          className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          ຄົ້ນຫາ
        </button>
      </div>

      {/* ✅ ส่วนหมวดหมู่ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-orange-600 text-center">
          📦 ຫມວດຫມູ່ສິນຄ້າ
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full border transition ${selectedCategory === null
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white border-orange-400 text-orange-500 hover:bg-orange-100"
              }`}
          >
            ທັງໝົດ
          </button>

          {categories.map((cat, index) => (
            <button
              key={cat.id || index}
              onClick={() => setSelectedCategory(Number(cat.id))}
              className={`px-4 py-2 rounded-full border transition ${selectedCategory === Number(cat.id)
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white border-orange-400 text-orange-500 hover:bg-orange-100"
                }`}
            >
              {cat.category_name}
            </button>
          ))}
        </div>
      </section>

      {/* ✅ ส่วนแสดงรายการสินค้า */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-orange-600 text-center">
          🛍️ ລາຍການສິນຄ້າ
        </h2>

        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item, index) => (
              <div
                key={item.product_id || index}
                className="border rounded-xl bg-white shadow hover:shadow-lg transition p-3"
              >
                <div className="relative w-full h-44 mb-3 overflow-hidden rounded-lg">
                  <img
                    src={encodeURI(getImageUrl(item.img_url))}
                    alt={item.product_name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => (e.currentTarget.src = "/no-image.png")}
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {item.product_name}
                </h3>

                {item.product_name_en && (
                  <p className="text-gray-500 text-sm truncate">
                    {item.product_name_en}
                  </p>
                )}

                <p className="text-orange-600 font-bold mt-2">
                  {item.price
                    ? Number(item.price).toLocaleString() + " ₭"
                    : "—"}
                </p>

                <Link
                  href={`/orders/${item.product_id}`}
                  className="mt-3 block text-center bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                >
                  ສັ່ງຊື້
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            ❌ ບໍ່ພົບສິນຄ້າທີ່ກົງກັບຄຳຄົ້ນຫາ
          </p>
        )}
      </section>
    </main>
  );
}
