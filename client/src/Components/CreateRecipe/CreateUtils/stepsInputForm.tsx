import styles from "../CreateRecipe.module.css";
import React, { useState } from "react";
import { type recipeFormState } from "./CreateForm";
import validate from "./validate";

interface StepsInputFormProps {
  inputName: string;
  input: recipeFormState;
  setInput: React.Dispatch<React.SetStateAction<recipeFormState>>;
  errors: Record<string, string | undefined>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setErrors: React.Dispatch<
    React.SetStateAction<Record<string, string | undefined>>
  >;
}

const StepsInputForm: React.FC<StepsInputFormProps> = ({
  inputName,
  input,
  setInput,
  errors,
  setDisabled,
  setErrors
}) => {
  const [stepsArray, setStepsArray] = useState<string[]>([""]);
  const firstLetter = inputName.charAt(0).toUpperCase();
  const inputNameCapitalLetter = firstLetter + inputName.slice(1);

  const addStep = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    setStepsArray((prevSteps) => [...prevSteps, ""]);
  };

  const updateStepInput = (index: number, text: string): void => {
    setStepsArray((prevSteps) => {
      const updatedSteps = [...prevSteps];
      updatedSteps[index] = text;
      return updatedSteps;
    });
    const noEmptystrings = stepsArray.filter((s) => s !== "");
    setInput({
      ...input,
      steps: noEmptystrings
    });
    validate({ input, setDisabled, setErrors });
  };

  return (
    <div className={styles.subContainer}>
      <label className={styles.subTitle} htmlFor={inputName}>
        {inputNameCapitalLetter}:
      </label>
      {stepsArray.map((step, index) => (
        <div key={index}>
          <input
            type="text"
            name={inputName}
            value={step}
            onChange={(e) => {
              updateStepInput(index, e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              addStep(e);
            }}
          >
            Add Step {`${index + 2}`}
          </button>
        </div>
      ))}
      {errors[inputName] !== undefined && (
        <p className={styles.danger}>{errors[inputName]}</p>
      )}
    </div>
  );
};

export default StepsInputForm;
