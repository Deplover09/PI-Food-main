import React from "react";
import { type dietObj } from "./CreateForm";
import styles from "../CreateRecipe.module.css";
import { useCustomSelector } from "../../../redux/hooks/hooks";

interface SelectDietsFormProps {
  handleSelectFordiets: (diet: dietObj) => void;
  handleDietsDelete: (e: string) => void;
  dietsSelected: dietObj[];
}

const SelectDietsForm: React.FC<SelectDietsFormProps> = ({
  handleSelectFordiets,
  handleDietsDelete,
  dietsSelected
}) => {
  const { diets: allDiets } = useCustomSelector((state) => state.recipe);
  return (
    <div className={styles.subContainer}>
      <select
        className={styles.select}
        onChange={(e) => {
          const diet = allDiets.find((d) => d.name === e.target.value);
          console.log(diet);
          diet !== undefined && handleSelectFordiets(diet);
        }}
      >
        <option value="">Diets</option>
        {allDiets.map((e) => (
          <option key={e._id} value={e.name}>
            {e.name}
          </option>
        ))}
      </select>

      <ul className={styles.diets}>
        <li>
          {dietsSelected?.map((diet) => (
            <div className={styles.selectedDiets}>
              <p>{diet.name}</p>
              <button
                className={styles.crossButton}
                onClick={(e) => {
                  e.preventDefault();
                  handleDietsDelete(diet.name);
                }}
              >
                x
              </button>
            </div>
          ))}
        </li>
      </ul>
    </div>
  );
};

export default SelectDietsForm;
