import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  email: string;
  photoUrl?: string;
}
interface AuthState {
  isAuthenticated: boolean;
  user: null | User;
  loading: boolean;
  authToken: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  authToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<AuthState>) => {
      if (!localStorage.getItem("authToken")) {
        localStorage.setItem("authToken", action.payload.authToken);
      }
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.loading = false;
    },
    logout: (state) => {
      localStorage.removeItem("authToken");
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
