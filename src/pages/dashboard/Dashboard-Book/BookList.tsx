import  { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CardsDashboard from "./CardsDashboard";
import AddBookForm from "./AddBookForm";
import { Helmet } from "react-helmet";
import { GetAllBooks } from "../../../Api/Customer/book";
import { Oval } from "react-loader-spinner";

interface BookFormData {
	name: string;
	description: string;
	author: string;
	price: string;
	// image: File | null;
	image: string;
	category: string;
}

interface BookFormResponse {
	_id: string;
	name: string;
	description: string;
	author: string;
	price: string;
	image: File | null;
	category: string;
}
const BookList = () => {
	const [products, setProducts] = useState<BookFormResponse[]>([]);
	const [formData, setFormData] = useState<BookFormData>({
		name: "",
		description: "",
		author: "",
		price: "",
		image: "",
		category: "",
	});

	const {
		data: productsData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["books"],
		queryFn: async () => {
			const res = await GetAllBooks();
			return res.data;
		},
	});

	useEffect(() => {
		if (productsData) setProducts(productsData);
		if (error) console.log("Error fetching products", error);
	}, [productsData, error]);

	return (
		<>
			<Helmet>
				<title>Products</title>
				<meta name="description" content="Products" />
			</Helmet>
			<AddBookForm formData={formData} setFormData={setFormData} />
			<div className="grid grid-cols-1 gap-6 p-6 bg-black/10 md:grid-cols-2 lg:grid-cols-3 rounded-lg shadow-md mt-10 min-h-[50vh] relative">
				{isLoading ? (
					<div className="absolute left-2/4 top-2/4 transform -translate-x-2/4 -translate-y-2/4">
						<Oval
							visible={true}
							height="80"
							width="80"
							color="#4fa94d"
							ariaLabel="oval-loading"
							wrapperStyle={{}}
							wrapperClass=""
						/>
					</div>
				) : products.length === 0 ? (
					<p>No products to display</p>
				) : (
					products?.map((product) => (
						<CardsDashboard
							key={product._id}
							product={product}
							setFormData={setFormData}
						/>
					))
				)}
			</div>
		</>
	);
};

export default BookList;
