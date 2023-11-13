import { type State, type Recipe, type Diets } from "./recipesSlice";
import {
  type PayloadAction,
  type ActionReducerMapBuilder,
  createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";
interface DietObject {
  _id: string;
  name: string;
  recipes: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
interface RecipeApi {
  _id: string;
  name: string;
  summary: string;
  healthScore: number;
  image: string;
  steps: string[];
  createdByUsers: boolean;
  diets: DietObject[];
}
const fetchRecipes = createAsyncThunk("recipe/fetchAllRecipes", async () => {
  const response = await axios.get("http://localhost:3001/recipes");
  const recipeData: RecipeApi[] = response.data;

  const dataToReturn = recipeData.map((r: RecipeApi) => {
    const dietName = r.diets.map((d) => d.name);
    const recipe: Recipe = {
      id: r._id,
      name: r.name,
      summary: r.summary,
      healthScore: r.healthScore,
      image: r.image,
      steps: r.steps,
      diets: dietName,
      createdByUsers: r.createdByUsers
    };
    return recipe;
  });

  return dataToReturn;
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
    const arr = [];
    const recipeData: RecipeApi = response.data;
    const dietName = recipeData.diets.map((d) => d.name);
    const dataToReturn: Recipe = {
      id: recipeData._id,
      name: recipeData.name,
      summary: recipeData.summary,
      healthScore: recipeData.healthScore,
      image: recipeData.image,
      steps: recipeData.steps,
      diets: dietName,
      createdByUsers: recipeData.createdByUsers
    };
    arr.push(dataToReturn);
    return arr;
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
      (state, action: PayloadAction<Recipe[] | null>) => {
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
