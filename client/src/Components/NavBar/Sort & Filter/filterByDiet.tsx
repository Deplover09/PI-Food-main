import React from "react";
import {
  useCustomDispatch,
  useCustomSelector
} from "../../../redux/hooks/hooks";
import { filterByDiet } from "../../../redux/recipeSlice/recipesSlice";
import styles from "../NavBar.module.css";

const FilterByDiet: React.FC = () => {
  const dispatch = useCustomDispatch();
  const { diets: allDiets } = useCustomSelector((state) => state.recipe);
  const handleFilterDiets = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(filterByDiet(e.target.value));
  };
  const dietsIWant = allDiets?.filter((d) => d.name !== "ketogenic");
  return (
    <select
      className={styles.selectBar}
      onChange={(e) => {
        handleFilterDiets(e);
      }}
    >
      <option value="types">Filter by diets</option>
      {dietsIWant?.map((diet) => {
        return (
          <option value={diet.name} key={diet._id}>
            {diet.name}
          </option>
        );
      })}
    </select>
  );
};

export default FilterByDiet;
