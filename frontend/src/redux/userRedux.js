import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    start: (state) => {
      state.isFetching = true;
    },
    success: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    failure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { start, success, failure, logout } =
  userSlice.actions;
export default userSlice.reducer;
