import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { apiSlice } from "./apiSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authSlice,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
}
export const store = makeStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
