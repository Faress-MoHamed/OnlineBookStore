import axios from "axios";
{
	/**https://newsapi.org/docs */
}
const API_KEY = "7239b7d3b5d341f6a8021bee9f952440";
export const AllArticles = async () => {
	try {
		const { data } = await axios.get(
			`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
		);
		return data.articles;
	} catch (error) {
		console.error(error);
	}
};
