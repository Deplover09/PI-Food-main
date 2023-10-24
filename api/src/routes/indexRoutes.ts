import { Router } from "express";
import { getDietsRoute, getDietsIDRoute } from "./dietsRoutes";
import { getRecipes, getRecipesByID, postRecipes } from "./recipesRoutes";

const router = Router();

router.get("/diets", getDietsRoute);
router.get("/diets/:id", getDietsIDRoute);
router.get("/recipes", getRecipes);
router.get("/recipes/:id", getRecipesByID);
router.post("/recipes", postRecipes)

export default router;
