import type express from "express";
import {
  dBRecipes,
  dBRecipesByName,
  dBRecipesByID,
  saveRecipes
} from "../controllers/recipesControllers";

const getRecipes = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  const { name }: { name?: string } = req.body;

  try {
    if (name !== null && name !== undefined) {
      const recipesFromDbByName = await dBRecipesByName(name);
      if (recipesFromDbByName !== null && recipesFromDbByName !== undefined)
        return res.send(recipesFromDbByName);
      else return res.status(404).send("recipe not found");
    } else {
      const recipes = await dBRecipes();
      if (recipes !== null && recipes !== undefined) return res.send(recipes);
      else return res.status(404).send("recipe not found");
    }
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};

const getRecipesByID = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  const { id } = req.params;
  if (id !== undefined && id !== null) {
    const recipe = await dBRecipesByID(id);
    if (recipe !== undefined && recipe !== null) return res.send(recipe);
  } else return res.status(404).send("recipe not found");
  return res.status(404).send("missing id");
};

const postRecipes = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response> => {
  const { name }: { name?: string } = req.body;
  const { image }: { image?: string } = req.body;
  const { healthScore }: { healthScore?: number } = req.body;
  const { summary }: { summary?: string } = req.body;
  const { steps }: { steps?: string } = req.body;
  const { diets }: { diets?: string[] } = req.body;
  const { createdByUsers }: { createdByUsers?: boolean } = req.body;
  console.log(name, image, healthScore, summary, steps, diets, createdByUsers);
  if (
    name === undefined ||
    image === undefined ||
    healthScore === undefined ||
    summary === undefined ||
    steps === undefined ||
    diets === undefined
  )
    return res.status(404).send("All recipes characteristics are required");
  const savingRecipe = await saveRecipes(
    name,
    image,
    healthScore,
    summary,
    steps,
    diets,
    createdByUsers
  );
  if (savingRecipe !== null && savingRecipe !== undefined)
    return res.send("recipe created");
  else return res.status(404).send("recipe not created");
};

export { getRecipes, getRecipesByID, postRecipes };
