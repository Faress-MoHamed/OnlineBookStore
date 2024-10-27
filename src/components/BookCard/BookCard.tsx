interface BookCardProps {
	title: string;
	author: string;
	price: number;
	imageUrl: string;
}
import book2 from "../../assets/book2.png";
import styles from "./bookCard.module.css";
export function BookCard({ title, author, price, imageUrl }: BookCardProps) {
	return (
		<div className="w-full max-w-[326px] relative">
			<div className="p-0">
				<div className={styles.bookCard}>
					<img
						src={book2 || imageUrl}
						alt={title}
						className="max-w-full object-cover"
					/>
					<button className={styles.bookCardbtn}>add to cart</button>
				</div>
				<div className="flex flex-col justify-center text-center">
					<div className="p-4">
						<h3 className="text-lg font-semibold text-main">{title}</h3>
						<p className="text-sm text-[400] tracking-[2%] text-[#888888]">
							{author}
						</p>
					</div>
					<span className="text-base font-[600] text-secondary">
						${price.toFixed(2)}
					</span>
				</div>
			</div>
		</div>
	);
}
