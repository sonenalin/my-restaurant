"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function OrderDetailPage() {
	const { id } = useParams(); // ✅ ดึง product_id จาก URL
	const [product, setProduct] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const res = await fetch(
					`https://nalongview.codelao.com/pages/api/get_products.php?product_id=${id}`
				);
				const data = await res.json();
				if (data.length > 0) setProduct(data[0]);
			} catch (error) {
				console.error("Error loading product:", error);
			} finally {
				setLoading(false);
			}
		};

		if (id) fetchProduct();
	}, [id]);

	if (loading)
		return (
			<div className="text-center mt-20 text-gray-500 text-lg">
				⏳ ກຳລັງໂຫຼດຂໍ້ມູນ...
			</div>
		);

	if (!product)
		return (
			<div className="text-center mt-20 text-red-500 text-lg">
				❌ ບໍ່ພົບສິນຄ້າ ID: {id}
			</div>
		);

	const getImageUrl = (url: string) => {
		if (!url) return "/no-image.png";
		const cleanPath = url.replace("../", "");
		return `https://nalongview.codelao.com/pages/${cleanPath}`;
	};

	return (
		<main className="container mx-auto px-4 py-10 font-lao">
			<div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6">
				<div className="w-full h-64 overflow-hidden rounded-lg mb-4">
					<img
						src={getImageUrl(product.img_url)}
						alt={product.product_name}
						className="w-full h-full object-cover"
					/>
				</div>

				<h1 className="text-3xl font-bold text-orange-600 mb-3">
					{product.product_name}
				</h1>

				<p className="text-xl text-green-600 font-bold mb-2">
					💰 {Number(product.price).toLocaleString()} ₭
				</p>

				<p className="text-gray-600 mb-4">ຂະໜາດ: {product.size}</p>
				<p className="text-gray-600 mb-4">ຈຳນວນໃນສາງ: {product.qty}</p>

				<div className="flex gap-4 mt-6">
					<button className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
						🛒 ເພີ່ມໃສ່ຕະກ້າ
					</button>
					<button
						onClick={() => history.back()}
						className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
					>
						🔙 ກັບໜ້າຫຼັກ
					</button>
				</div>
			</div>
		</main>
	);
}
