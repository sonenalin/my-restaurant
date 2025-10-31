"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // ✅ ไอคอน toggle จาก lucide-react

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false); // ✅ state toggle menu

	return (
		<header className="bg-orange-500 text-white shadow-md sticky top-0 z-50">
			<nav className="container mx-auto flex justify-between items-center px-6 py-4">
				{/* ✅ โลโก้ */}
				<Link
					href="/"
					className="text-2xl font-bold tracking-wide hover:opacity-90"
				>
					🍜 ຮ້ານອາຫານຄຳສອນ
				</Link>

				{/* ✅ ปุ่ม Toggle บนมือถือ */}
				<button
					className="md:hidden text-white text-3xl focus:outline-none"
					onClick={() => setMenuOpen(!menuOpen)}
				>
					{menuOpen ? <X size={28} /> : <Menu size={28} />}
				</button>

				{/* ✅ เมนูหลัก (ซ่อนในมือถือ) */}
				<div
					className={`${menuOpen ? "block" : "hidden"
						} absolute md:static top-16 left-0 w-full md:w-auto bg-orange-500 md:bg-transparent md:flex md:items-center md:space-x-6 text-lg transition-all duration-300`}
				>
					<Link
						href="/"
						className="block px-6 py-3 md:p-0 hover:text-yellow-200 transition"
						onClick={() => setMenuOpen(false)}
					>
						ຫນ້າຫຼັກ
					</Link>
					<Link
						href="/menu"
						className="block px-6 py-3 md:p-0 hover:text-yellow-200 transition"
						onClick={() => setMenuOpen(false)}
					>
						ເມນູອາຫານ
					</Link>
					<Link
						href="/orders"
						className="block px-6 py-3 md:p-0 hover:text-yellow-200 transition"
						onClick={() => setMenuOpen(false)}
					>
						ລາຍການສັ່ງຊື້
					</Link>
					<Link
						href="/report"
						className="block px-6 py-3 md:p-0 hover:text-yellow-200 transition"
						onClick={() => setMenuOpen(false)}
					>
						ລາຍງານການຂາຍ
					</Link>
				</div>
			</nav>
		</header>
	);
}
