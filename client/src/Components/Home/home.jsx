import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getRepices,
  getDiets,
  filterByCreated,
  orderByName,
  filterRecipesByDiets,
  orderByHealthScore,
  cleanRecipes,
} from "../../Redux/Actions/index.js";
import Card from "./Card/Card.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import styles from "./home.module.css";
import Repices0 from "./Repices0/Repices0.jsx";
export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  const allDiets = useSelector((state) => state.diets);

  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPage, setRecipesPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPage;
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getRepices());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRepices());
    setCurrentPage(1);
  }
  function handleFilterDiets(e) {
    dispatch(filterRecipesByDiets(e.target.value));
  }
  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterByCreated(e.target.value));
    //setCurrentPage(1)
  }
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }
  function handleSortByHealthScore(e) {
    e.preventDefault();
    dispatch(orderByHealthScore(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
    setCurrentPage(1);
  }

  function reloadClick(e) {
    e.preventDefault();
    dispatch(cleanRecipes());
    dispatch(getRepices());

    setCurrentPage(1);
  }

  return (
    <div>
      {allRecipes.length === 0 ? (
        <Repices0 />
      ) : (
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
            reloadClick={reloadClick}
          />

          <div className={styles.recipeContainer}>
            {console.log(allRecipes)}

            {currentRecipes?.map((r) => {
              return (
                <Link to={`/Home/${r.id}`} className={styles.link}>
                  <Card
                    key={r.id}
                    name={r.name}
                    image={r.image}
                    diets={r.diets.map((d) => d)}
                    id={r.id}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
