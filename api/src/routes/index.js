const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipesRoute = require('./getRecipes.js') 
const recipesParamsRoute = require('./getRecipeParams.js')
const dietsRoute = require ('./getDiets.js')
const postRoute = require ('./postRecipe.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipesRoute);
router.use('/recipesParams', recipesParamsRoute); //715594
router.use('/diets', dietsRoute);
router.use('/postRecipe', postRoute)


module.exports = router;
