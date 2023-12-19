import { type State, type Recipe, type Diets } from "./recipesSlice";
import {
  type PayloadAction,
  type ActionReducerMapBuilder,
  createAsyncThunk
} from "@reduxjs/toolkit";
import noImg from "../../images/noImage.png";
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
  let recipeData: RecipeApi[] = [];
  const fetch = async (): Promise<void> => {
    const maxRetries = 10;
    let retryCount = 0;

    const fetchData = async (): Promise<boolean> => {
      const response = await axios.get(
        "https://recipes-with-mongodb.onrender.com/recipes"
      );
      const recipeDataIsThere: RecipeApi[] = response.data;

      if (recipeDataIsThere.length !== 0) {
        recipeData = recipeDataIsThere;
        console.log("Data received:", recipeData);
        return true;
      }

      return false;
    };

    const delay = async (ms: number): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, ms));
    };

    while (retryCount < maxRetries) {
      const dataReceived = await fetchData();

      if (dataReceived) {
        break; // Exit the loop if data is received
      }

      await delay(5000); // Introduce a delay between iterations
      retryCount++;
    }
  };

  await fetch();

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
  const response = await axios.get(
    "https://recipes-with-mongodb.onrender.com/diets"
  );
  return response.data;
});

const fetchRecipesByName = createAsyncThunk(
  "recipe/fetchRecipesByName",
  async (name: string) => {
    const response = await axios.get(
      `https://recipes-with-mongodb.onrender.com/recipes?name=${name}`
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
    const response = await axios.get(
      `https://recipes-with-mongodb.onrender.com/recipes/${id}`
    );
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
    return dataToReturn;
  }
);
export interface postRecipesProps {
  name: string;
  summary: string;
  healthScore: number;
  image: string;
  steps: string[];
  diets: string[];
}

const postRecipes = createAsyncThunk(
  "recipe/postRecipes",
  async (recipe: postRecipesProps) => {
    if (recipe.image === "") recipe.image = noImg;
    const response = await axios.post(
      "https://recipes-with-mongodb.onrender.com/recipes",
      recipe
    );
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
