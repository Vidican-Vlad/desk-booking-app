import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:7055/api",
});

export default instance;
