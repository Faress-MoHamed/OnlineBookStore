import axios from "axios";
import Cookies from "js-cookie";

const AxiosInstance = axios.create({
	baseURL: "https://upskilling-egypt.com:3007",
	headers: {
		Authorization: `Bearer ${Cookies.get("token")}`,
	},
});

export default AxiosInstance;
