/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DeleteBook } from "../../../Api/Admin/book";

interface BookFormData {
	name: string;
	description: string;
	author: string;
	price: string;
	image: File | null;
	category: string;
}

function CardsDashboard({
	product,
	setFormData,
}: {
	product: any;
	setFormData: React.Dispatch<React.SetStateAction<BookFormData>>;
}) {
	const queryClient = useQueryClient();
	const API_URL = import.meta.env.REACT_API_URL;
	type id = string;
	const { mutate: handleDelete } = useMutation<void, Error, id>({
		mutationKey: ["books", "deletebook"],
		mutationFn: async (bookId: string) => {
			try {
				const res = await DeleteBook(bookId);
				return res;
			} catch (error: any) {
				toast.error("Error deleting book");
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["books"] });
			resetForm();
			toast("book deleted successfully", {
				icon: "👍",
				className: "border-1 border-primary-500",
			});
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const handleEdit = (product: BookFormData) => {
		setFormData({
			name: product.name,
			description: product.description,
			author: product.author,
			price: product.price,
			image: product.image,
			category: product.category,
		});
	};

	const resetForm = () => {
		setFormData({
			name: "",
			description: "",
			author: "",
			price: "",
			image: null,
			category: "",
		});
	};

	return (
		<main className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-lg">
			<img
				src={`${API_URL}/${product.image}`}
				alt={product.name}
				className="w-40 h-40 object-cover rounded-full mb-4 shadow-md"
			/>
			<h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
			<p className="text-gray-600 mt-2">Author: {product.author}</p>
			<p className="text-gray-600">Price: ${product.price}</p>
			<p className="text-gray-600">Category: {product.category}</p>
			<div className="mt-6 flex gap-4">
				<button
					onClick={() => handleEdit(product)}
					className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition-all"
				>
					Edit
				</button>
				<button
					onClick={() => handleDelete(product._id)}
					className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all"
				>
					Delete
				</button>
			</div>
		</main>
	);
}

export default CardsDashboard;
