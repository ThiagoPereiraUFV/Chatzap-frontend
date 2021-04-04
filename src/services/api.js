//	Importing axios main module to connect frontend to backend
import axios from "axios";

//	Exporting connection to backend
export default axios.create({
	baseURL: process.env.REACT_APP_API_URL
});

//	REACT_APP_API_URL=https://chatzap.herokuapp.com/
//	REACT_APP_API_URL=http://localhost:4000/
