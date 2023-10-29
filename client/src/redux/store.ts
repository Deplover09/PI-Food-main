import { configureStore } from "@reduxjs/toolkit";
import { recipeReducer } from "./recipesSlice.ts";

export const store = configureStore({
  reducer: {
    recipe: recipeReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
