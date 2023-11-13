import React, { useState } from "react";
import { useCustomDispatch } from "../../redux/hooks/hooks";
import { fetchRecipesByName } from "../../redux/recipeSlice/asyncActions";
import styles from "./Searchbar.module.css";

interface SearchBarProps {
  setCurrentPage: (page: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setCurrentPage }) => {
  const dispatch = useCustomDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    setCurrentPage(1);
    console.log(name);
    dispatch(fetchRecipesByName(name));
    setName("");
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.textBox}
        type="text"
        value={name}
        placeholder="Search..."
        onChange={(e) => {
          handleInputChange(e);
        }}
      />

      <button
        className={styles.button}
        type="submit"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
