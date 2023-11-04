import RecipeModel, { type Recipe } from "../models/recipeModel";
import { dbDietsByName } from "./dietsControllers";

const saveRecipes = async (
  name: string,
  image: string,
  healthScore: number,
  summary: string,
  steps: string,
  diets: string[],
  createdByUsers?: boolean
): Promise<Recipe | undefined> => {
  const idsDiets = async (
    arr: string[]
  ): Promise<Array<string | undefined>> => {
    const dietsArray = await Promise.all(
      arr.map(async (dietName: string) => {
        return await dbDietsByName(dietName);
      })
    );
    return dietsArray.flat().map((d) => d?.id);
  };

  const IDdietsArray = await idsDiets(diets);

  createdByUsers === undefined && (createdByUsers = false);

  const newRecipes = new RecipeModel({
    name,
    image,
    healthScore,
    summary,
    steps,
    diets: IDdietsArray,
    createdByUsers
  });
  await new RecipeModel(newRecipes).save();
  const isRecipeCreated = await dBRecipesByName(name);
  return isRecipeCreated;
};

const dBRecipes = async (): Promise<Recipe[] | undefined> =>
  await RecipeModel.find();
const dBRecipesByName = async (
  recipeName: string
): Promise<Recipe | undefined> => {
  const theRecipe = await RecipeModel.find({ name: recipeName });
  if (theRecipe !== undefined && theRecipe !== null) return theRecipe[0];
  else return undefined;
};

const dBRecipesByID = async (id: string): Promise<Recipe | undefined> => {
  const theRecipe = await RecipeModel.findById(id);
  if (theRecipe !== undefined && theRecipe !== null) return theRecipe;
  else return undefined;
};

export { saveRecipes, dBRecipes, dBRecipesByName, dBRecipesByID };
