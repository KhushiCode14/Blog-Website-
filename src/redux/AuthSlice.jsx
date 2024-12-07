import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// Initial state
const initialState = {
  token: null,
  role: null,
  email: null,
  name: null,
  isAuthenticated: false,
  loading: true,
  user: null,
};

// Create slice using Redux Toolkit
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to handle login
    login: (state, action) => {
      const token = action.payload.token;
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken); // Check what fields are present
        state.token = token;
        state.role = decodedToken.role || "DefaultRole"; // Use default value if role is missing
        state.name = decodedToken.name || action.payload.name; // Use payload name as fallback
        state.name = decodedToken.email || action.payload.email; // Use payload name as fallback
        state.isAuthenticated = true;
        state.user = action.payload;
      } catch (error) {
        console.error("Invalid token:", error);
      }
    },

    // Action to handle logout
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    // Action to complete loading state for initial app load
    finishLoading: (state) => {
      state.loading = false;
    },
  },
});

// Export actions
export const { login, logout, finishLoading } = authSlice.actions;

// Export reducer to be used in the store
export default authSlice.reducer;
