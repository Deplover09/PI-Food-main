import type express from "express";
import { RecipeModel } from "../models/exportModels";
import { type Ref } from "@typegoose/typegoose";
import { type Diet } from "../models/dietModel";
import mongoose from "mongoose";

const getRecipes = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  const { name }: { name?: string } = req.body;

  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/foods");
    if (name !== null && name !== undefined) {
      const recipesFromDbByName = await RecipeModel.findByName(name);
      if (recipesFromDbByName !== null && recipesFromDbByName !== undefined)
        return res.send(recipesFromDbByName);
      else return res.status(404).send("recipe not found");
    } else {
      const recipes = await RecipeModel.find();
      if (recipes !== null && recipes !== undefined) return res.send(recipes);
      else return res.status(404).send("recipe not found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  } finally {
    mongoose.disconnect();
  }
};

const getRecipesByID = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  const { id } = req.params;
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/foods");
    if (id !== undefined && id !== null) {
      const recipe = await RecipeModel.findById(id);
      if (recipe !== undefined && recipe !== null) return res.send(recipe);
    } else return res.status(404).send("recipe not found");
    return res.status(404).send("missing id");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  } finally {
    mongoose.disconnect();
  }
};

const postRecipes = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  const { name }: { name?: string } = req.body;
  const { image }: { image?: string } = req.body;
  const { healthScore }: { healthScore?: number } = req.body;
  const { summary }: { summary?: string } = req.body;
  const { steps }: { steps?: string[] } = req.body;
  const { diets }: { diets?: Array<Ref<typeof Diet>> } = req.body;
  if (
    name === undefined ||
    image === undefined ||
    healthScore === undefined ||
    summary === undefined ||
    steps === undefined ||
    diets === undefined
  )
    return res.status(404).send("All recipes characteristics are required");
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/foods");
    const savingRecipe = await RecipeModel.createRecipe(
      name,
      image,
      healthScore,
      summary,
      steps,
      diets
    );
    if (savingRecipe !== null && savingRecipe !== undefined)
      return res.send("recipe created");
    else return res.status(404).send("recipe not created");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  } finally {
    mongoose.disconnect();
  }
};

export { getRecipes, getRecipesByID, postRecipes };
