import { createSlice } from "@reduxjs/toolkit";
import { adminLogin, adminLogout, getAdmin } from "../thunks/admin";
import toast from "react-hot-toast";

const initialState = {
  user: null,
  isAdmin: false,
  loader: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },
    userNotExists: (state) => {
      state.user = null;
      state.loader = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isAdmin = true;
        toast.success(action.payload);
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isAdmin = false;
        toast.error(action.payload || "Login failed");
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.isAdmin = !!action.payload;
      })
      .addCase(getAdmin.rejected, (state, action) => {
        state.isAdmin = false;
        toast.error(action.payload || "Get admin failed");
      })
      .addCase(adminLogout.fulfilled, (state, action) => {
        state.isAdmin = false;
        toast.success(action.payload);
      })
      .addCase(adminLogout.rejected, (state, action) => {
        state.isAdmin = true; // Consider setting false depending on your logic
        toast.error(action.payload || "Logout failed");
      });
  },
});

export default authSlice;
export const { userExists, userNotExists } = authSlice.actions;
