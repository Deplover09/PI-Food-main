import React from "react"
import { useState, useEffect, Fragment  } from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom";
import {getRepices, getDiets, filterByCreated, orderByName, filterRecipesByDiets, orderByHealthScore}  from '../../Actions/index.js'; //  filterByCreated,  clearPokemons,
import Card from '../Card/Card.jsx';
import Paginado from '../Paginado/paginado.jsx';

import NavBar from '../NavBar/NavBar.jsx';

import styles from'./home.module.css'
// apiNormal = d4d2608c3c244c668a2e3b3dc8efe150
// apiRespaldo= ddff05c5b816409180d830983322c675
export default function Home(){

const dispatch = useDispatch()
const allRecipes = useSelector(state => state.recipes);
// const allPPOkemons = useSelector(state => state.backUpPokemons)

const allDiets = useSelector(state => state.diets);
    
    
const [orden, setOrden]= useState("")
const [currentPage, setCurrentPage] = useState(1);
const [recipesPage, setRecipesPage] = useState(9);
const indexOfLastRecipe = currentPage * recipesPage;
const indexOfFirstRecipe = indexOfLastRecipe - recipesPage;
const currentRecipes = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe)
        
const paginado = (pageNumber) =>{
  setCurrentPage(pageNumber)
}

useEffect( ()=>{
  dispatch(getRepices());
},[dispatch])


 useEffect( ()=>{
   dispatch(getDiets())
 },[dispatch])



 function handleClick(e){
  e.preventDefault();
  dispatch(getRepices())
  setCurrentPage(1)
}
function handleFilterDiets(e){
  
  dispatch(filterRecipesByDiets(e.target.value))

}
function handleFilterCreated(e){
  e.preventDefault();
  dispatch(filterByCreated(e.target.value))
   //setCurrentPage(1)
}
function handleSort(e){
  e.preventDefault()
  dispatch(orderByName(e.target.value));
  setCurrentPage(1)
  setOrden(`Ordenado ${e.target.value}`)
 }
function handleSortByHealthScore(e){
  e.preventDefault()
  dispatch(orderByHealthScore(e.target.value));
  setOrden(`Ordenado ${e.target.value}`)
  setCurrentPage(1)
}

// function reloadClick(e) {
//   e.preventDefault();
//   dispatch(clearPokemons());
//   dispatch(getPokemons());
  
