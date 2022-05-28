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
		createFloorStateInit: (state) => {
			state.loading = true;
		},
		createFloorStateSuccess: (state) => {
			state.loading = false;
			state.error = "";
		},
		createFloorStateFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	clearOffice,
	loadOfficeStateFail,
	loadOfficeStateInit,
	loadOfficeStateSuccess,
	createFloorStateFail,
	createFloorStateInit,
	createFloorStateSuccess,
} = officeDetailslice.actions;

export default officeDetailslice.reducer;
