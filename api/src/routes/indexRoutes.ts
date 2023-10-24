import { Router } from 'express';
import {getDietsRoute, getDietsIDRoute} from "./dietsRoutes"
import {getRecipes, getRecipesByID} from "./recipesRoutes"

// import getRecipes from './recipesRoutes'; 
// const recipesParamsRoute = require('./getRecipeParams.js')
// const dietsRoute = require ('./getDiets.js')
// const postRoute = require ('./postRecipe.js')
const router = Router();

// router.use('/recipes', getRecipes);
// router.use('/recipesParams', recipesParamsRoute); //715594

router.get('/diets', getDietsRoute);
router.get('/diets/:id', getDietsIDRoute)
router.get("/recipes", getRecipes)
router.get("/recipes/:id", getRecipesByID)


export default router;