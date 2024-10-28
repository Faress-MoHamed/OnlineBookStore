import { X } from "lucide-react";
import type { Product } from "./CheckOutPage";

interface ProductsTableProps {
	products: Product[];
	onRemove: (id: number) => void;
	onQuantityChange: (id: number, newAmount: number) => void;
}

export default function ProductsTable({
	products,
	onRemove,
	onQuantityChange,
}: ProductsTableProps) {
	return (
		<div className="rounded-md overflow-x-auto bg-custom-gradient">
			<div className=" w-full sticky left-0 p-4 ">
				<h2 className="text-lg font-semibold text-main">
					Products Details
				</h2>
			</div>
			<table className="w-full text-main">
				<thead className="border-y-[1px] border-black">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
							Num
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
							Book
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
							Amount
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
							Cost
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
							Subtotal
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"></th>
					</tr>
				</thead>
				<tbody className="">
					{products.map((product, index) => (
						<tr key={product.id}>
							<td className="px-6 py-4 whitespace-nowrap text-2xl font-semibold ">
								{(index + 1).toString().padStart(2, "0")}.
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								<div className="flex items-center">
									<div className="flex-shrink-0 h-10 w-10 bg-red-500"></div>
									<div className="ml-4 text-sm font-medium text-main">
										{product.title}
									</div>
								</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								<div className="flex items-center justify-between space-x-2 text-white bg-white rounded-md p-[4px]">
									<button
										className="w-6 rounded-md bg-main flex items-center justify-center "
										onClick={() =>
											onQuantityChange(
												product.id,
												Math.max(1, product.amount - 1)
											)
										}
										aria-label={`Decrease quantity of ${product.title}`}
									>
										-
									</button>
									<span className="text-sm text-gray-900">
										{product.amount}
									</span>
									<button
										className="w-6 rounded-md bg-main flex items-center justify-center"
										onClick={() =>
											onQuantityChange(product.id, product.amount + 1)
										}
										aria-label={`Increase quantity of ${product.title}`}
									>
										+
									</button>
								</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm ">
								{product.cost.toFixed(2)} AED
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm ">
								{(product.cost * product.amount).toFixed(2)} AED
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
								<button
									onClick={() => onRemove(product.id)}
									className=" border-[2px] border-main rounded-md hover:text-white hover:bg-main transition-colors duration-200"
									aria-label={`Remove ${product.title} from cart`}
								>
									<X />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
