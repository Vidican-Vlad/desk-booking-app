import React from "react";
import { Navigate } from "react-router";

import { TRUE } from "../Utils/constants";
import { getIsAdmin, getToken } from "../Utils/UtilFunctions";

const AdminRoute = ({ children }) => {
	return getToken() && getIsAdmin() === TRUE ? children : <Navigate to="/" />;
};

export default AdminRoute;
