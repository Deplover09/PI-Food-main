import React from "react";
import { type dietObj } from "./CreateForm";
import styles from "../CreateRecipe.module.css";
import { useCustomSelector } from "../../../redux/hooks/hooks";

interface SelectDietsFormProps {
  handleSelectFordiets: (diet: dietObj) => void;
  handleDietsDelete: (diet: dietObj) => void;
  dietsSelected: dietObj[];
  errors: Record<string, string | undefined>;
}

const SelectDietsForm: React.FC<SelectDietsFormProps> = ({
  handleSelectFordiets,
  handleDietsDelete,
  dietsSelected,
  errors
}) => {
  const { diets: allDiets } = useCustomSelector((state) => state.recipe);
  return (
    <div className={styles.subContainer}>
      <label className={styles.subTitle} htmlFor={"Diets"}>
        Diets:
      </label>
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
                  handleDietsDelete(diet);
                }}
              >
                x
              </button>
            </div>
          ))}
        </li>
      </ul>
      {errors.diets !== undefined && (
        <p className={styles.danger}>{errors.diets}</p>
      )}
    </div>
  );
};

export default SelectDietsForm;
