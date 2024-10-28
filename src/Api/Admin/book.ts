/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import AxiosInstance from "../BaseAxios";
interface BookFormData {
	name: string;
	description: string;
	author: string;
	price: string;
	image: File | null;
	category: string;
}


export const CreateBook = async (FormData: BookFormData) => {
	try {
		const { data } = await AxiosInstance.post("/api/book", FormData);
		return data;
	} catch (error: any) {
		error.response.data.message.map((el:string) => {
			toast.error(el);
		});
	}
};
export const AllBooks = async () => {
	try {
		const { data } = await AxiosInstance.get("/api/book");
		return data;
	} catch (error) {
		console.error(error);
	}
};
export const DeleteBook = async (id: string) => {
	try {
		const { data } = await AxiosInstance.delete(`/api/book/${id}`);
		return data;
	} catch (error) {
		console.error(error);
	}
};
