import { Router } from 'express';
import {dietsRoute, dietsIDRoute} from "./dietsRoutes"

// import getRecipes from './recipesRoutes'; 
// const recipesParamsRoute = require('./getRecipeParams.js')
// const dietsRoute = require ('./getDiets.js')
// const postRoute = require ('./postRecipe.js')
const router = Router();

// router.use('/recipes', getRecipes);
// router.use('/recipesParams', recipesParamsRoute); //715594
router.use('/diets/:id', dietsIDRoute)
router.use('/diets', dietsRoute);


export default router;