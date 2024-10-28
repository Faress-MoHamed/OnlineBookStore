import { FormikProps } from "formik";

interface FormValues {
	userName: string;
	email: string;
	country: string;
	city: string;
	address: string;
	phoneNumber: string;
}

export default function ShippingForm({
	formik,
}: {
	formik: FormikProps<FormValues>;
}) {
	return (
		<div className="bg-custom-gradient p-8 rounded-lg shadow-md w-full">
			<h2 className="text-2xl font-bold mb-6 text-gray-800">Shipping Data</h2>
			<form onSubmit={formik.handleSubmit} className="space-y-4">
				<div className="flex items-center md:flex-row flex-col md:gap-20 gap-5">
					<div className="md:w-2/4 w-full">
						<label htmlFor="userName" className="block  font-medium text-main ">
							User Name
						</label>
						<input
							id="userName"
							name="userName"
							type="text"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.userName}
							className="mt-1 block w-full px-3 py-2  rounded-md focus:outline-none  "
						/>
						{formik.touched.userName && formik.errors.userName ? (
							<div className="text-red-500 text-sm mt-1">
								{formik.errors.userName}
							</div>
						) : null}
					</div>

					<div className="md:w-2/4 w-full">
						<label htmlFor="email" className="block  font-medium text-main ">
							E-mail
						</label>
						<input
							id="email"
							name="email"
							type="email"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email}
							className="mt-1 block w-full px-3 py-2  rounded-md focus:outline-none  "
						/>
						{formik.touched.email && formik.errors.email ? (
							<div className="text-red-500 text-sm mt-1">
								{formik.errors.email}
							</div>
						) : null}
					</div>
				</div>
				<div className="flex items-center md:flex-row flex-col md:gap-20 gap-5">
					<div className="md:w-2/4 w-full">
						<label htmlFor="country" className="block  font-medium text-main ">
							Country
						</label>
						<input
							id="country"
							name="country"
							type="text"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.country}
							className="mt-1 block w-full px-3 py-2  rounded-md focus:outline-none  "
						/>
						{formik.touched.country && formik.errors.country ? (
							<div className="text-red-500 text-sm mt-1">
								{formik.errors.country}
							</div>
						) : null}
					</div>

					<div className="md:w-2/4 w-full">
						<label htmlFor="city" className="block  font-medium text-main ">
							City
						</label>
						<input
							id="city"
							name="city"
							type="text"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.city}
							className="mt-1 block w-full px-3 py-2  rounded-md focus:outline-none  "
						/>
						{formik.touched.city && formik.errors.city ? (
							<div className="text-red-500 text-sm mt-1">
								{formik.errors.city}
							</div>
						) : null}
					</div>
				</div>
				<div className="flex items-center md:flex-row flex-col md:gap-20 gap-5">
					<div className="md:w-2/4 w-full">
						<label htmlFor="address" className="block  font-medium text-main ">
							Address
						</label>
						<input
							id="address"
							name="address"
							type="text"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.address}
							className="mt-1 block w-full px-3 py-2  rounded-md focus:outline-none  "
						/>
						{formik.touched.address && formik.errors.address ? (
							<div className="text-red-500 text-sm mt-1">
								{formik.errors.address}
							</div>
						) : null}
					</div>

					<div className="md:w-2/4 w-full">
						<label
							htmlFor="phoneNumber"
							className="block  font-medium text-main "
						>
							Phone Number
						</label>
						<input
							id="phoneNumber"
							name="phoneNumber"
							type="tel"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.phoneNumber}
							className="mt-1 block w-full px-3 py-2  rounded-md focus:outline-none  "
						/>
						{formik.touched.phoneNumber && formik.errors.phoneNumber ? (
							<div className="text-red-500 text-sm mt-1">
								{formik.errors.phoneNumber}
							</div>
						) : null}
					</div>
				</div>
			</form>
		</div>
	);
}
