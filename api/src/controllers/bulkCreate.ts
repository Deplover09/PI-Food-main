import axios from "axios";
// import { type Recipe } from "../models/recipeModel";
import { dBRecipes, saveRecipes } from "./recipesControllers";
import {
  saveDiets,
  dbDiets,
  addRecipeToDietsCollection
} from "./dietsControllers";
// import type mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
// require("dotenv").config();

const APIKEY = process.env.APIKEY;
interface recipeApi {
  title: string | undefined | null;
  image: string | undefined | null;
  healthScore: number | undefined | null;
  summary: string | undefined | null;
  diets: string[] | undefined | null;
  analyzedInstructions: string | undefined | null;
}
type AnalyzedInstructionsType =
  | Array<{
      steps: Array<{ step: string }> | undefined | null;
    }>
  | undefined
  | null;

interface infoRecipe {
  name: string | undefined | null;
  image: string | undefined | null;
  healthScore: number | undefined | null;
  summary: string | undefined | null;
  diets: string[] | undefined | null;
  steps: string | undefined | null;
}

interface allRecipesPropertiesAreThere {
  name: string;
  image: string;
  healthScore: number;
  summary: string;
  diets: string[];
  steps: string;
}

const getRecipesApi = async (): Promise<infoRecipe[] | []> => {
  try {
    const url = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`
    );

    const results = url.data.results;

    if (results.length > 0) {
      const response = await Promise.all(
        results.map((result: recipeApi) => {
          const firstStep = (
            result.analyzedInstructions as AnalyzedInstructionsType
          )?.[0]?.steps;
          const step = firstStep?.map((s) => s.step).join(" \n");
          return {
            name: result.title,
            image: result.image,
            healthScore: result.healthScore,
            diets: result.diets?.map((element: string) => element),
            summary: result.summary,
            steps: step
          };
        })
      );
      console.log(response[0]);

      return response;
    }
  } catch (error) {
    console.error(error);
    return [];
  }

  return [];
};

const getDietsApi = async (): Promise<string[]> => {
  try {
    const dietsApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&number=100&addRecipeInformation=true`
    );
    const diets = dietsApi.data.results.map((el: recipeApi) => el.diets);
    // console.log(diets)
    return diets;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const bulkCreateDiets = async (arr: string[]): Promise<void> => {
  const dietsArray = arr.flat();

  const removeDuplicates = Array.from(new Set(dietsArray));

  await Promise.all(
    removeDuplicates.map(async (diet: string) => {
      await saveDiets(diet);
    })
  );
};

const recipesAreComplete = async (): Promise<
  allRecipesPropertiesAreThere[]
> => {
  const recipesFromApi = await getRecipesApi();
  const filterArray = recipesFromApi
    .map((obj) => {
      const filteredObj: allRecipesPropertiesAreThere = {
        name: obj.name ?? "",
        image: obj.image ?? "",
        healthScore: obj.healthScore ?? 0,
        summary: obj.summary ?? "",
        diets: obj.diets ?? [],
        steps: obj.steps ?? ""
      };

      // Check if any property in the filtered object is empty
      if (
        filteredObj.name === "" ||
        filteredObj.image === "" ||
        filteredObj.healthScore === 0 ||
        filteredObj.summary === "" ||
        filteredObj.diets.length === 0 ||
        filteredObj.steps.length === 0
      ) {
        return null; // Filter out objects with empty properties
      }

      return filteredObj;
    })
    .filter((obj): obj is allRecipesPropertiesAreThere => obj !== null);

  return filterArray;
};

const bulkCreate = async (): Promise<void> => {
  const allRecipes = await dBRecipes();
  const allDiets = await dbDiets();
  if (
    allRecipes !== null &&
    allRecipes !== undefined &&
    allDiets !== undefined
  ) {
    console.log("recipes and diets collection are not empty");
    return undefined;
  }

  const dietsFromApi = await getDietsApi();

  await bulkCreateDiets(dietsFromApi);
  const recipesComplete = await recipesAreComplete();
  recipesComplete !== null &&
    recipesComplete !== undefined &&
    allDiets !== undefined &&
    (await Promise.all(
      recipesComplete.map(async (recipe) => {
        const { name, image, healthScore, summary, steps, diets } = recipe;
        const repiceSaved = await saveRecipes(
          name,
          image,
          healthScore,
          summary,
          steps,
          diets
        );
        repiceSaved !== null &&
          repiceSaved !== undefined &&
          (await Promise.all(
            repiceSaved.diets.map(async (d) => {
              return await addRecipeToDietsCollection(
                d,
                repiceSaved._id.toString()
              );
            })
          ));
      })
    ));
};

export default bulkCreate;
