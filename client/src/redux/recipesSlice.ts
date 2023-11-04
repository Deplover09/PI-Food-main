import {
  createSlice,
  // type PayloadAction,
  createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

interface Recipe {
  id: string;
  name: string;
  image: string;
  diets: string[];
  healthScore: number;
  createdInDb: boolean;
}
export interface diets {
  id: string;
  name: string;
  recipes: string[];
}
interface State {
  recipes: Recipe[] | [];
  diets: diets[] | [];
  detail: Recipe | object;
  error: object[];
  backUpRecipes: Recipe[] | [];
}

const initialState: State = {
  recipes: [],
  diets: [],
  detail: {},
  error: [{}],
  backUpRecipes: []
};

const fetchRecipes = createAsyncThunk("recipe/fetchAllRecipes", async () => {
  console.log("se ue");
  const response = await axios.get("http://localhost:3001/recipes");
  console.log("llego");
  return response.data;
});

const fetchDiets = createAsyncThunk("recipe/fetchAllDiets", async () => {
  const response = await axios.get("http://localhost:3001/diets");
  return response.data;
});

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.recipes = action.payload;
        state.backUpRecipes = action.payload;
      })
      .addCase(fetchDiets.fulfilled, (state, action) => {
        state.diets = action.payload;
      });
  }
});

const recipeReducer = recipeSlice.reducer;

export { recipeReducer, fetchRecipes, fetchDiets };
