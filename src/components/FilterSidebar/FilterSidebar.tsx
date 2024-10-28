import { useState } from "react";
import { ChevronDown, ChevronUp, Grid3x3, Minus, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import useMobileHandler from "../../hooks/useMobileHandler";

type FilterSection = {
	title: string;
	expanded: boolean;
};

export default function FilterSidebar() {
	const [open, setOpen] = useState(false);
	const { isMobile } = useMobileHandler();
	const [minPrice, setMinPrice] = useState<string>("");
	const [maxPrice, setMaxPrice] = useState<string>("");
	const [sections, setSections] = useState<FilterSection[]>([
		{ title: "Product type", expanded: false },
		{ title: "Availability", expanded: false },
		{ title: "Brand", expanded: false },
		{ title: "Color", expanded: false },
		{ title: "Material", expanded: false },
	]);

	const toggleSection = (index: number) => {
		setSections((prevSections) =>
			prevSections.map((section, i) =>
				i === index ? { ...section, expanded: !section.expanded } : section
			)
		);
	};

	return (
		<div className="relative max-h-full">
			<button
				onClick={() => {
					setOpen(true);
				}}
				className=" mt-5 ml-5 bg-main md:hidden block"
			>
				<Grid3x3 className="w-6 h-6 text-white ring-main ring-offset-2 ring-1 rounded-sm" />
			</button>
			<div className="min-w-[280px] px-4 bg-white p-3 md:block hidden shadow-xl">
				<div className="mb-4">
					<h3 className="text-lg font-semibold mb-2">Price</h3>
					<div className="flex items-center space-x-2">
						<span className="text-gray-600">$</span>
						<input
							type="number"
							value={minPrice}
							min={0}
							onChange={(e) => setMinPrice(e.target.value)}
							className="w-20 p-1 border border-gray-300 rounded"
							placeholder="Min"
						/>
						<span className="text-gray-600">to</span>
						<span className="text-gray-600">$</span>
						<input
							type="number"
							value={maxPrice}
							onChange={(e) => setMaxPrice(e.target.value)}
							className="w-20 p-1 border border-gray-300 rounded"
							placeholder="Max"
						/>
					</div>
				</div>
				<button className="w-full bg-indigo-700 text-white py-2 rounded hover:bg-indigo-800 transition-colors">
					Filter
				</button>
				{sections.map((section, index) => (
					<div
						key={section.title}
						className="mt-4 border-t border-gray-200 pt-4"
					>
						<button
							onClick={() => toggleSection(index)}
							className="flex justify-between items-center w-full text-left"
						>
							<span className="text-lg font-semibold">{section.title}</span>
							{section.expanded ? (
								<Minus className="w-5 h-5 text-gray-500" />
							) : (
								<Plus className="w-5 h-5 text-gray-500" />
							)}
						</button>
						{section.expanded && (
							<div className="mt-2 pl-2">
								{/* Placeholder for filter options */}
								<p className="text-gray-600">Filter options go here</p>
							</div>
						)}
					</div>
				))}
			</div>
			{isMobile && open && (
				<AnimatePresence>
					<motion.div
						animate={{
							left: 0,
							transition: { duration: 0.3 },
						}}
						className="min-w-[280px] px-4 bg-white max-h-fit md:relative absolute md:left-0 left-[-1000px] md:top-0 top-30 shadow-2xl overflow-y-auto p-3 md:hidden block"
					>
						<button
							onClick={() => {
								setOpen(false);
							}}
							className=" bg-main rounded-md p-1"
						>
							<X className="text-white" />
						</button>
						<div className="mb-4">
							<h3 className="text-lg font-semibold mb-2">Price</h3>
							<div className="flex items-center space-x-2">
								<span className="text-gray-600">$</span>
								<input
									type="number"
									value={minPrice}
									onChange={(e) => setMinPrice(e.target.value)}
									className="w-20 p-1 border border-gray-300 rounded"
									placeholder="Min"
								/>
								<span className="text-gray-600">to</span>
								<span className="text-gray-600">$</span>
								<input
									type="number"
									value={maxPrice}
									onChange={(e) => setMaxPrice(e.target.value)}
									className="w-20 p-1 border border-gray-300 rounded"
									placeholder="Max"
								/>
							</div>
						</div>
						<button className="w-full bg-indigo-700 text-white py-2 rounded hover:bg-indigo-800 transition-colors">
							Filter
						</button>
						{sections.map((section, index) => (
							<div
								key={section.title}
								className="mt-4 border-t border-gray-200 pt-4"
							>
								<button
									onClick={() => toggleSection(index)}
									className="flex justify-between items-center w-full text-left"
								>
									<span className="text-lg font-semibold">{section.title}</span>
									{section.expanded ? (
										<ChevronUp className="w-5 h-5 text-gray-500" />
									) : (
										<ChevronDown className="w-5 h-5 text-gray-500" />
									)}
								</button>
								{section.expanded && (
									<div className="mt-2 pl-2">
										{/* Placeholder for filter options */}
										<p className="text-gray-600">Filter options go here</p>
									</div>
								)}
							</div>
						))}
					</motion.div>
				</AnimatePresence>
			)}
		</div>
	);
}
