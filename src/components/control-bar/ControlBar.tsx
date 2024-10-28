import { Grid, List } from "lucide-react";
import { useState } from "react";
import type { SortOption, ViewMode } from "./ControlBar.types";

export default function ControlBar({
	setSortBy,
}: {
	setSortBy: React.Dispatch<React.SetStateAction<SortOption>>;
}) {
	// Control bar state
	const [itemsPerPage, setItemsPerPage] = useState<number>(12);
	const [viewMode, setViewMode] = useState<ViewMode>("grid");

	return (
		<div className="w-full">
			{" "}
			<div className="flex flex-row flex-wrap justify-between items-center mb-6 gap-4 w-full text-[#393280] font-[600]">
				<div className="flex items-center gap-4">
					<div className="flex items-center">
						<span className="mr-2">Sort by:</span>
						<select
							defaultValue={30}
							name="sortby"
							className="focus:outline-none text-main"
							onChange={(e) => setSortBy(e.target.value as SortOption)}
						>
							<option value={"Alphabetically, A-Z"}>Alphabetically, A-Z</option>
							<option value={"Alphabetically, Z-A"}>Alphabetically, Z-A</option>
							<option value={"Price, low to high"}>Price, low to high</option>
							<option value={"Price, high to low"}>Price, high to low</option>
						</select>
					</div>
				</div>
				<span className="text-gray-600">Showing 1 - 12 of 26 result</span>
				<div className="flex items-center">
					<span className="mr-2">Show:</span>
					<select
						value={itemsPerPage}
						onChange={(e) => setItemsPerPage(Number(e.target.value))}
						className="focus:outline-none text-main"
					>
						<option value={12}>12</option>
						<option value={24}>24</option>
						<option value={36}>36</option>
					</select>
				</div>
				<div className="flex items-center gap-4 order-3">
					<div className="flex gap-2">
						<button
							onClick={() => setViewMode("grid")}
							className={`p-1 rounded ${
								viewMode === "grid" ? "bg-gray-200" : ""
							}`}
						>
							<Grid className="text-4xl" />
						</button>
						<button
							onClick={() => setViewMode("list")}
							className={`p-1 rounded ${
								viewMode === "list" ? "bg-gray-200" : ""
							}`}
						>
							<List className="text-4xl" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
