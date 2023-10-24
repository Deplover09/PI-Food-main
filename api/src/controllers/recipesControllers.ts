import recipeModel from "../models/recipeModel";
import { dbDietsByName } from "./dietsControllers";
const saveRecipes = async (
  name: string,
  image: string,
  healthScore: number,
  summary: string,
  steps: string,
  diets: Array<string>,
  createdByUsers?: boolean
) => {
  const idsDiets = async (arr: Array<string>) => {
    const dietsArray = await Promise.all(
      arr.map(async (dietName: string) => {
        return await dbDietsByName(dietName);
      })
    );
    return dietsArray.flat().map((d) => d && d._id && d._id);
  };

  const IDdietsArray = await idsDiets(diets);

  createdByUsers ? createdByUsers : (createdByUsers = false);

  const newRecipes = new recipeModel({
    name,
    image,
    healthScore,
    summary,
    steps,
    diets: IDdietsArray,
    createdByUsers,
  });
  // console.log(newRecipes)
  return await new recipeModel(newRecipes).save();
};

const dBRecipes = async () => await recipeModel.find();
const dBRecipesByName = async (recipeName: string) =>
  await recipeModel.find({ name: recipeName });
const dBRecipesByID = async (id: string) => await recipeModel.findById(id);

export { saveRecipes, dBRecipes, dBRecipesByName, dBRecipesByID };
