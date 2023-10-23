import dietModel from "../models/dietModel";
import mongoose from "mongoose";

const saveDiets = async (name: string) => await new dietModel({ name }).save();

const dbDiets = async () => await dietModel.find();

const dbDietsByName = async (dietName: string) =>
  await dietModel.find({ name: dietName });

const dbDietsByID = async (id: string) => await dietModel.findById(id);

const addRecipeToDietsCollection = async (idDiet: string, idRecipe: string) => {
  const idRecipeType = new mongoose.Types.ObjectId(idRecipe);
  const diet = await dbDietsByID(idDiet);
  diet && diet.recipes.push(idRecipeType) && (await diet.save());
};

export {
  saveDiets,
  dbDiets,
  dbDietsByName,
  dbDietsByID,
  addRecipeToDietsCollection,
};
