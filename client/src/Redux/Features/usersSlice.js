import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	error: null,
	users: [],
};

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		loadUsersInit: (state) => {
			state.loading = true;
		},
		loadUsersSuccess: (state, action) => {
			state.loading = false;
			state.users = action.payload;
			state.error = "";
		},
		loadUsersFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { loadUsersFail, loadUsersInit, loadUsersSuccess } =
	usersSlice.actions;

export default usersSlice.reducer;
