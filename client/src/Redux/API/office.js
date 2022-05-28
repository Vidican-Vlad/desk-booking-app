import { getToken } from "../../Utils/UtilFunctions";
import axiosInstance from "../Axios/AxiosInstance";

export const getOffice = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const requestHeader = {
				headers: {
					authorization: `Bearer ${getToken()}`,
					"Content-type": "application/json",
				},
			};
			const res = await axiosInstance.get("/office", requestHeader);
			resolve(res.data);
		} catch (error) {
			console.log(error);
			reject(error);
		}
	});
};
