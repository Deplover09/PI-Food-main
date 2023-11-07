import React from "react";
import {
  useCustomDispatch,
  useCustomSelector
} from "../../../redux/hooks/hooks";
import { orderByName } from "../../../redux/recipeSlice/recipesSlice";
import styles from "../NavBar.module.css";

const FilterByDiet: React.FC = () => {
  const dispatch = useCustomDispatch();
  const { diets: allDiets } = useCustomSelector((state) => state.recipe);
  const handleFilterDiets = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(orderByName(e.target.value));
  };
  return (
    <select
      className={styles.selectBar}
      onChange={(e) => {
        handleFilterDiets(e);
      }}
    >
      <option value="">Select Diets</option>
      {allDiets?.map((diet) => {
        return (
          <option value={diet.name} key={diet.id}>
            {diet.name}
          </option>
        );
      })}
    </select>
  );
};

export default FilterByDiet;
