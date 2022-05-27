import React from "react";
import { Navigate } from "react-router";
import { TRUE } from "../../../Utils/constants";
import { getAdminCookie, getToken } from "../../../Utils/utilFunctions";

const AdminRoute = ({ children }) => {
	return getToken() && getAdminCookie() === TRUE ? (
		children
	) : (
		<Navigate to="/" />
	);
};

export default AdminRoute;
