const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();

const {Recipe, DietTypes} = require('../db.js');
const {APIKEY} = process.env;



const  getApiInfo = async() => {
  try{
    
    const url = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`);

const results = url.data.results;
// console.log(url)
// console.log(results)

  if(results.length > 0 ){

    
    let response = await results?.map((result) => {
      return {
          name: result.title,
          vegetarian: result.vegetarian,
          vegan: result.vegan,
          glutenFree: result.glutenFree,
          dairyFree: result.dairyFree, 
          image: result.image, 
          id: result.id, 
          score: result.spoonacularScore,
          healthScore: result.healthScore,
          types: result.dishTypes?.map(element => element),  
          diets: result.diets?.map(element => element), 
          summary:result.summary, 
          steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
      }        
  })

return response;
  }

  } catch (error) {
    console.error(error);
    return ([])
}
  }


  const getDBInfo = async () => {
    try{
        const dataDB =  await Recipe.findAll({ 
            include:{
                model: DietTypes,
                attributes: ['name'],
                through:{
                    attributes: []
                }
            }
        })
        let response = await dataDB?.map(recipe => {
          console.log(recipe)
                 return {
                     id: recipe.id,
                     name: recipe.name,
                     summary: recipe.summary,
                     healthScore: recipe.healthScore,
                     image: recipe.image,
                     steps: recipe.steps,
                     diets: recipe.dietTypes?.map(diet => diet.name),
                     createdInDb: recipe.createdInDb
                 }
             });

             console.log(response)
        return response;
    }catch (error) {
      console.error(error);
    }
}


const getAllInfo = async () => {
  try{
      const apiInfo = await getApiInfo();
      const dbInfo = await getDBInfo();
      const infoTotal = [...apiInfo, ...dbInfo]; 
      return infoTotal;
  }catch (error) {
      console.error(error);
  }
}

const getApiByName = async (name) => {
           
  try{
      const resAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${APIKEY}`);
      const { results } = resAxios.data;
      if(results.length > 0){
          let response = results?.map((result) => {
              return {
                  name: result.title,
                  vegetarian: result.vegetarian,
                  vegan: result.vegan,
                  glutenFree: result.glutenFree,
                  dairyFree: result.dairyFree, 
                  image: result.image, 
                  idApi: result.id, 
                  score: result.spoonacularScore,
                  healthScore: result.healthScore,
                  types: result.dishTypes?.map(element => element),  
                  diets: result.diets?.map(element => element), 
                  summary:result.summary, 
                  steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
              }
          })
    return response           
  }

  else{
      console.log("NO hay coincidencia en la API");
      //return ('error');
  }

  }catch (error) {
      console.error(error);
      return ('error')
  }
}

const getDBByName = async (name) => {
  try{
      const DBInfo = await getDBInfo();
      const filtByName = DBInfo.filter(recipe => recipe.name.includes(name));
     
      return filtByName;
  }catch (error) {
      return ('error')
  } 
}

const getInfoByName = async (name) => {
  try{
      const apiByName = await getApiByName(name)
      const DBByName = await getDBByName(name)
      const infoTotal = apiByName.concat(DBByName)
      return infoTotal
  }catch (error) {
      return ('error')
  }
}  

const getIdApi = async (id) => {
try{
const url = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIKEY}&addRecipeInformation=true&number=100`);
                const result = url.data;
                console.log(url)
                let obj = {};
                let arr =
    
                obj = {
                    name: result.title, 
                    vegetarian: result.vegetarian,
                    vegan: result.vegan,
                    glutenFree: result.glutenFree,
                    dairyFree: result.dairyFree,
                    image: result.image, 
                    id: result.id, 
                    score: result.spoonacularScore, 
                    healthScore: result.healthScore, 
                    diets: result.diets?.map(element => element),types: result.dishTypes?.map(element => element), 
                    summary:result.summary?.replace(/<[^>]*>?/g, ''), 
                    steps: result.instructions?.replace(/<[^>]*>?/g, '')
                   }
console.log(obj)

                  if(obj) return obj

                   else{
                    console.log("NO hay coincidencia en la API");
                    //return ('error');
                }
              
                }catch (error) {
                    console.error(error);
                    return ('error')
                }

                  }
                

  module.exports = {

    getApiInfo,
    getDBInfo,
    getAllInfo,
    getInfoByName,
    getIdApi


  }