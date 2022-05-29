import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	error: null,
	floor: {},
};

export const floorSlice = createSlice({
	name: "floor",
	initialState,
	reducers: {
		loadFloorInit: (state) => {
			state.loading = true;
		},
		loadFloorSuccess: (state, action) => {
			state.loading = false;
			state.floor = action.payload;
			state.error = "";
		},
		loadFloorFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { loadFloorInit, loadFloorSuccess, loadFloorFail } =
	floorSlice.actions;

export default floorSlice.reducer;
