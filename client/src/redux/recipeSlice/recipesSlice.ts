import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
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
      const allRecipes = state.backUpRecipes;
      const createdFilter =
        action.payload === "Created"
          ? allRecipes.filter((e) => e.createdInDb)
          : allRecipes.filter((e) => !e.createdInDb);
      state.recipes = createdFilter;
    },
    orderByName: (state: State, action: PayloadAction<string>) => {
      const orderName =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      state.recipes = orderName;
    },
    orderByHealthScore: (state: State, action: PayloadAction<string>) => {
      const orderScore =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              return b.healthScore - a.healthScore;
            })
          : state.recipes.sort(function (a, b) {
              return a.healthScore - b.healthScore;
            });
      state.recipes = orderScore;
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