//   setCurrentPage(1);
// }

  // return(
  //   <div className ={styles.background2}>

        
        
  //                   <NavBar 
  //                    allDiets={allDiets} 
  //                   handleSort={handleSort} 
  //                    handleFilterDiets={handleFilterDiets}
  //                   handleFilterCreated={handleFilterCreated}
  //                   handleSortByHealthScore={handleSortByHealthScore}
  //                   setCurrentPage={setCurrentPage}
  //                   />
             
  //    {/* <button className={styles.btn}  onClick={(e)=>{reloadClick(e)}}>  
  //       recargar la lista
  //       </button>  */}

      

        
  //     <Paginado
  //      recipesPage={recipesPage}
  //      allRecipes={allRecipes.length}
  //       paginado={paginado}
  //       />
      
             
  //        <div> 
  //         {console.log(allRecipes)}
      
  //       {
  //          currentRecipes?.map(r => {  
                                    
  //         return <Card key={r.id} name={r.name} image={r.image} diets={r.diets.map(d =>d)} id ={r.id}/>          
  //         })}
  //         </div>
         
  //     </div> 
    
  // )
   /* /* select{
  text-align: center;
  width: 130px;
  margin-left: 10px;
  margin-right: 20px;
  font-size: 1rem;
  height: 30px;
  box-shadow: 2px 4px 8px rgba(89, 73, 30, 0.16);
  border: none;
  border-radius: 8px;
  background-color: white;
  flex-wrap: wrap;
  font-family: "Open Sans";
  }


.space{
  margin-left: 40px;
  position: relative;
  top: -30px;
  flex-wrap: wrap;
  display: inline-flex;
  align-items: center;
}

.background{
  background-color: #000000;
   height: 90px;
  flex-wrap: wrap;
  min-width: 300px;
  max-width: 120rem;
  min-height: 100px;
  width: 98rem;
  flex-direction: column;
}

.tamaño{
  margin-left: 20px;
  margin-top: 10px;
  width: 160px;
  height: 70px;
  flex-wrap: wrap;
  display: inline-flex;
  position: relative;
  margin-bottom: 1rem;
}

.btn{
font-family: "Open Sans";
font-size: 18px;
font-weight: bold;
background: #003566;
padding: 10px;
text-align: center;
text-transform: uppercase;
color: #d9d9d9;
border-radius: 10px;
cursor: pointer;
margin-right: 30px;
border: none;
 width: 2rem;
height: 2.3rem; 

.btn2{
  font-family: "Open Sans";
  font-size: 18px;
  font-weight: bold;
  background: #003566;
  padding: 8px; 
   justify-content: left;
  text-align: center; 
  text-transform: uppercase;
  color: #d9d9d9;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 30px;
  border: none;
}

.btn:hover {
  color: #d9d9d9;
  background-color: #457b9d;
}

.btn2:hover {
  color: #d9d9d9;
  background-color: #457b9d;
}

.left{
  border: solid #d9d9d9;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px; 
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
} */



  return (
    <div className={styles.background}>
      <NavBar 
                      allDiets={allDiets} 
                     handleSort={handleSort} 
                      handleFilterDiets={handleFilterDiets}
                     handleFilterCreated={handleFilterCreated}
                     handleSortByHealthScore={handleSortByHealthScore}
                     setCurrentPage={setCurrentPage}
                     recipesPage={recipesPage}
                     allRecipes={allRecipes.length}
                      paginado={paginado}
                   />

<div className={styles.recipeContainer}> 
           {console.log(allRecipes)}
      
         {
            currentRecipes?.map(r => {  
                                    
           return(
            <Link to={`/Home/${r.id}`} className={styles.link} >
            <Card key={r.id} name={r.name} image={r.image} diets={r.diets.map(d =>d)} id ={r.id}/>
            </Link>
           )          
           })}
           </div>
             
        {/* <div className={styles.firstContainer}> */}
            {/* <h1 className={styles.homeTitle}>Recipe Book</h1>
            <Link to="/create">
                <button className={styles.button}>Create Recipe</button>
            </Link>
        </div>
        <div className={styles.secondContainer}>
            <select className={styles.selectBar} onChange={(e) => handleSortedRecipesTitle(e)}>
                <option value="" >Select Order</option>
                <option value="Asc">A to Z</option>
                <option value="Desc">Z to A</option>


            </select>
            <select className={styles.selectBar} onChange={(e) => handleSortedRecipesSpoonScore(e)}>
                <option value="" >Select Score</option>
                <option value="SpoonacularMax">Max Spoonacular Score</option>
                <option value="SpoonacularMin">Min Spoonacular Score</option>
            </select>
            <select className={styles.selectBar} onChange={e => handleFilteredDiet(e)}>
                <option value="">Select Diets</option>
                {allDiets?.map(diet => {
                    return ( <option value={diet.name}>{diet.name}</option>)
                })
            }
            </select>
            <SearchBar></SearchBar>
        </div> */} 

        
        
        {/* <div className={styles.paginadoContainer}>
            <Paginado recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginado={paginado}></Paginado>
        </div> */}
        {/* <div className={styles.recipeContainer}>
            {currentRecipes?.map(recipe => {
                return (
                    <Link className={styles.link} to={`/recipe/${recipe.id}`}>
                    <Card image={recipe.image} title={recipe.title} diets={recipe.diets.map(r => <p>{r.name}</p>)} key={recipe.id} ></Card>
                    </Link>
                    )
                })
            }
        </div> */}
    
    </div>
)
}