"use client";

import React, { useEffect, useState } from "react";

type Product = {
	product_id: string;
	product_name: string;
	category_name?: string;
	price?: string | number;
	img_url?: string;
};

export default function ProductsPage() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// 🔹 ดึงข้อมูลจาก API
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await fetch(
					"https://nalongview.codelao.com/pages/api/get_products.php"
				);
				if (!res.ok) throw new Error("Error fetching products");
				const data = await res.json();
				setProducts(data);
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

		fetchProducts();
	}, []);

	// ✅ ฟังก์ชันจัดการรูปภาพ fallback
	const getImageUrl = (url?: string) => {
		if (!url) return "/no-image.png";
		const cleanPath = url.replace("../", "");
		return `https://nalongview.codelao.com/pages/${cleanPath}`;
	};

	return (
		<main
			style={{
				padding: "2rem",
				fontFamily: "'Noto Sans Lao', sans-serif",
				backgroundColor: "#fafafa",
				minHeight: "100vh",
			}}
		>
			<h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
				🛍️ ລາຍການສິນຄ້າ
			</h1>
			<p style={{ textAlign: "center", color: "#666", marginBottom: "2rem" }}>
				ສິນຄ້າທັງໝົດຈາກລະບົບ
			</p>

			{loading && (
				<p style={{ textAlign: "center" }}>⏳ ກຳລັງໂຫຼດຂໍ້ມູນ...</p>
			)}

			{error && (
				<p style={{ textAlign: "center", color: "red" }}>❌ {error}</p>
			)}

			{!loading && !error && products.length > 0 && (
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
						gap: "1rem",
					}}
				>
					{products.map((p) => (
						<div
							key={p.product_id}
							style={{
								background: "white",
								borderRadius: "12px",
								boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
								padding: "1rem",
								textAlign: "center",
								transition: "transform 0.2s ease",
							}}
							onMouseEnter={(e) =>
								(e.currentTarget.style.transform = "scale(1.03)")
							}
							onMouseLeave={(e) =>
								(e.currentTarget.style.transform = "scale(1.0)")
							}
						>
							{/* ✅ รูปสินค้า */}
							<img
								src={encodeURI(getImageUrl(p.img_url))}
								alt={p.product_name}
								loading="lazy"
								decoding="async"
								style={{
									width: "100%",
									height: "160px",
									objectFit: "cover",
									borderRadius: "8px",
									marginBottom: "0.75rem",
								}}
								onError={(e) =>
									(e.currentTarget.src = "/no-image.png")
								}
							/>

							<h3
								style={{
									marginBottom: "0.5rem",
									fontSize: "1.1rem",
									fontWeight: "600",
								}}
							>
								{p.product_name}
							</h3>

							<p style={{ color: "#666", fontSize: "0.9rem" }}>
								{p.category_name || "ບໍ່ມີຫມວດຫມູ່"}
							</p>

							<p
								style={{
									fontWeight: "bold",
									marginTop: "0.5rem",
									color: "#ff6600",
								}}
							>
								💰 {Number(p.price || 0).toLocaleString()} ₭
							</p>

							<button
								style={{
									marginTop: "0.75rem",
									background: "#0070f3",
									color: "white",
									border: "none",
									padding: "0.5rem 1rem",
									borderRadius: "6px",
									cursor: "pointer",
								}}
								onClick={() => alert(`ເພີ່ມສິນຄ້າ: ${p.product_name}`)}
							>
								🛒 ເພີ່ມໃສ່ກະຕ່າ
							</button>
						</div>
					))}
				</div>
			)}

			{!loading && !error && products.length === 0 && (
				<p style={{ textAlign: "center" }}>❌ ບໍ່ພົບສິນຄ້າ</p>
			)}
		</main>
	);
}
