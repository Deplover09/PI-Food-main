import { Router } from 'express';
import dietsRoute from "./dietsRoutes"

// import getRecipes from './recipesRoutes'; 
// const recipesParamsRoute = require('./getRecipeParams.js')
// const dietsRoute = require ('./getDiets.js')
// const postRoute = require ('./postRecipe.js')
const router = Router();

// router.use('/recipes', getRecipes);
// router.use('/recipesParams', recipesParamsRoute); //715594
router.use('/diets', dietsRoute);
// router.use('/postRecipe', postRoute)

export default router;