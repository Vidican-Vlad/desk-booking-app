import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	error: null,
	office: {},
};

export const officeDetailslice = createSlice({
	name: "officeState",
	initialState,
	reducers: {
		loadOfficeStateInit: (state) => {
			state.loading = true;
		},
		loadOfficeStateSuccess: (state, action) => {
			state.loading = false;
			state.office = action.payload;
			state.error = "";
		},
		loadOfficeStateFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		clearOffice: (state) => {
			state.loading = false;
			state.error = "";
			state.office = {};
		},
	},
});

export const {
	clearOffice,
	loadOfficeStateFail,
	loadOfficeStateInit,
	loadOfficeStateSuccess,
} = officeDetailslice.actions;

export default officeDetailslice.reducer;
