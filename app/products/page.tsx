"use client";
import React, { useEffect, useState } from "react";

export default function ProductsPage() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// 🔹 ดึงข้อมูลจาก API
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await fetch("https://nalongview.codelao.com/pages/api/get_products.php");
				if (!res.ok) throw new Error("Error fetching products");
				const data = await res.json();
				setProducts(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	return (
		<main
			style={{
				padding: "2rem",
				fontFamily: "'Noto Sans Lao', sans-serif",
				backgroundColor: "#fafafa",
				minHeight: "100vh",
			}}
		>
			<h1 style={{ textAlign: "center", marginBottom: "1rem" }}>🛍️ Product List</h1>
			<p style={{ textAlign: "center", color: "#666", marginBottom: "2rem" }}>
				แสดงรายการสินค้าทั้งหมดจากระบบ
			</p>

			{loading && <p style={{ textAlign: "center" }}>⏳ กำลังโหลดข้อมูล...</p>}
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
							onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
							onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
						>
							{/* รูปสินค้า (ถ้ามีใน API) */}
							{p.image && (
								<img
									src={p.image}
									alt={p.product_name}
									style={{
										width: "100%",
										height: "160px",
										objectFit: "cover",
										borderRadius: "8px",
										marginBottom: "0.75rem",
									}}
								/>
							)}

							<h3 style={{ marginBottom: "0.5rem", fontSize: "1.1rem" }}>
								{p.product_name}
							</h3>
							<p style={{ color: "#666", fontSize: "0.9rem" }}>
								{p.category_name || "หมวดหมู่ไม่ระบุ"}
							</p>
							<p style={{ fontWeight: "bold", marginTop: "0.5rem" }}>
								💰 {parseFloat(p.price || 0).toLocaleString()} ກີບ
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
								onClick={() => alert(`คุณเลือกสินค้า: ${p.product_name}`)}
							>
								🛒 เพิ่มลงตะกร้า
							</button>
						</div>
					))}
				</div>
			)}

			{!loading && !error && products.length === 0 && (
				<p style={{ textAlign: "center" }}>ไม่พบสินค้า</p>
			)}
		</main>
	);
}
