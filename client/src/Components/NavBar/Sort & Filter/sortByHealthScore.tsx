import React from "react";
import { useCustomDispatch } from "../../../redux/hooks/hooks";
import { orderByHealthScore } from "../../../redux/recipeSlice/recipesSlice";
import styles from "../NavBar.module.css";

const SortByHealthScore: React.FC = () => {
  const dispatch = useCustomDispatch();
  const handleSortHealthScore = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    dispatch(orderByHealthScore(e.target.value));
  };
  return (
    <select
      className={styles.selectBar}
      onChange={(e) => {
        handleSortHealthScore(e);
      }}
    >
      <option value="">Select Order</option>
      <option value="asc">A to Z</option>
      <option value="desc">Z to A</option>
    </select>
  );
};

export default SortByHealthScore;
