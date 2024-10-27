import { ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
import styles from "../Hero/pagination.module.css";
import "../Hero/SwiperPagination.css";
import { BookCard } from "../BookCard/BookCard";

const books = [
	{
		title: "Simple Way Of Peace Life",
		author: "Armor Ramsey",
		price: 40.0,
		imageUrl: "/placeholder.svg?height=300&width=200",
	},
	{
		title: "Simple Way Of Peace Life",
		author: "Armor Ramsey",
		price: 40.0,
		imageUrl: "/placeholder.svg?height=300&width=200",
	},
	{
		title: "Simple Way Of Peace Life",
		author: "Armor Ramsey",
		price: 40.0,
		imageUrl: "/placeholder.svg?height=300&width=200",
	},
	{
		title: "Simple Way Of Peace Life",
		author: "Armor Ramsey",
		price: 40.0,
		imageUrl: "/placeholder.svg?height=300&width=200",
	},
	{
		title: "Simple Way Of Peace Life",
		author: "Armor Ramsey",
		price: 40.0,
		imageUrl: "/placeholder.svg?height=300&width=200",
	},
	{
		title: "Simple Way Of Peace Life",
		author: "Armor Ramsey",
		price: 40.0,
		imageUrl: "/placeholder.svg?height=300&width=200",
	},
	{
		title: "Simple Way Of Peace Life",
		author: "Armor Ramsey",
		price: 40.0,
		imageUrl: "/placeholder.svg?height=300&width=200",
	},
	{
		title: "Simple Way Of Peace Life",
		author: "Armor Ramsey",
		price: 40.0,
		imageUrl: "/placeholder.svg?height=300&width=200",
	},
	{
		title: "Simple Way Of Peace Life",
		author: "Armor Ramsey",
		price: 40.0,
		imageUrl: "/placeholder.svg?height=300&width=200",
	},
	// Add more book items as needed
];

export default function NewReleaseBooks() {
	return (
		<section className="bg-pink-50 py-12 px-4 md:px-8 relative">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-8">
					<p className="text-sm text-muted-foreground uppercase mb-2">
						Some Quality Items
					</p>
					<h2 className="text-3xl md:text-4xl font-bold text-[#393280]">
						New Release Books
					</h2>
				</div>
				<Swiper
					modules={[Pagination]}
					slidesPerView={1}
					spaceBetween={20}
					pagination={{
						el: "div.swiper-pagination",
						clickable: true,
						bulletClass: styles["custom-bullet"],
						bulletActiveClass: styles["custom-bullet-active"],
					}}
					breakpoints={{
						640: { slidesPerView: 2 },
						768: { slidesPerView: 3 },
						1024: { slidesPerView: 4 },
					}}
					className="mb-8"
				>
					{books.map((book, index) => (
						<SwiperSlide className="flex justify-center items-center" key={index}>
							<BookCard {...book} />
						</SwiperSlide>
					))}
					<div className="bg-[#E0E0E0] h-[1px] w-full flex justify-center items-center my-4 "></div>
					<div className="flex justify-between md:flex-row flex-col items-center relative  gap-6 h-10">
						<div className="w-full text-center">
							<div className="swiper-pagination relative"></div>
						</div>
						<a
							href="#"
							className="inline-flex items-center text-[#393280] hover:underline md:absolute md:right-0"
						>
							View All Products
							<ChevronRight className="ml-1 h-4 w-4" />
						</a>
					</div>
				</Swiper>
			</div>
		</section>
	);
}
