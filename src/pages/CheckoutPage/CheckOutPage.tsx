import ProductsTable from "./ProductsTable";
import CartTotalCost from "./CartTotalCost";
import ShippingForm from "./ShippingForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/reduxhooks";
import type { Book } from "../../components/control-bar/ControlBar.types";
import {
	decreaseQuantity,
	increaseQuantity,
	removeItemFromCart,
} from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
	userName: Yup.string().required("User Name is required"),
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	country: Yup.string().required("Country is required"),
	city: Yup.string().required("City is required"),
	address: Yup.string().required("Address is required"),
	phoneNumber: Yup.string().required("Phone Number is required"),
});

export interface BookItem extends Book {
	quantity: number;
}

export default function CheckoutPage() {
	const cart = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();
	const products = cart.items;

	const handleRemove = (id: string) => {
		dispatch(removeItemFromCart(id));
		toast.success("the book removed successfully");
	};

	const handleQuantityIncrease = (id: string) => {
		dispatch(increaseQuantity(id));
		toast.success("the book Increase derease successfully");
	};
	const handleQuantityDecrease = (id: string) => {
		dispatch(decreaseQuantity(id));
		toast.success("the book quantity derease successfully");
	};

	const subtotal = products.reduce(
		(sum, product) => sum + product.price * product.quantity,
		0
	);
	const tax = subtotal * 0.0444; // Approximately 1.6 / 36
	const total = subtotal + tax;

	const formik = useFormik({
		initialValues: {
			userName: "",
			email: "",
			country: "",
			city: "",
			address: "",
			phoneNumber: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(values);
			// Handle form submission here
		},
	});
	return (
		<div className="min-h-screen p-5 flex flex-col gap-6">
			<div className="flex justify-between items-center md:flex-row flex-col md:gap-0 gap-6">
				{/**product table */}
				<div className="md:w-2/4 w-full rounded-md shadow-2xl overflow-hidden md:order-1 order-2">
					<ProductsTable
						onQuantityIncrease={handleQuantityIncrease}
						onQuantityDecrease={handleQuantityDecrease}
						onRemove={handleRemove}
						products={products}
					/>
				</div>
				{/**checkout card */}
				<div className="md:w-[350px] w-full md:order-2 order-1">
					<CartTotalCost
						handleSubmit={formik.handleSubmit}
						subtotal={subtotal}
						tax={tax}
						total={total}
					/>{" "}
				</div>
			</div>
			<div className="md:w-[70%]">
				<ShippingForm formik={formik} />
			</div>
		</div>
	);
}
