import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	error: null,
	offices: [],
};

export const officesSlice = createSlice({
	name: "office",
	initialState,
	reducers: {
		loadOfficeInit: (state) => {
			state.loading = true;
		},
		loadOfficeSuccess: (state, action) => {
			state.loading = false;
			state.offices = action.payload;
			state.error = "";
		},
		loadOfficeFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},

		addOfficeInit: (state) => {
			state.loading = true;
		},
		addOfficeSuccess: (state, action) => {
			state.loading = false;
			state.offices = [...state.offices, action.payload];
			state.error = "";
		},
		addOfficeFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		clearOffices: (state) => {
			state.error = "";
			state.loading = "";
			state.offices = [];
		},
	},
});

export const {
	clearOffices,
	loadOfficeFail,
	loadOfficeInit,
	loadOfficeSuccess,
	addOfficeFail,
	addOfficeInit,
	addOfficeSuccess,
} = officesSlice.actions;

export default officesSlice.reducer;
