import axios from 'axios';





export function getRepices() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/recipes")
    return dispatch({
      type: "GET_RECIPES",
      payload: json.data
    }
    )
  }
}

export function getDiets(){
  return async function(dispatch){
      var json = await axios.get("http://localhost:3001/diets")
      return dispatch({
          type: "GET_DIETS",
          payload: json.data
      })
  }
}

export function filterRecipesByDiets(payload){
  
  return{
      type:"FILTER_BY_DIET",
      payload: payload,
      
  }
}

export function filterByCreated(payload){
  return{
      type: "FILTER_BY_CREATED",
      payload: payload
  }
}
export function orderByHealthScore(payload){
  return{
      type: "ORDER_BY_HEALTH_SCORE",
      payload: payload
  }
}

export function orderByName(payload){
  return{
      type: "ORDER_BY_NAME",
      payload: payload
  }
}



export function getNameRecipe(payload){
  return async function(dispatch){
      try{
          var json = await axios.get(`http://localhost:3001/recipes?name=${payload}`)
          console.log(json)
          return dispatch({
              type: "GET_RECIPE_BY_NAME",
              payload: json.data,
              
          })
      } catch(error){
        console.log(payload)
          console.log("getNameRecipe"+ error)
      }
  }
}

export function postRecipe(payload){
  return async function(dispatch){
      const response = await axios.post("http://localhost:3001/postRecipe",payload)
      console.log(response)
      return response;
  }
}

export function recipeParams(id){
  return async function(dispatch){
      try{
          var json = await axios.get(`http://localhost:3001/recipesParams/${id}`)
          
          return dispatch({
              type: "GET_REPICE_PARAMS",
              payload: json.data
          })
      }catch(error){
          console.log(error)
      }
  }
}

export function clearDetail(){
  return{
      type:"RESET_DETAIL"
  }
}

export function cleanRecipes() {
  return{
      type: "CLEAN_RECIPES"
  }
}




