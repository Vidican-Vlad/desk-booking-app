import React from "react";
import { Navigate } from "react-router";
import { getToken } from "../Utils/utilFunctions";

const PrivateRoute = ({ children }) => {
	return getToken() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
