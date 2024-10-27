import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import styles from "../Hero/pagination.module.css";
import "../Hero/SwiperPagination.css";
import FeaturedBookCard from "./FeaturedBookCard";
import { MoveLeft, MoveRight } from "lucide-react";

interface Book {
	title: string;
	author: string;
	description: string;
	price: number;
	coverImage: string;
}

const books: Book[] = [
	{
		title: "Birds Gonna Be Happy",
		author: "Timbur Hood",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac.",
		price: 45.0,
		coverImage: "/placeholder.svg?height=600&width=400",
	},
	{
		title: "Birds Gonna Be Happy",
		author: "Timbur Hood",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac.",
		price: 45.0,
		coverImage: "/placeholder.svg?height=600&width=400",
	},
	{
		title: "Birds Gonna Be Happy",
		author: "Timbur Hood",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac.",
		price: 45.0,
		coverImage: "/placeholder.svg?height=600&width=400",
	},
	// Add more books here...
];

export default function FeaturedBook() {
	return (
		<section className="flex items-center space-x-4 bg-custom-gradient">
			<Swiper
				modules={[Pagination, Navigation]}
				slidesPerView={1}
				spaceBetween={20}
				pagination={{
					el: "div.swiper-pagination",
					clickable: true,
					bulletClass: styles["custom-bullet"],
					bulletActiveClass: styles["custom-bullet-active"],
				}}
				navigation={{
					prevEl: ".swiper-featurebook-prev",
					nextEl: ".swiper-featurebook-next",
				}}
				className="mb-8 w-full relative"
			>
				<button className="swiper-featurebook-prev w-10 h-10 bg-white rounded-full  items-center justify-center shadow-md text-[#ED553B] hover:bg-[#ED553B] hover:text-white transition-colors border-[1px] border-[#ED553B] absolute left-5 top-2/4 transform -translate-y-2/4 z-50 md:flex hidden">
					<MoveLeft />
				</button>
				{books.map((book, index) => (
					<SwiperSlide
						className="flex justify-center items-center py-4"
						key={index}
					>
						<FeaturedBookCard {...book} />
					</SwiperSlide>
				))}
				<button className="swiper-featurebook-next w-10 h-10 bg-white rounded-full items-center justify-center shadow-md text-[#ED553B] hover:bg-[#ED553B] hover:text-white transition-colors border-[1px] border-[#ED553B] absolute right-5 top-2/4 transform -translate-y-2/4 z-50 md:flex hidden">
					<MoveRight />
				</button>
				<div className="flex justify-between items-center relative gap-6 my-4 h-10">
					<div className="swiper-pagination relative w-full text-center"></div>
				</div>
			</Swiper>
		</section>
	);
}
