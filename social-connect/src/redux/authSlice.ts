import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  otpMail: string | null;
}

const initialState: AuthState = {
  token: null,
  otpMail: null,
};

const authSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setOtpMail(state, action: PayloadAction<string>) {
      state.otpMail = action.payload;
    },
  },
});

export const { loginSuccess, setOtpMail } = authSlice.actions;

export default authSlice.reducer;
