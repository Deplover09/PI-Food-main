const { Router } = require('express');
const { getInfoByName, getAllInfo,  getDBInfo} = require('./functions')
// infoTotal, nameApi, infoDB,
const router = Router();

router.get('/', async (req, res  ) => {
  // Homemade Garlic and Basil French Fries
  const { name } = req.query; //el nombre me llega por query
// console.log(name)
try{
  if(name) { 
    const infoByName = await getInfoByName(name)
    return res.send(infoByName)

  }
  else {
     const repiceTotal = await  getAllInfo()
    // const repiceTotal = await getDBInfo()
    
   return  res.send(repiceTotal)
  }


  }
  catch(err) {
    console.log(err)
}
})

  module.exports = router;