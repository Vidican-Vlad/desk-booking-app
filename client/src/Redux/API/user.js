import {
	adminToCookie,
	getToken,
	tokenToCookie,
} from "../../Utils/UtilFunctions";
import axiosInstance from "../Axios/AxiosInstance";

export const getAllUsers = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.post("/user/users", requestHeader);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const getUserById = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.get("/user/getUser", requestHeader);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};
