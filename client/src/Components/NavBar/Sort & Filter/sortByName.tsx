import React from "react";
import { useCustomDispatch } from "../../../redux/hooks/hooks";
import { orderByName } from "../../../redux/recipeSlice/recipesSlice";
import styles from "../NavBar.module.css";

const SortByName: React.FC = () => {
  const dispatch = useCustomDispatch();
  const handleSortByName = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(orderByName(e.target.value));
  };
  return (
    <select
      className={styles.selectBar}
      onChange={(e) => {
        handleSortByName(e);
      }}
    >
      <option value="">Select Order</option>
      <option value="asc">A to Z</option>
      <option value="desc">Z to A</option>
    </select>
  );
};

export default SortByName;
