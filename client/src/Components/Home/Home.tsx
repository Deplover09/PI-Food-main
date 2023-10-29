import React, { useEffect } from "react";
import { useCustomDispatch, useCustomSelector } from "../../redux/hooks/hooks";
// import { Link } from "react-router-dom";
import {
  fetchRecipes
  // getDiets,
  // filterByCreated,
  // orderByName,
  // filterRecipesByDiets,
  // orderByHealthScore,
  // cleanRecipes,
} from "../../redux/recipesSlice";
// import {State} from "../../redux/reducer.ts"
// import Card from "./Card/Card";
// import NavBar from '../NavBar/NavBar';
// import styles from "./home.module.css";
// import Repices0 from "./Repices0/Repices0";

const Home: React.FC = () => {
  const dispatch = useCustomDispatch();
  const allRecipes = useCustomSelector((state) => state);
  // const allDiets = useSelector((state) => state.diets);
  console.log(allRecipes);

  // const [orden, setOrden] = useState<string>("");
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [recipesPage, setRecipesPage] = useState<number>(9);
  // const indexOfLastRecipe = currentPage * recipesPage;
  // const indexOfFirstRecipe = indexOfLastRecipe - recipesPage;
  // const currentRecipes = allRecipes.slice(
  //   indexOfFirstRecipe,
  //   indexOfLastRecipe
  // );

  // const paginado = (pageNumber: number) => {
  //   setCurrentPage(pageNumber);
  // };

  useEffect(() => {
    dispatch(fetchRecipes);
  }, [dispatch]);

  // function handleClick(e: React.MouseEvent) {
  //   e.preventDefault();
  //   dispatch(getRepices());
  //   setCurrentPage(1);
  // }

  // function handleFilterDiets(e: React.ChangeEvent<HTMLSelectElement>) {
  //   dispatch(filterRecipesByDiets(e.target.value));
  // }

  // function handleFilterCreated(e: React.ChangeEvent<HTMLSelectElement>) {
  //   e.preventDefault();
  //   dispatch(filterByCreated(e.target.value));
  //   //setCurrentPage(1)
  // }

  // function handleSort(e: React.ChangeEvent<HTMLSelectElement>) {
  //   e.preventDefault();
  //   dispatch(orderByName(e.target.value));
  //   setCurrentPage(1);
  //   setOrden(`Ordenado ${e.target.value}`);
  // }

  // function handleSortByHealthScore(e: React.ChangeEvent<HTMLSelectElement>) {
  //   e.preventDefault();
  //   dispatch(orderByHealthScore(e.target.value));
  //   setOrden(`Ordenado ${e.target.value}`);
  //   setCurrentPage(1);
  // }

  // function reloadClick(e: React.MouseEvent) {
  //   e.preventDefault();
  //   dispatch(cleanRecipes());
  //   dispatch(getRepices());
  //   setCurrentPage(1);
  // }

  return (
    <div>
      {/* {allRecipes.length === 0 ? (
        <Repices0 />
      ) : (
        <div className={styles.background}>
           <NavBar
            // allDiets={allDiets}
            // handleSort={handleSort}
            // handleFilterDiets={handleFilterDiets}
            // handleFilterCreated={handleFilterCreated}
            // handleSortByHealthScore={handleSortByHealthScore}
            setCurrentPage={setCurrentPage}
            recipesPage={recipesPage}
            allRecipes={allRecipes.length}
            paginado={paginado}
            reloadClick={reloadClick}
          /> 

          <div className={styles.recipeContainer}>
            console.log(allRecipes)
             {currentRecipes?.map((r) => (
              <Link to={`/Home/${r.id}`} className={styles.link} key={r.id}>
                <Card name={r.name} image={r.image} diets={r.diets.map((d) => d)} id={r.id} />
              </Link>
            )}  
          </div>
        </div>
      )} */}
    </div>
  );
};
export default Home;
