interface BookCardProps {
	name: string;
	author: string;
	price: number;
	description: string;
	image: string;
	viewMode: ViewMode;
}
import Images from "../../assets/books/ImportImages";
import { cn } from "../../utils/cn";
import { getRndInteger } from "../../utils/RandomNumber";
import type { ViewMode } from "../control-bar/ControlBar.types";
import styles from "./bookCard.module.css";
export function BookCard({
	name,
	author,
	price,
	image,
	viewMode,
	description,
}: BookCardProps) {
	const RandomImage = getRndInteger(0, Images.length);

	return (
		<div
			className={cn(
				"w-full max-w-[326px] relative",
				`${viewMode === "list" && "max-w-full"}`
			)}
		>
			<div
				className={cn(
					"p-0 ",
					`${viewMode !== "grid" ? "flex w-full gap-7" : ""}`
				)}
			>
				<div
					className={cn(
						styles.bookCard,
						"md:h-[400px]",
						`${viewMode === "list" && "h-[250px] w-[60%]"}`
					)}
				>
					<img
						src={Images[RandomImage] || image}
						alt={name}
						className={cn("max-w-full object-fill")}
					/>
					<div
						className={cn(
							styles.overlay,
							"bg-black/20 h-full w-full left-0 top-[500px] absolute duration-300"
						)}
					></div>
					<button className={styles.bookCardbtn}>add to cart</button>
				</div>
				<div
					className={cn(
						"flex flex-col gap- justify-center text-center gap-0",
						`${viewMode === "list" && "w-[40%] gap-3"}`
					)}
				>
					<div
						className={cn(
							"p-4",
							"flex flex-col ",
							`${viewMode === "list" && "p-0 gap-4"}`
						)}
					>
						<p className="text-sm text-[400] tracking-[2%] text-[#888888]">
							by :{author}
						</p>
						<h3
							className={cn(
								"text-lg font-semibold text-main",
								`${viewMode === "list" && "text-sm"}`
							)}
						>
							{name}
						</h3>
						<p className="text-sm font-[400] tracking-[2%] text-[#888888] overflow-hidden whitespace-nowrap text-ellipsis">
							{description}
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. At
							dignissimos asperiores, eum alias error quam libero adipisci non
							quos unde?
						</p>
					</div>
					<span
						className={cn("text-base font-[600] text-secondary", "text-xl")}
					>
						${price.toFixed(2)}
					</span>
				</div>
			</div>
		</div>
	);
}
