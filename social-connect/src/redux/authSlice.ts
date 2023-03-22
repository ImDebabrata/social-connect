import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
    },
  },
});

export const { loginSuccess } = authSlice.actions;

export default authSlice.reducer;
