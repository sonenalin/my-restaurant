"use client";
import React, { useEffect, useState } from "react";

export default function CategoryPage() {
	const [categories, setCategories] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await fetch("https://nalongview.codelao.com/pages/api/get_catgory.php");
				if (!res.ok) throw new Error("Error fetching categories");
				const data = await res.json();
				setCategories(data);
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
		fetchCategories();
	}, []);

	return (
		<main className="min-h-screen bg-gray-100 p-6 font-sans">
			<h1 className="text-3xl font-bold text-blue-600 text-center mb-4">
				📦 Category List
			</h1>

			{loading && <p className="text-center text-gray-600">⏳ Loading...</p>}
			{error && <p className="text-center text-red-500">❌ {error}</p>}

			{!loading && !error && categories.length > 0 && (
				<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{categories.map((cat) => (
						<div
							key={cat.category_id}
							className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all cursor-pointer"
						>
							<h3 className="text-xl font-semibold mb-1 text-gray-800">
								{cat.category_name}
							</h3>
							<p className="text-gray-500">ID: {cat.category_id}</p>
						</div>
					))}
				</div>
			)}

			{!loading && !error && categories.length === 0 && (
				<p className="text-center text-gray-600">No categories found.</p>
			)}
		</main>
	);
}
