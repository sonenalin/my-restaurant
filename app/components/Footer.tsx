export default function Footer() {
	return (
		<footer className="bg-orange-500 text-white-400 py-6 mt-8">
			<div className="container mx-auto text-center">
				<p className="text-sm">
					© {new Date().getFullYear()} ຮ້ານອາຫານຄຳສອນ 🍽️ | ທີ່ຕັ້ງ: ວຽງຈັນ, ປະເທດລາວ
				</p>
				<p className="text-xs mt-1">
					ພັດທະນາໂດຍ <span className="text-white-400 font-semibold">Khamsone Dev</span>
				</p>
			</div>
		</footer>
	);
}
