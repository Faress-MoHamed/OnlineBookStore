/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import AxiosInstance from "../BaseAxios";
import type { BookFormResponse } from "../../pages/dashboard/Dashboard-Book/BookList";

export const CreateBook = async (FormData: BookFormResponse) => {
	try {
		const { data } = await AxiosInstance.post("/api/book", FormData);
		return data;
	} catch (error: any) {
		error.response.data.message.map((el: string) => {
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

export const UpdateBook = async (id: string, formData: BookFormResponse) => {
	try {
		const { data } = await AxiosInstance.put(`/api/book/${id}`, {
			...formData,
			_id: undefined,
		});
		return data;
	} catch (error) {
		console.error(error);
	}
};
