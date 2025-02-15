import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/api";

const rootReducer = combineReducers({
  authToken: "",
  [baseApi.reducerPath]: baseApi.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware,
    );
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
