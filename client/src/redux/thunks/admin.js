import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../constants/config";
import axios from "axios";

// Admin Login
const adminLogin = createAsyncThunk(
  "admin/login",
  async (secretKey, thunkAPI) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${server}/api/v1/admin/verify`,
        { secretKey },
        config
      );

      return data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || "Login failed");
    }
  }
);

// Get Admin
const getAdmin = createAsyncThunk("admin/getAdmin", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(`${server}/api/v1/admin/`, {
      withCredentials: true,
    });
    console.log(data.admin);
    return data.admin;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to get admin");
  }
});

// Admin Logout
const adminLogout = createAsyncThunk("admin/logout", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(`${server}/api/v1/admin/logout`, {
      withCredentials: true,
    });

    return data.message;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message || "Logout failed");
  }
});

export { adminLogin, getAdmin, adminLogout };
