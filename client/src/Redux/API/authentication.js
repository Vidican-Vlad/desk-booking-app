import {
	adminToCookie,
	getToken,
	tokenToCookie,
} from "../../Utils/UtilFunctions";
import axiosInstance from "../Axios/AxiosInstance";

export const userLogin = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axiosInstance.post("/auth/login", data);

			tokenToCookie(res.data.token);
			adminToCookie(res.data.isAdmin);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const createUserAccount = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.post(
				"/auth/register",
				data,
				requestHeader,
			);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const resetPassword = (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.put(
				"/auth/changePassword",
				data,
				requestHeader,
			);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};

export const generatePassResetKey = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.put(
				"/auth/initPassReset",
				{},
				requestHeader,
			);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};
