import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id?: string;
  username?: string;
  email?: string;
}

interface AuthState {
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: !!localStorage.getItem("access"),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set authenticated user info
    setAuth: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    // Save access + refresh tokens
    setTokens: (
      state,
      action: PayloadAction<{ access: string; refresh: string }>
    ) => {
      const { access, refresh } = action.payload;

      state.access = access;
      state.refresh = refresh;
      state.isAuthenticated = true;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
    },

    // Log out user
    logout: (state) => {
      state.access = null;
      state.refresh = null;
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },

    // Rehydrate from localStorage
    loadTokensFromStorage: (state) => {
      const access = localStorage.getItem("access");
      const refresh = localStorage.getItem("refresh");

      state.access = access;
      state.refresh = refresh;
      state.isAuthenticated = !!access;
    },
  },
});

export const { setAuth, setTokens, logout, loadTokensFromStorage } =
  authSlice.actions;
export default authSlice.reducer;
