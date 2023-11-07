import { type State, type Recipe, type Diets } from "./recipesSlice";
import {
  type PayloadAction,
  type ActionReducerMapBuilder,
  createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

const fetchRecipes = createAsyncThunk("recipe/fetchAllRecipes", async () => {
  const response = await axios.get("http://localhost:3001/recipes");
  return response.data;
});

const fetchDiets = createAsyncThunk("recipe/fetchAllDiets", async () => {
  const response = await axios.get("http://localhost:3001/diets");
  return response.data;
});

const fetchRecipesByName = createAsyncThunk(
  "recipe/fetchRecipesByName",
  async (name: string) => {
    const response = await axios.get(
      `http://localhost:3001/recipes?name=${name}`
    );
    return response.data;
  }
);

const fecthRecipesByParams = createAsyncThunk(
  "recipe/fetchRecipesByParams",
  async (id: string) => {
    const response = await axios.get(`http://localhost:3001/recipes/${id}`);
    return response.data;
  }
);

const postRecipes = createAsyncThunk(
  "recipe/postRecipes",
  async (recipe: Recipe) => {
    const response = await axios.post("http://localhost:3001/recipes", recipe);
    return response.data;
  }
);

const asyncActions = (builder: ActionReducerMapBuilder<State>): void => {
  builder
    .addCase(
      fetchRecipes.fulfilled,
      (state, action: PayloadAction<Recipe[] | []>) => {
        if (action.payload !== undefined && action.payload !== null)
          state.recipes = action.payload;
        state.backUpRecipes = action.payload;
      }
    )
    .addCase(
      fetchDiets.fulfilled,
      (state, action: PayloadAction<Diets[] | []>) => {
        state.diets = action.payload;
      }
    )
    .addCase(
      fetchRecipesByName.fulfilled,
      (state, action: PayloadAction<Recipe[] | []>) => {
        if (action.payload !== undefined && action.payload !== null)
          state.recipes = action.payload;
      }
    )
    .addCase(
      fecthRecipesByParams.fulfilled,
      (state, action: PayloadAction<Recipe | undefined>) => {
        if (action.payload !== undefined && action.payload !== null)
          state.detail = action.payload;
      }
    )
    .addCase(postRecipes.fulfilled, () => {});
};

export {
  fetchRecipes,
  fetchDiets,
  fetchRecipesByName,
  fecthRecipesByParams,
  postRecipes
};

export default asyncActions;
