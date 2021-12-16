import { RootState } from "./index";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    photo_profile: string;
    created_at: Date;
    updated_at: Date;
  };
  token: string | null;
}

const initialState = {
  data: {} as User,
};

export interface LoginProps {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "user/login",
  async (creds: LoginProps) => {
    const res = await axios.post("/api/login", {
      ...creds,
    });
    if (res.data.token !== null) {
      const serializedState = JSON.stringify({ user: res.data });
      localStorage.setItem("user", serializedState);
    }
    return res.data;
  }
);

export const logout = createAsyncThunk("user/logout", () => {
  localStorage.removeItem("user");
  return initialState;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.data = initialState.data;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.data = initialState.data;
    });
  },
});

export const selectUser = (state: RootState) => state.user.data;

export default userSlice.reducer;
