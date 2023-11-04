import DietModel, { type Diet } from "../models/dietModel";
import type mongoose from "mongoose";

interface dietObject {
  id: string;
  name: string;
  recipes: mongoose.Schema.Types.ObjectId[] | string[];
}

const saveDiets = async (name: string): Promise<Diet> => {
  return await new DietModel({ name }).save();
};
const dbDiets = async (): Promise<dietObject[] | undefined> => {
  const dietsFromDB = await DietModel.find();
  const propertiesINeed = dietsFromDB.map((d) => {
    const diet: dietObject = {
      id: d._id,
      name: d.name,
      recipes: d.recipes
    };
    return diet;
  });
  return propertiesINeed;
};

const dbDietsByName = async (
  dietName: string
): Promise<dietObject | undefined> => {
  const dietFromDB = await DietModel.findOne({ name: dietName });
  if (dietFromDB !== null && dietFromDB !== undefined) {
    return {
      id: dietFromDB._id,
      name: dietFromDB.name,
      recipes: dietFromDB.recipes
    };
  }
  return undefined;
};
const dbDietsByID = async (id: string): Promise<Diet | null> =>
  await DietModel.findById(id);

const addRecipeToDietsCollection = async (
  idDiet: string,
  idRecipe: mongoose.Schema.Types.ObjectId & string
): Promise<string> => {
  const diet = await dbDietsByID(idDiet);
  if (diet !== null) {
    diet.recipes.push(idRecipe);
    await diet.save();
    return "recipe added";
  }
  return "diet was not added";
};

export {
  saveDiets,
  dbDiets,
  dbDietsByName,
  dbDietsByID,
  addRecipeToDietsCollection
};
