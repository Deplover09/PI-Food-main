const { Router } = require('express');
const {Recipe, DietTypes} = require('../db.js');
const axios = require('axios');

const router = Router();


router.post('/', async (req, res) => {
  let{
      name,
      summary,
      score,
      healthScore,
      image,
      steps,
      diets,
  } = req.body


  try{
      let recipeCreate = await Recipe.create({ 
          name,
          summary,
          score,
          healthScore,
          image,
          steps
          
      })

      let dietDB = await DietTypes.findAll({ 
          where: {name: diets}
      })

    //   if (!name) return res.status(400).send({error: 'Debe ingresar el name para la receta'});
    //   if (!summary) return res.status(400).send({error: 'Debe ingresar un summary del receta'});
      // console.log(recipeCreate);
      // console.log(dietDB);
      
      recipeCreate.addDietTypes(dietDB);

      
      res.send(recipeCreate);

  }catch(error){
      res.status(400).send(error);
  }
})

  module.exports = router;


