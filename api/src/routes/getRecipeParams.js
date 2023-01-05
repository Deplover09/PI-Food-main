const { Router } = require('express');
const { getDBInfo, getIdApi} = require('./functions')
// infoTotal, nameApi, infoDB,
const router = Router();

router.get('/:idRecipes', async (req, res ) => {
  const { idRecipes } = req.params
  console.log(idRecipes)
  try{
 
  if(idRecipes){
    const recipesInfo = await getIdApi(idRecipes)
    const repiceDbInfo = await getDBInfo()
    const foundRepice = await repiceDbInfo.find(el => el.id == idRecipes)
    console.log(recipesInfo)
    console.log(foundRepice)
   

    if(recipesInfo){
      return res.send(recipesInfo)
    } else if (foundRepice){
      return res.send(foundRepice)
    } else {

      res.status(404).send('recipe not found')
    }

  } else{
    return res.status(400).send('there is no id')
  }
  } catch (error) {
    console.log(error)
  }
  


})

  module.exports = router;