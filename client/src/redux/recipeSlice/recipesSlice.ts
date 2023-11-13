import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import asyncActions from "./asyncActions";

interface Recipe {
  id: string;
  name: string;
  summary: string;
  healthScore: number;
  image: string;
  steps: string[];
  diets: string[];
  createdByUsers: boolean;
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
  reducers: {
    filterByDiet: (state: State, action: PayloadAction<string>) => {
      const allRecipes2 = state.backUpRecipes;
      const typesFiltered =
        action.payload === "types"
          ? allRecipes2
          : allRecipes2.filter((e) => e.diets?.includes(action.payload));
      state.recipes = typesFiltered;
    },
    filterByCreated: (state: State, action: PayloadAction<string>) => {
      const allRecipes = state.recipes;
      action.payload === "Created" &&
        (state.recipes = allRecipes.filter((e) => e.createdByUsers));
      action.payload === "Api" &&
        (state.recipes = allRecipes.filter((e) => !e.createdByUsers));
    },
    orderByName: (state: State, action: PayloadAction<string>) => {
      action.payload === "A to Z" &&
        (state.recipes = state.recipes.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        }));
      action.payload === "Z to A" &&
        (state.recipes = state.recipes.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        }));
    },
    orderByHealthScore: (state: State, action: PayloadAction<string>) => {
      action.payload === "asc" &&
        (state.recipes = state.recipes.sort(function (a, b) {
          return b.healthScore - a.healthScore;
        }));
      action.payload === "des" &&
        (state.recipes = state.recipes.sort(function (a, b) {
          return a.healthScore - b.healthScore;
        }));
    },
    clearDetail: (state: State) => {
      state.detail = undefined;
    },
    clearRecipes: (state: State) => {
      state.recipes = [];
      state.backUpRecipes = [];
      state.detail = undefined;
    }
  },
  extraReducers: (builder) => {
    asyncActions(builder);
  }
});

const recipeReducer = recipeSlice.reducer;
export const {
  filterByCreated,
  filterByDiet,
  orderByHealthScore,
  orderByName,
  clearDetail,
  clearRecipes
} = recipeSlice.actions;

export { recipeReducer, type State, type Recipe, type Diets };
