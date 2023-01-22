import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/Searchbar.jsx";
import styles from "./NavBar.module.css";
import Paginado from "./Paginado/paginado.jsx";

export default function NavBar({
  allDiets,
  handleSort,
  handleFilterDiets,
  handleFilterCreated,
  handleSortByHealthScore,
  setCurrentPage,
  recipesPage,
  allRecipes,
  paginado,
  reloadClick,
}) {
  return (
    <div>
      <div className={styles.firstContainer}>
        <h1 className={styles.homeTitle}>Recipe Book</h1>

        <Link to="/CreateRecipe">
          <button className={styles.button}>Create Recipe</button>
        </Link>
        <Link to="/About">
          <button className={styles.button2}>About</button>
        </Link>
      </div>
      {!allRecipes ? (
        <div>
          <div className={styles.secondContainer}>
            <select className={styles.selectBar}>
              <option value="">Select Order</option>
              <option value="asc">A to Z</option>
              <option value="desc">Z to A</option>
            </select>
            <select className={styles.selectBar}>
              <option value="Score">Select Score</option>
              <option value="asc">Max Spoonacular Score</option>
              <option value="des">Min Spoonacular Score</option>
            </select>

            <select className={styles.selectBar}>
              <option value="Recipes">All Recipes</option>
              <option value="Api">Recipes Api</option>
              <option value="Created">Created</option>
            </select>
            <select className={styles.selectBar}>
              <option value="">Select Diets</option>
              {allDiets?.map((diet) => {
                return <option value={diet.name}>{diet.name}</option>;
              })}
            </select>
            <SearchBar></SearchBar>
          </div>
          <div className={styles.paginadoContainer}>
            <Paginado
              recipesPage={recipesPage}
              allRecipes={allRecipes}
              paginado={paginado}
            />
          </div>
          <button className={styles.button}>Reload List</button>
        </div>
      ) : (
        <div>
          <div className={styles.secondContainer}>
            <select
              className={styles.selectBar}
              onChange={(e) => handleSort(e)}
            >
              <option value="">Select Order</option>
              <option value="asc">A to Z</option>
              <option value="desc">Z to A</option>
            </select>
            <select
              className={styles.selectBar}
              onChange={(e) => handleSortByHealthScore(e)}
            >
              <option value="Score">Select Score</option>
              <option value="asc">Max Spoonacular Score</option>
              <option value="des">Min Spoonacular Score</option>
            </select>

            <select
              className={styles.selectBar}
              onChange={(e) => handleFilterCreated(e)}
            >
              <option value="Recipes">All Recipes</option>
              <option value="Api">Recipes Api</option>
              <option value="Created">Created</option>
            </select>
            <select
              className={styles.selectBar}
              onChange={(e) => handleFilterDiets(e)}
            >
              <option value="">Select Diets</option>
              {allDiets?.map((diet) => {
                return <option value={diet.name}>{diet.name}</option>;
              })}
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
          <button
            className={styles.button}
            onClick={(e) => {
              reloadClick(e);
            }}
          >
            Reload List
          </button>
        </div>
      )}
    </div>
  );
}
