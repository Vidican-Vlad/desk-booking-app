import Cookies from "universal-cookie";
import { IS_ADMIN, TOKEN } from "./constants";

const cookies = new Cookies();

export const tokenToCookie = (token) => {
	const date = new Date();
	date.setTime(date.getTime() + 36000000);

	cookies.set(TOKEN, token, {
		path: "/",
		expires: date,
	});
};

export const adminToCookie = (admin) => {
	const date = new Date();
	date.setTime(date.getTime() + 36000000);

	cookies.set(IS_ADMIN, admin, {
		path: "/",
		expires: date,
	});
};

export const getToken = () => {
	return cookies.get(TOKEN);
};

export const getIsAdmin = () => {
	return cookies.get(IS_ADMIN);
};

export const cookieTokenExists = () => {
	const token = getToken();
	if (token) return true;
	else return false;
};

export const deleteCookies = () => {
	cookies.remove(TOKEN);
	cookies.remove(IS_ADMIN);
	window.location.reload();
};
