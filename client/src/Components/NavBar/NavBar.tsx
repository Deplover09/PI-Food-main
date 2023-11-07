import React from "react";
import { Link } from "react-router-dom";
// import SearchBar from "../SearchBar/Searchbar";
import styles from "./NavBar.module.css";
import Paginado from "./Paginado/paginado";
import FilterByCreated from "./Sort & Filter/filterByCreated";
import FilterByDiet from "./Sort & Filter/filterByDiet";
import SortByName from "./Sort & Filter/sortByName";
import SortByHealthScore from "./Sort & Filter/sortByHealthScore";

interface NavBarProps {
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
            <SortByName />
            <SortByHealthScore />
            <FilterByCreated />
            <FilterByDiet />
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
