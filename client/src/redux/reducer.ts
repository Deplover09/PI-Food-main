interface Recipe {
  id: string;
  name: string;
  diets: string[];
  healthScore: number;
  createdInDb: boolean;
}

interface State {
  recipes: Recipe[];
  diets: string[];
  detail: Recipe ;
  error: any[];
  backUpRecipes: Recipe[];
}

const initialState: State = {
  recipes: [],
  diets: [],
  detail: {},
  error: [],
  backUpRecipes: [],
}


// const rootReducer = (state: State = initialState, action: Action): State => {

//   return Cases[action.type] &&  Cases[action.type](state, action) || state;
// }
  // switch (action.type) {
  //   case "GET_RECIPES":
  //     return {
  //       ...state,
  //       recipes: action.payload,
  //       backUpRecipes: action.payload,
  //     };

  //   case "GET_DIETS":
  //     return {
  //       ...state,
  //       diets: action.payload,
  //     };

  //   case "FILTER_BY_DIET":
  //     const allRecipes2 = state.backUpRecipes;
  //     const typesFiltered =
  //       action.payload === "types"
  //         ? allRecipes2
  //         : allRecipes2.filter((e) => e.diets?.includes(action.payload));
  //     return {Recipe

  //   case "FILTER_BY_CREATED":
  //     const allRecipes = state.backUpRecipes;
  //     const createdFilter =
  //       action.payload === "Created"
  //         ? allRecipes.filter((e) => e.createdInDb)
  //         : allRecipes.filter((e) => !e.createdInDb);
  //     return {
  //       ...state,
  //       recipes: action.payload === "Recipes" ? state.backUpRecipes : createdFilter,
  //     };

  //   case "ORDER_BY_NAME":
  //     let orderName =
  //       action.payload === "asc"
  //         ? state.recipes.sort(function (a, b) {
  //             if (a.name > b.name) {
  //               return 1;
  //             }
  //             if (b.name > a.name) {
  //               return -1;
  //             }
  //             return 0;
  //           })
  //         : state.recipes.sort(function (a, b) {
  //             if (a.name > b.name) {
  //               return -1;
  //             }
  //             if (b.name > a.name) {
  //               return 1;
  //             }
  //             return 0;
  //           });
  //     return {
  //       ...state,
  //       recipes: orderName,
  //     };

  //   case "ORDER_BY_HEALTH_SCORE":
  //     let orderScore =
  //       action.payload === "asc"
  //         ? state.recipes.sort((a, b) => b.healthScore - a.healthScore)
  //         : state.recipes.sort((a, b) => a.healthScore - b.healthScore);
  //     return {
  //       ...state,
  //       recipes: orderScore,
  //     };

  //   case "GET_RECIPE_BY_NAME":
  //     return {
  //       ...state,
  //       recipes: action.payload.err ? [{ Error: "No Recipes Found" }] : action.payload,
  //     };

  //   case "GET_REPICE_PARAMS":
  //     return {
  //       ...state,
  //       detail: action.payload,
  //     };

  //   case "POST_RECIPE":
  //     return {
  //       ...state,  switch (action.type) {
  //         case "GET_RECIPES":
  //           return {
  //             ...state,
  //             recipes: action.payload,
  //             backUpRecipes: action.payload,
  //           };
      
  //         case "GET_DIETS":
  //           return {
  //             ...state,
  //             diets: action.payload,
  //           };
      
  //         case "FILTER_BY_DIET":
  //           const allRecipes2 = state.backUpRecipes;
  //           const typesFiltered =
  //             action.payload === "types"
  //               ? allRecipes2
  //               : allRecipes2.filter((e) => e.diets?.includes(action.payload));
  //           return {Recipe
      
  //         case "FILTER_BY_CREATED":
  //           const allRecipes = state.backUpRecipes;
  //           const createdFilter =
  //             action.payload === "Created"
  //               ? allRecipes.filter((e) => e.createdInDb)
  //               : allRecipes.filter((e) => !e.createdInDb);
  //           return {
  //             ...state,
  //             recipes: action.payload === "Recipes" ? state.backUpRecipes : createdFilter,
  //           };
      
  //         case "ORDER_BY_NAME":
  //           let orderName =
  //             action.payload === "asc"
  //               ? state.recipes.sort(function (a, b) {
  //                   if (a.name > b.name) {
  //                     return 1;
  //                   }
  //                   if (b.name > a.name) {
  //                     return -1;
  //                   }
  //                   return 0;
  //                 })
  //               : state.recipes.sort(function (a, b) {
  //                   if (a.name > b.name) {
  //                     return -1;
  //                   }
  //                   if (b.name > a.name) {
  //                     return 1;
  //                   }
  //                   return 0;
  //                 });
  //           return {
  //             ...state,
  //             recipes: orderName,
  //           };
      
  //         case "ORDER_BY_HEALTH_SCORE":
  //           let orderScore =
  //             action.payload === "asc"
  //               ? state.recipes.sort((a, b) => b.healthScore - a.healthScore)
  //               : state.recipes.sort((a, b) => a.healthScore - b.healthScore);
  //           return {
  //             ...state,
  //             recipes: orderScore,
  //           };
      
  //         case "GET_RECIPE_BY_NAME":
  //           return {
  //             ...state,
  //             recipes: action.payload.err ? [{ Error: "No Recipes Found" }] : action.payload,
  //           };
      
  //         case "GET_REPICE_PARAMS":
  //           return {
  //             ...state,
  //             detail: action.payload,
  //           };
      
  //         case "POST_RECIPE":
  //           return {
  //             ...state,
  //           };
      
  //         case "CLEAR_DETAIL":
  //           return {
  //             ...state,
  //             detail: {},
  //           };
      
  //         case "CLEAN_RECIPES":
  //           return {
  //             ...state,
  //             recipes: [],
  //             backUpRecipes: [],
  //             detail: {},
  //           };
      
  //         default:
  //           return state;
  //       }
  //     return {
  //       ...state,
  //       detail: {},
  //     };

  //   case "CLEAN_RECIPES":
  //     return {
  //       ...state,
  //       recipes: [],
  //       backUpRecipes: [],
  //       detail: {},
  //     };

  //   default:
  //     return state;
  // }


export {rootReducer,State };
