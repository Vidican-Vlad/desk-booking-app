import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from "./Features/authenticationSlice";
import officesReducer from "./Features/officesSlice";
import officeDetailsReducer from "./Features/officeDetailsSlice";
import userProfileReducer from "./Features/profileSlice";

export const store = configureStore({
	reducer: {
		auth: authenticationReducer,
		officesState: officesReducer,
		profileSlice: userProfileReducer,
		officeDetails: officeDetailsReducer,
	},
});
