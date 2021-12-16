import { RootState } from "./index";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Loading {
  title: string;
  description: string;
  status: "info" | "warning" | "success" | "error" | undefined;
}

const initialState = {
  data: {} as Loading,
};

export const loading = createAsyncThunk(
  "loading/load",
  async ({ title, description, status }: Loading) => {
    return {
      title,
      description,
      status,
    };
  }
);

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loading.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(loading.rejected, (state) => {
      state.data = initialState.data;
    });
  },
});

// export const isLoading = (state: RootState) => state.loading.data;

export default loadingSlice.reducer;
