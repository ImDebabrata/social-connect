import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  otpMail: string | null;
  otpTimer: number | null;
}

const initialState: AuthState = {
  token: null,
  otpMail: null,
  otpTimer: null,
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
    setOtpTimer(state, action: PayloadAction<number>) {
      state.otpTimer = action.payload;
    },
  },
});

export const { loginSuccess, setOtpMail, setOtpTimer } = authSlice.actions;

export default authSlice.reducer;
