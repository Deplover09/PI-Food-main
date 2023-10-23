import axios from "axios";
import recipeModel from "../models/recipeModel";
import dietModel from "../models/dietModel";
import { saveRecipes, } from "./recipesControllers";
import {
  saveDiets,
  dbDiets,
  addRecipeToDietsCollection,
} from "./dietsControllers";
require("dotenv").config();

const APIKEY = process.env.APIKEY;

const getRecipesApi = async (): Promise<any[]> => {
  try {
    const url = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`
    );

    const results = url.data.results;

    if (results.length > 0) {
      const response = await Promise.all(
        results.map((result: any) => ({
          name: result.title,
          image: result.image,
          healthScore: result.healthScore,
          diets: result.diets?.map((element: string) => element),
          summary: result.summary,
          steps: result.analyzedInstructions[0]
            ? result.analyzedInstructions[0].steps &&
              result.analyzedInstructions[0].steps[0] &&
              result.analyzedInstructions[0].steps
                .map((item: any) => item.step)
                .join(" \n")
            : false,
        }))
      );

      return response;
    }
  } catch (error) {
    console.error(error);
    return [];
  }

  return [];
};

const getDietsApi = async (): Promise<any[]> => {
  try {
    const dietsApi = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&number=100&addRecipeInformation=true`
    );
    const diets = dietsApi.data.results.map((el: any) => el.diets);
    // console.log(diets)
    return diets;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const bulkCreateDiets = async (arr: Array<string>) => {
  const dietsArray = arr.flat();

  const removeDuplicates = Array.from(new Set(dietsArray));

  await Promise.all(
    removeDuplicates.map(async (diet: string) => {
      await saveDiets(diet);
    })
  );
};

const recipesAreComplete = async () => {
  const recipesFromApi = await getRecipesApi();
  let numeroos = 0;
  const areAllCharacteristics = (obj: Object) => {
    for (let c of Object.entries(obj)) {
      const [, value] = c;
      if (value === undefined || value === null || value === false) {
        return false;
      }
    }
    return true;
  };

  return recipesFromApi.filter((obj) => areAllCharacteristics(obj) === true);
};

const bulkCreate = async () => {
  const allRecipes = await recipeModel.find();
  const allDiets = await dietModel.find();
  if (allRecipes[0] && allDiets[0]) {
    console.log("recipes and diets collection are not empty");
    return undefined;
  }
  const dietsFromApi = await getDietsApi();

  await bulkCreateDiets(dietsFromApi);
  const recipesFromApi = await getRecipesApi();
  const recipesComplete = await recipesAreComplete();
  const dbDietsData = await dbDiets();
  dbDietsData[0] &&
    recipesComplete &&
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
        // console.log(recipe)
        repiceSaved &&
          (await Promise.all(
            repiceSaved.diets.map(async (d) => {
              return await addRecipeToDietsCollection(
                d.toString(),
                repiceSaved._id.toString()
              );
            })
          ));
      })
    ));
};

export default bulkCreate;
