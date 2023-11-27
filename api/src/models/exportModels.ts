import { getModelForClass } from "@typegoose/typegoose";
import { Diet } from "./dietModel";
import { Recipe } from "./recipeModel";

export const DietModel = getModelForClass(Diet);

export const RecipeModel = getModelForClass(Recipe);
