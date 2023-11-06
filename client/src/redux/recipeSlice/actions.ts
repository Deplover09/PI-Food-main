import { type State } from "./recipesSlice";
import { type PayloadAction } from "@reduxjs/toolkit";

const actions = {
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
};

export default actions;
