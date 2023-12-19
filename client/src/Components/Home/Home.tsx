import React, { useEffect, useState } from "react";
import { useCustomDispatch, useCustomSelector } from "../../redux/hooks/hooks";
import { Link } from "react-router-dom";
import { fetchRecipes, fetchDiets } from "../../redux/recipeSlice/asyncActions";
import { clearRecipes } from "../../redux/recipeSlice/recipesSlice";
import Card from "./Card/Card";
import NavBar from "../NavBar/NavBar";
import styles from "./home.module.css";
import loading from "../../images/loading.gif";

const Home: React.FC = () => {
  const dispatch = useCustomDispatch();
  const { recipes: allRecipes } = useCustomSelector((state) => state.recipe);

  // const [orden, setOrden] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recipesPage] = useState<number>(9);
  const indexOfLastRecipe = currentPage * recipesPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPage;
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );
  const [messege, setMessege] = useState<string>(
    "The server is turning on, please wait 30 seconds"
  );

  const paginado = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(fetchRecipes());
    dispatch(fetchDiets());
  }, [dispatch]);

  const reloadList = (e: React.MouseEvent): void => {
    e.preventDefault();
    dispatch(clearRecipes());
    dispatch(dispatch(fetchRecipes));
    setCurrentPage(1);
  };
  const serverProblem = (): void => {
    setTimeout(() => {
      allRecipes.length === 0 &&
        setMessege(
          "A minute has passed and the information still has not arrived, there is a problem with the server."
        );
    }, 30000);
  };
  serverProblem();
  return (
    <div className={styles.background}>
      <NavBar
        setCurrentPage={setCurrentPage}
        recipesPage={recipesPage}
        allRecipes={allRecipes.length}
        paginado={paginado}
        reloadList={reloadList}
      />

      {allRecipes.length === 0 ? (
        <div className={styles.loadingDiv}>
          <img className={styles.loading} src={loading} alt="loading" />
          <p>{messege}</p>
        </div>
      ) : (
        <div className={styles.recipeContainer}>
          {currentRecipes?.map((r) => (
            <Link to={`/Home/${r.id}`} className={styles.link} key={r.id}>
              <Card
                name={r.name}
                image={r.image}
                diets={r.diets.map((d) => d)}
                id={r.id}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
export default Home;
