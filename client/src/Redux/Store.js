import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from "./features/registerSlice";

export const store = configureStore({
	reducer: {
		auth: authenticationReducer,
	},
});
