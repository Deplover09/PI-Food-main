import axios from 'axios';
import { Dispatch } from 'redux';

export const getRepices = () => {
  return async (dispatch: Dispatch) => {
    try {
      const json = await axios.get("https://pi-food-vercel-fcbk.vercel.app/recipes");
      dispatch({
        type: "GET_RECIPES",
        payload: json.data
      });
    } catch (error) {
      console.log("getRepices error:", error);
    }
  };
};

export const getDiets = () => {
  return async (dispatch: Dispatch) => {
    try {
      const json = await axios.get("https://pi-food-vercel-fcbk.vercel.app/diets");
      dispatch({
        type: "GET_DIETS",
        payload: json.data
      });
    } catch (error) {
      console.log("getDiets error:", error);
    }
  };
};

export const filterRecipesByDiets = (payload: string) => {
  return {
    type: "FILTER_BY_DIET",
    payload: payload
  };
};

export const filterByCreated = (payload: string) => {
  return {
    type: "FILTER_BY_CREATED",
    payload: payload
  };
};

export const orderByHealthScore = (payload: string) => {
  return {
    type: "ORDER_BY_HEALTH_SCORE",
    payload: payload
  };
};

export const orderByName = (payload: string) => {
  return {
    type: "ORDER_BY_NAME",
    payload: payload
  };
};

export const getNameRecipe = (payload: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const json = await axios.get(`https://pi-food-vercel-fcbk.vercel.app/recipes?name=${payload}`);
      dispatch({
        type: "GET_RECIPE_BY_NAME",
        payload: json.data
      });
    } catch (error) {
      console.log("getNameRecipe error:", error);
    }
  };
};

export const postRecipe = (payload: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post("https://pi-food-vercel-fcbk.vercel.app/postRecipe", payload);
      console.log(response);
      return response;
    } catch (error) {
      console.log("postRecipe error:", error);
    }
  };
};

export const recipeParams = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const json = await axios.get(`https://pi-food-vercel-fcbk.vercel.app/recipesParams/${id}`);
      dispatch({
        type: "GET_REPICE_PARAMS",
        payload: json.data
      });
    } catch (error) {
      console.log("recipeParams error:", error);
    }
  };
};

export const clearDetail = () => {
  return {
    type: "RESET_DETAIL"
  };
};

export const cleanRecipes = () => {
  return {
    type: "CLEAN_RECIPES"
  };
};
