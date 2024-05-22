import axios from "axios";
import { RecipeModel, DietModel } from "./models/exportModels";
import { type Schema } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

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
  steps: string[] | undefined | null;
}

interface allRecipesPropertiesAreThere {
  name: string;
  image: string;
  healthScore: number;
  summary: string;
  diets: string[];
  steps: string[];
}

const getRecipesApi = async (): Promise<infoRecipe[] | []> => {
  try {
    const url = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&instructionsRequired=true&addRecipeInformation=true&number=500`
    );

    const results = url.data.results;

    if (results.length > 0) {
      const response = await Promise.all(
        results.map((result: recipeApi) => {
          const firstStep = (
            result.analyzedInstructions as AnalyzedInstructionsType
          )?.[0]?.steps;
          const step = firstStep?.map((s) => s.step);
          return {
            name: result.title,
            image: result.image,
            healthScore: result.healthScore,
            diets: result.diets?.map((element: string) => element),
            summary: result.summary?.replace(/<[^>]*>?/g, ""),
            steps: step
          };
        })
      );
      // console.log(response[0], 66);
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
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&number=500&addRecipeInformation=true&addRecipeInformation=true`
    );
    const diets = dietsApi.data.results.map((el: recipeApi) => el.diets);
    return diets;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const bulkCreateDiets = async (arr: string[]): Promise<void> => {
  const dietsArray = arr.flat();

  const removeDuplicates = Array.from(new Set(dietsArray));
  const strignToObj = removeDuplicates.map((d) => {
    return { name: d };
  });
  await DietModel.insertMany(strignToObj);
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
        steps: obj.steps ?? []
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
  const allRecipes = await RecipeModel.find();
  const allDiets = await DietModel.find();
  if (allRecipes?.[0] !== undefined && allDiets?.[0] !== undefined) {
    console.log("recipes and diets collection are not empty");
    return undefined;
  }
  const dietsFromApi = await getDietsApi();

  await bulkCreateDiets(dietsFromApi);
  const recipesComplete = await recipesAreComplete();
  if (
    recipesComplete !== null &&
    recipesComplete !== undefined &&
    allDiets !== undefined
  ) {
    const PropertiesForRecipes = await Promise.all(
      recipesComplete.map(async (r) => {
        const idDietsObj: Array<Schema.Types.ObjectId | null> =
          (await Promise.all(
            r.diets.map(async (d) => {
              const dietObj = await DietModel.findByName(d);
              if (
                dietObj !== null &&
                dietObj !== undefined &&
                "_id" in dietObj
              ) {
                return dietObj._id;
              } else {
                return null;
              }
            })
          )) as Array<Schema.Types.ObjectId | null>;
        return {
          name: r.name,
          image: r.image,
          healthScore: r.healthScore,
          summary: r.summary,
          steps: r.steps,
          diets: idDietsObj
        };
      })
    );
    await RecipeModel.insertMany(PropertiesForRecipes);

    const allRecipes = await RecipeModel.find();

    for (const r of allRecipes) {
      r.diets !== undefined &&
        r.diets !== null &&
        (await Promise.all(
          r.diets.map(async (d) => {
            return await DietModel.findByIdAndUpdate(d, {
              recipes: r._id
            });
          })
        ));
    }
  }
};

export default bulkCreate;
