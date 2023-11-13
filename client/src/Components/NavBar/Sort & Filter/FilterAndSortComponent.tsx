import React from "react";
import { useCustomDispatch } from "../../../redux/hooks/hooks";
import styles from "../NavBar.module.css";
import { type ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface FilterAndSortComponentProps {
  action: ActionCreatorWithPayload<string>;
  firstOption: string;
  secondOption: string;
  thirdOption: string;
}

const FilterAndSortComponent: React.FC<FilterAndSortComponentProps> = ({
  action,
  firstOption,
  secondOption,
  thirdOption
}) => {
  const dispatch = useCustomDispatch();

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const payload: string = e.target.value;
    dispatch(action(payload));
  };

  return (
    <select
      className={styles.selectBar}
      onChange={(e) => {
        handleOnChange(e);
      }}
    >
      <option value={firstOption}>{firstOption}</option>
      <option value={secondOption}>{secondOption}</option>
      <option value={thirdOption}>{thirdOption}</option>
    </select>
  );
};

export default FilterAndSortComponent;
