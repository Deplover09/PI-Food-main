const { Router } = require('express');
const axios = require('axios');
const {Recipe, DietTypes} = require('../db.js');
const {APIKEY} = process.env;

const router = Router();

router.get('/', async (req, res ) => {
       const dietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&number=100&addRecipeInformation=true`)
  const diets = dietsApi.data.results.map(el => el.diets)
  

  diets.flat().forEach( el => {
    DietTypes.findOrCreate({
      where: {name: el}
    })
  })

  const allDiets = await DietTypes.findAll();
  return res.send(allDiets);
})

  module.exports = router;



  // router.get('/types', async (req, res) => {
  //   const recipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
  //   const types = await recipesApi.data.results.map(el => el.diets);
  //   const diets = types.flat();
  //   const typeDiets = [...new Set(diets), ];
  //   typeDiets.forEach(el => {
  //       TypeDiet.findOrCreate({
  //           where: {name: el},
  //       })
  //   })
  //   const allDiets = await TypeDiet.findAll();
  //   res.send(allDiets);
// });