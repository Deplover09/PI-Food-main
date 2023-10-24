import express from "express";
import {
  dBRecipes,
  dBRecipesByName,
  dBRecipesByID,
} from "../controllers/recipesControllers";

const getRecipes = async (req: express.Request, res: express.Response) => {
  const { name }: { name?: string } = req.query;

  try {
    if (!name) return res.send(await dBRecipes());
    const recipesFromDbByName = await dBRecipesByName(name);
    if (recipesFromDbByName) return res.send(recipesFromDbByName);
    return res.status(404).send("recipe not found");
  } catch (err) {
    console.log(err);
  }
};

const getRecipesByID = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  if (!id) return res.status(404).send("missing id");
  const recipe = await dBRecipesByID(id);
  if (recipe) return res.send(recipe);
  else return res.status(404).send("recipe not found");
};

export { getRecipes, getRecipesByID };
