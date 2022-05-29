import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	error: null,
};

export const deskSlice = createSlice({
	name: "desk",
	initialState,
	reducers: {
		bookInit: (state) => {
			state.loading = true;
		},
		bookSuccess: (state) => {
			state.loading = false;
			state.error = "";
		},
		bookFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { bookInit, bookSuccess, bookFail } = deskSlice.actions;

export default deskSlice.reducer;
