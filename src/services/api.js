//	Importing axios main module to connect frontend to backend
import axios from "axios";

//	Exporting connection to backend
export default axios.create({
	baseURL: process.env.REACT_APP_API_URL
});
