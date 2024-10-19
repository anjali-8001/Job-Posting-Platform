import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

// Selector to get the token
export const getToken = (state) => state.auth.token;

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
