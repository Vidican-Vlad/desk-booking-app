import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getToken } from "../Utils/UtilFunctions";

const PrivateRoute = ({ children }) => {
	const { userProfile } = useSelector((state) => state.profileSlice);

	console.log(userProfile);

	return getToken() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
