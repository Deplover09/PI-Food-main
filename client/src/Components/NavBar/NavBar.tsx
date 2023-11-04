import React from "react";
import { Link } from "react-router-dom";
// import SearchBar from "../SearchBar/Searchbar";
import styles from "./NavBar.module.css";
import Paginado from "./Paginado/paginado";
import { type diets } from "../../redux/recipesSlice";

interface NavBarProps {
  allDiets: diets[] | undefined;
  // handleSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  // handleFilterDiets: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  // handleFilterCreated: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  // handleSortByHealthScore: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  // setCurrentPage: (pageNumber: number) => void;
  recipesPage: number;
  allRecipes: number | null;
  paginado: (pageNumber: number) => void;
  // reloadClick: (e: MouseEvent) => void;
}

const NavBar: React.FC<NavBarProps> = ({
  allDiets,
  // handleSort,
  // handleFilterDiets,
  // handleFilterCreated,
  // handleSortByHealthScore,
  // setCurrentPage,
  recipesPage,
  allRecipes,
  paginado // reloadClick
}) => {
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
      {
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
                return (
                  <option value={diet.name} key={diet.id}>
                    {diet.name}
                  </option>
                );
              })}
            </select>
            {/* <SearchBar></SearchBar> */}
          </div>
          <div className={styles.paginadoContainer}>
            <Paginado
              recipesPage={recipesPage}
              allRecipes={allRecipes}
              paginado={paginado}
            />
          </div>
          {/* <button
            className={styles.button}
            onClick={(e) => {
              reloadClick(e);
            }}
          >
            Reload List
          </button> */}
        </div>
      }
    </div>
  );
};

export default NavBar;
