import React from "react";
import styles from "./paginado.module.css";

interface PaginadoProps {
  recipesPage: number;
  allRecipes: number | null;
  paginado: (pageNumber: number) => void;
}

export default function Paginado({ recipesPage, allRecipes, paginado }: PaginadoProps) {
  const pageNumbers: number[] = [];

  if (allRecipes) {
    for (let i = 0; i < Math.ceil(allRecipes / recipesPage); i++) {
      pageNumbers.push(i + 1);
    }
  }

  return (
    <nav>
      <ul className={styles.barra}>
        {pageNumbers?.map((number) => (
          <li key={number}>
            <button onClick={() => paginado(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
