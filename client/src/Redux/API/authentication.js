import { adminToCookie, tokenToCookie } from "../../Utils/UtilFunctions";
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
