import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from "./Features/authenticationSlice";

export const store = configureStore({
	reducer: {
		auth: authenticationReducer,
	},
});
