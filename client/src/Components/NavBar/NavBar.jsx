import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/Searchbar.jsx'
import DietsSelectOption from "../Diets/Diets.jsx"
import styles from './NavBar.module.css';
import logo from "../../images/pokemon.png"
import Paginado from '../Paginado/paginado.jsx';

export default function NavBar({allDiets, handleSort, handleFilterDiets, handleFilterCreated, handleSortByHealthScore, setCurrentPage, recipesPage, allRecipes, paginado}) {
  return (
    
    // <div className={styles.background}>
      
       
    //     <div className={styles.space} >
    //     <Link  to="/"><button className={styles.btn}> <p className={styles.left}></p> </button></Link>
        
    //     <select onChange={e => handleSort(e)}>
    //     <option value="alpha">Alphabetically Sort</option>
    //       <option value = "asc"> ascendente </option>
    //       <option value = "des"> descendente </option>
    //       </select>

    //       <select  onChange={e => handleFilterDiets(e)}>
    //                         <option value="Types">All Types</option>
    //                         <DietsSelectOption 
    //                             allDiets={allDiets}  
    //                         />
    //                     </select>

    //       {/* <select onChange={e => handleFilterCreated(e)}>
    //       <option value="Pokemons">All Pokemons</option>
    //       <option value="Api">Pokemons Api</option>
    //       <option value="Created">Created</option>
    //       </select> */}

          
    //       <select  onChange={ e => handleSortByHealthScore(e)}>
    //                         <option value="Score">Score</option>
    //                         <option value="asc">ascendente</option>
    //                         <option value="des">descendente</option>
    //                     </select>
    //     <SearchBar setCurrentPage={setCurrentPage} className="search" />
    //     <Link to="/CreatePokemon"><button className={styles.btn2}>Create a Pokemon</button></Link>
    //     </div>
        
    // </div>
    <div>
    <div className={styles.firstContainer}>
    <h1 className={styles.homeTitle}>Recipe Book</h1>
    <Link to="/create">
        <button className={styles.button}>Create Recipe</button>
    </Link>
</div>
<div className={styles.secondContainer}>
    <select className={styles.selectBar} onChange={(e) => handleSort(e)}>
        <option value="" >Select Order</option>
        <option value="asc">A to Z</option>
        <option value="desc">Z to A</option>


    </select>
    <select className={styles.selectBar} onChange={(e) => handleSortByHealthScore(e)}>
        <option value="Score" >Select Score</option>
        <option value="asc">Max Spoonacular Score</option>
        <option value="des">Min Spoonacular Score</option>
    </select>

    {/* //        <select onChange={e => handleFilterCreated(e)}>
    //       <option value="Pokemons">All Pokemons</option>
    //       <option value="Api">Pokemons Api</option>
    //       <option value="Created">Created</option>
    //       </select>  */}
    <select className={styles.selectBar} onChange={e => handleFilterDiets(e)}>
        <option value="">Select Diets</option>
        {allDiets?.map(diet => {
            return ( <option value={diet.name}>{diet.name}</option>)
        })
    }
    </select>
    <SearchBar setCurrentPage={setCurrentPage}></SearchBar>
</div>
<div className={styles.paginadoContainer}>
    <Paginado
        recipesPage={recipesPage}
        allRecipes={allRecipes}
         paginado={paginado}
         />
</div>
</div>
  )
}