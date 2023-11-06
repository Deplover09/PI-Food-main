import { createSlice } from "@reduxjs/toolkit";

import actions from "./actions";
import asyncActions from "./asyncActions";

interface Recipe {
  id: string;
  name: string;
  image: string;
  diets: string[];
  steps: string;
  healthScore: number;
  createdInDb: boolean;
}
interface Diets {
  id: string;
  name: string;
  recipes: string[];
}
interface State {
  recipes: Recipe[] | [];
  diets: Diets[] | [];
  detail: Recipe | undefined;
  error: object[];
  backUpRecipes: Recipe[] | [];
}

const initialState: State = {
  recipes: [],
  diets: [],
  detail: undefined,
  error: [{}],
  backUpRecipes: []
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: actions,
  extraReducers: (builder) => {
    asyncActions(builder);
  }
});

const recipeReducer = recipeSlice.reducer;

export { recipeReducer, type State, type Recipe, type Diets };
