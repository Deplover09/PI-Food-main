import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipe } from "../../Redux/Actions/index";
import styles from "./Searchbar.module.css";

interface SearchBarProps {
  setCurrentPage: (page: number) => void;
}

export default function SearchBar({ setCurrentPage }: SearchBarProps) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setCurrentPage(1);
    console.log(name);
    dispatch(getNameRecipe(name));
    setName("");
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.textBox}
        type="text"
        value={name}
        placeholder="Search..."
        onChange={(e) => handleInputChange(e)}
      />

      <button
        className={styles.button}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
