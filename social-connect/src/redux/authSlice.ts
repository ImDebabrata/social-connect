import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import axios from "axios";

interface AuthState {
  isLoading: boolean;
  isError: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isLoading: false,
  isError: false,
  token: null,
};

const authSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    processingRequest(state) {
      state.isLoading = true;
      state.isError = false;
    },
    errorlog(state) {
      state.isError = true;
      state.isLoading = false;
    },
    signupSuccess(state) {
      state.isLoading = false;
      state.isError = false;
    },
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.isLoading = false;
      state.isError = false;
    },
  },
});

export const { processingRequest, errorlog, signupSuccess, loginSuccess } =
  authSlice.actions;

export default authSlice.reducer;
