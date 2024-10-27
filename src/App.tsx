import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import AuthLayout from "./pages/AuthLayout";
import AuthForm from "./pages/AuthForm";
import SendOtp from "./pages/SendOtp";
import ForgetPassword from "./pages/ForgetPassword";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
	// const [user, setUser] = useState<string | null>(null);
	// setUser("fares");
	const routes = createBrowserRouter([
		{
			path: "/",
			element: (
				<ProtectedRoute>
					<Layout />
				</ProtectedRoute>
			),
			children: [
				{
					path: "/",
					element: <Home />,
				},
				{
					path: "/about",
					element: <About />,
				},
			],
		},
		{
			path: "/auth",
			element: (
				<ProtectedRoute>
					<AuthLayout />
				</ProtectedRoute>
			),
			children: [
				{
					index: true,
					element: <AuthForm />,
				},
				{
					path: "/auth/send-otp",
					element: <SendOtp />,
				},
				{
					path: "/auth/forget-password",
					element: <ForgetPassword />,
				},
			],
		},
	]);
	return <RouterProvider router={routes} />;
}

export default App;
