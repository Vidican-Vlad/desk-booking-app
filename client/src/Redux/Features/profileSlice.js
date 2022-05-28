import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	error: null,
	userProfile: {},
};

export const userProfileSlice = createSlice({
	name: "userProfile",
	initialState,
	reducers: {
		loadProfileInit: (state) => {
			state.loading = true;
		},
		loadProfileSuccess: (state, action) => {
			state.loading = false;
			state.userProfile = action.payload;
			state.error = "";
		},
		loadProfileFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},

		clearProfile: (state) => {
			state.error = "";
			state.loading = "";
			state.userProfile = [];
		},
	},
});

export const {
	clearOffices,
	loadOfficeFail,
	loadOfficeInit,
	loadOfficeSuccess,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
