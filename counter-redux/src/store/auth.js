import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthentication: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthentication = true;
    },
    logout(state) {
      state.isAuthentication = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
