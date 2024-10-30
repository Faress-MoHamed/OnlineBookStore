import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { GetAllCategories } from "../../../Api/Admin/category";
import Header from "../../../components/ui/Header";
import { CreateBook, UpdateBook } from "../../../Api/Admin/book";
import * as Yup from "yup";
import type { BookFormResponse } from "./BookList";

{
	/**  */
}
interface NewBookResponse {
	code: number;
	message: string;
	status: string;
	timestamp: string;
	data: {
		author: string;
		category: string;
		createdAt: string;
		description: string;
		id: string;
		_v: string;
		name: string;
		price: number;
		image: string;
		status: string;
	};
}

interface AddBookFormProps {
	formData: BookFormResponse; // Accepting formData as props
	setFormData: React.Dispatch<React.SetStateAction<BookFormResponse>>; // Accepting setFormData as props
}

const BookValidate = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	description: Yup.string().required("Description is required"),
	author: Yup.string().required("Author is required"),
	price: Yup.number()
		.min(0, "the min price is 0")
		.required("Price is required"),
	// image: Yup.mixed()
	// 	.required("Image is required")
	// 	.test("fileSize", "File size is too large", (value: any) => {
	// 		return value && value.size <= 10000000; // 10MB limit
	// 	})
	// 	.test("fileType", "Unsupported File Format", (value: any) => {
	// 		return (
	// 			value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
	// 		);
	// 	}),
	image: Yup.string().required("Image is required"),
});
const AddBookForm: React.FC<AddBookFormProps> = ({ formData, setFormData }) => {
	const queryClient = useQueryClient();
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [categories, setCategories] = useState<
		{ _id: string; title: string }[]
	>([]);
	const [isLoading, setIsLoading] = useState(false);

	const { mutate: addBook } = useMutation<
		NewBookResponse,
		Error,
		BookFormResponse
	>({
		mutationKey: ["books", "newBook"],
		mutationFn: async (data: BookFormResponse) => {
			try {
				const res = await CreateBook(data);
				return res;
			} catch (error) {
				toast.error("Error in adding book");
				throw error;
			}
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["books"] });
			resetForm();
			toast.success(data.message);
			setIsLoading(false);
		},
		onMutate: () => {
			setIsLoading(true);
		},
	});

	const { mutate: updateBookMutate } = useMutation<
		NewBookResponse,
		Error,
		{ id: string; data: BookFormResponse }
	>({
		mutationKey: ["books", "updateBook"],
		mutationFn: async (payload: { id: string; data: BookFormResponse }) => {
			try {
				const res = await UpdateBook(payload.id, payload.data);
				return res;
			} catch (error) {
				toast.error("Error in updating book");
				throw error;
			}
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["books"] });
			resetForm();
			toast.success(data.message);
			setIsLoading(false);
		},
		onMutate: () => {
			setIsLoading(true);
		},
	});

	const resetForm = () => {
		formik.resetForm();
		setFormData({
			_id: "",
			name: "",
			description: "",
			author: "",
			price: 0,
			image: "",
			category: "",
		});
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};
	const formik = useFormik({
		enableReinitialize: true,
		validationSchema: BookValidate,
		initialValues: formData, // Set initial values from props
		onSubmit: async (values: BookFormResponse) => {
			// const data = new FormData();
			// data.append("name", values.name);
			// data.append("description", values.description);
			// data.append("author", values.author);
			// data.append("price", values.price);
			// data.append("category", values.category);
			// if (values.image) {
			// 	data.append("image", values.image);
			// }
			// console.log(typeof data);
			try {
				if (values._id !== "") {
					const payload = { id: values._id, data: values };
					updateBookMutate(payload);
				} else {
					addBook(values);
				}
			} catch (error) {
				console.error("Error submitting book:", error);
			}
		},
	});

	const {
		data: fetchedCategories,
		isError,
		error,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const res = await GetAllCategories();
			return res;
		},
	});

	useEffect(() => {
		if (fetchedCategories) {
			setCategories(fetchedCategories);
		}
		if (isError) {
			console.error("Error fetching categories:", error);
		}
	}, [fetchedCategories, isError, error]);

	// const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (e.target.files && e.target.files[0]) {
	// 		formik.setFieldValue("image", e.target.files[0]);
	// 	}
	// };

	// Update formData state whenever formik values change
	useEffect(() => {
		setFormData(formik.values);
	}, [formik.values, setFormData]);

	return (
		<>
			<Header subTitle="Good to see you" className={"text-main font-Inter "}>
				Add New Book
			</Header>
			<div className="flex justify-center items-center flex-col ">
				<form
					onSubmit={formik.handleSubmit}
					className="flex flex-col gap-4 p-7 bg-black/10 shadow-xl rounded-lg w-[80%]"
				>
					<div className="inptGroup flex items-center gap-5 w-full md:flex-row flex-col">
						<div className="md:w-2/4 w-full">
							<input
								type="text"
								placeholder="Book Name"
								{...formik.getFieldProps("name")}
								className="p-4 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-main transition-all w-full"
							/>
							{formik.touched.name && formik.errors.name ? (
								<div className="text-red-500 text-xs mt-0">
									{formik.errors.name}
								</div>
							) : null}
						</div>
						<div className="md:w-2/4 w-full">
							<input
								type="text"
								placeholder="Description"
								{...formik.getFieldProps("description")}
								className="p-4 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-main transition-all w-full"
							/>
							{formik.touched.description && formik.errors.description ? (
								<div className="text-red-500 text-xs mt-0">
									{formik.errors.description}
								</div>
							) : null}
						</div>
					</div>
					<input
						type="text"
						placeholder="Author"
						{...formik.getFieldProps("author")}
						className="p-4 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-main transition-all"
					/>
					{formik.touched.author && formik.errors.author ? (
						<div className="text-red-500 text-xs mt-0">
							{formik.errors.author}
						</div>
					) : null}
					<input
						type="number"
						placeholder="Price"
						{...formik.getFieldProps("price")}
						className="p-4 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-main transition-all"
					/>
					{formik.touched.price && formik.errors.price ? (
						<div className="text-red-500 text-xs mt-0">
							{formik.errors.price}
						</div>
					) : null}
					<select
						{...formik.getFieldProps("category")}
						className="p-4 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-main transition-all"
					>
						<option value="" disabled>
							Select Category
						</option>
						{categories.map((category) => (
							<option key={category._id} value={category._id}>
								{category.title}
							</option>
						))}
					</select>
					{formik.touched.category && formik.errors.category ? (
						<div className="text-red-500 text-xs mt-0">
							{formik.errors.category}
						</div>
					) : null}
					<input
						type="text"
						{...formik.getFieldProps("image")}
						className="p-4 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-main transition-all"
					/>
					{formik.touched.image && formik.errors.image ? (
						<div className="text-red-500 text-xs mt-0">
							{formik.errors.image}
						</div>
					) : null}
					<button
						type="submit"
						disabled={isLoading}
						className="p-4 bg-main text-white rounded-lg hover:opacity-85 transition-all"
					>
						{isLoading
							? "Submitting..."
							: formData._id !== ""
							? "Update Book"
							: "Add Book"}
					</button>
				</form>
			</div>
		</>
	);
};

export default AddBookForm;
