import React from "react";
import { useCustomDispatch } from "../../../redux/hooks/hooks";
import { filterByCreated } from "../../../redux/recipeSlice/recipesSlice";
import styles from "../NavBar.module.css";

const FilterByCreated: React.FC = () => {
  const dispatch = useCustomDispatch();
  const handleFilterByCreated = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    dispatch(filterByCreated(e.target.value));
  };
  return (
    <select
      className={styles.selectBar}
      onChange={(e) => {
        handleFilterByCreated(e);
      }}
    >
      <option value="">Select Order</option>
      <option value="asc">A to Z</option>
      <option value="desc">Z to A</option>
    </select>
  );
};

export default FilterByCreated;
