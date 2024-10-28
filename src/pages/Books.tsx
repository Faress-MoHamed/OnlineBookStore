import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
import ControlBar from "../components/control-bar/ControlBar";
import { useState } from "react";
import type { SortOption } from "../components/control-bar/ControlBar.types";

export default function Books() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [sortBy, setSortBy] = useState<SortOption>("Alphabetically, A-Z");
	console.log(sortBy);
	return (
		<>
			<div className="flex md:p-8 relative">
				<FilterSidebar />
				<div className="h-[200vh] flex flex-col w-full p-4 gap-8">
					<ControlBar setSortBy={setSortBy} />
					<div className="flex-grow"></div>
				</div>
			</div>
		</>
	);
}
