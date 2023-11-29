import React from "react";
import styles from "./paginado.module.css";

interface PaginadoProps {
  recipesPage: number;
  allRecipes: number | null;
  paginado: (pageNumber: number) => void;
}

const Paginado: React.FC<PaginadoProps> = ({
  recipesPage,
  allRecipes,
  paginado
}) => {
  const pageNumbers: number[] = [];

  if (allRecipes !== null && allRecipes !== undefined) {
    for (let i = 0; i < Math.ceil(allRecipes / recipesPage); i++) {
      pageNumbers.push(i + 1);
    }
  }

  return (
    <nav>
      <ul className={styles.barra}>
        {pageNumbers?.map((number) => (
          <li key={number}>
            <button
              onClick={() => {
                paginado(number);
              }}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginado;
