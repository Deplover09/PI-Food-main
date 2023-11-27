import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/Searchbar";
import styles from "./NavBar.module.css";
import Paginado from "./Paginado/paginado";
import FilterByDiet from "./Sort & Filter/filterByDiet";
import FilterAndSortComponent from "./Sort & Filter/FilterAndSortComponent";
import {
  orderByName,
  orderByHealthScore,
  filterByCreated
} from "./../../redux/recipeSlice/recipesSlice";

interface NavBarProps {
  recipesPage: number;
  allRecipes: number | null;
  paginado: (pageNumber: number) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  reloadList: (e: React.MouseEvent) => void;
}

const NavBar: React.FC<NavBarProps> = ({
  recipesPage,
  allRecipes,
  paginado,
  setCurrentPage,
  reloadList
}) => {
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.firstContainer}>
        <div className={styles.homeDiv}>
          <h1 className={styles.homeTitle}>Recipe Book</h1>
        </div>
        <div className={styles.linkDivs}>
          <Link className={styles.linkBtn} to="/CreateRecipe">
            Create Recipe
          </Link>
          <Link className={styles.linkBtn2} to="/About">
            About
          </Link>
        </div>
      </div>
      {
        <div>
          <div className={styles.secondContainer}>
            <FilterAndSortComponent
              action={orderByName}
              firstOption={"Order by name"}
              secondOption={"A to Z"}
              thirdOption={"Z to A"}
            />
            <FilterAndSortComponent
              action={orderByHealthScore}
              firstOption={"Order by Healthscore"}
              secondOption={"asc"}
              thirdOption={"des"}
            />
            <FilterAndSortComponent
              action={filterByCreated}
              firstOption={"Filter by created"}
              secondOption={"Created"}
              thirdOption={"Api"}
            />

            <FilterByDiet />
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
            className={styles.btn}
            onClick={(e) => {
              reloadList(e);
            }}
          >
            Reload List
          </button>
        </div>
      }
    </div>
  );
};

export default NavBar;
