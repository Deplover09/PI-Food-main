import {
  createSlice,
  // type PayloadAction,
  createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

interface Recipe {
  id: string;
  name: string;
  diets: string[];
  healthScore: number;
  createdInDb: boolean;
}
interface State {
  recipes: Recipe[] | [];
  diets: string[] | [];
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

const fetchRecipes = createAsyncThunk("recipe/fetchAll", async () => {
  const response = await axios.get("http://localhost:3001/recipes");
  return response.data;
});

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.recipes = action.payload;
      state.backUpRecipes = action.payload;
    });
  }
});

const recipeReducer = recipeSlice.reducer;

export { recipeReducer, fetchRecipes };
