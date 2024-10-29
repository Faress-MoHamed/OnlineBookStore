import toast from "react-hot-toast";
import Images from "../../assets/books/ImportImages";
import { useAppDispatch } from "../../redux/hooks/reduxhooks";
import { addItemToCart } from "../../redux/slices/cartSlice";
import { cn } from "../../utils/cn";
import { getRndInteger } from "../../utils/RandomNumber";
import type { Book, ViewMode } from "../control-bar/ControlBar.types";
import styles from "./bookCard.module.css";
import { useMemo } from "react";
export function BookCard({
	book,
	viewMode,
}: {
	book: Book;
	viewMode?: ViewMode;
}) {
	const { name, author, price, image, description } = book;
	const RandomImage = useMemo(
		() => getRndInteger(0, Images.length),
		[Images.length]
	);
	const dispate = useAppDispatch();
	const handleAddToCart = ({ book }: { book: Book }) => {
		dispate(addItemToCart({ ...book, quantity: 1 }));
		toast.success(`${name} add to cart successfully`);
	};

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
					`${viewMode !== "grid" && viewMode ? "flex w-full gap-7" : ""}`
				)}
			>
				<div
					className={cn(
						styles.bookCard,
						"h-[400px]",
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
					<button
						onClick={() => {
							handleAddToCart({ book });
						}}
						className={styles.bookCardbtn}
					>
						add to cart
					</button>
				</div>
				<div
					className={cn(
						"flex flex-col  justify-center gap-0",
						`${
							viewMode === "list"
								? "w-[40%] gap-3"
								: viewMode === "grid"
								? "w-full"
								: "w-60"
						}`
					)}
				>
					<div
						className={cn(
							"p-4",
							"flex flex-col ",
							`${
								viewMode === "list"
									? "p-0 gap-4"
									: viewMode === "grid"
									? "px-0"
									: "px-0"
							}`
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
