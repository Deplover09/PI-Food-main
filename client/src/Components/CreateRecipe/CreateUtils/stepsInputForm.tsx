import styles from "../CreateRecipe.module.css";
import React, { useState } from "react";
import { type recipeFormState } from "./CreateForm";
// import validate from "./validate";

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
  errors
  // setDisabled,
  // setErrors
}) => {
  const [stepsArray, setStepsArray] = useState<string[]>([]);
  const firstLetter = inputName.charAt(0).toUpperCase();
  const inputNameCapitalLetter = firstLetter + inputName.slice(1);

  const addStep = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    setStepsArray((prevSteps) => [...prevSteps, ""]);
    const noEmptystrings = stepsArray.filter((s) => s !== "");
    setInput({
      ...input,
      steps: noEmptystrings
    });
    // validate({ input, setDisabled, setErrors });
  };
  const deleteStep = (
    e: React.MouseEvent<HTMLButtonElement>,
    indexStep: number
  ): void => {
    e.preventDefault();
    const deletedStep = stepsArray.filter((_, index) => index !== indexStep);
    setStepsArray(deletedStep);
    if (indexStep === 0) {
      setInput({
        ...input,
        steps: []
      });
      return undefined;
    }
    const noEmptystrings = stepsArray.filter((s) => s !== "");
    setInput({
      ...input,
      steps: noEmptystrings
    });
    // validate({ input, setDisabled, setErrors });
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
    // validate({ input, setDisabled, setErrors });
  };

  return (
    <div className={styles.subContainer}>
      <label className={styles.subTitle} htmlFor={inputName}>
        {inputNameCapitalLetter}:
      </label>
      {stepsArray.length === 0 && (
        <div className={styles.stepContainer}>
          <button
            style={{ margin: 0 }}
            className={styles.addStepbtn}
            onClick={(e) => {
              addStep(e);
            }}
          >
            Add Step 1
          </button>
        </div>
      )}

      {stepsArray.length !== 0 &&
        stepsArray.map((step, index) => (
          <div className={styles.stepContainer} key={index}>
            <input
              className={styles.stepInput}
              type="text"
              name={inputName}
              value={step}
              onChange={(e) => {
                updateStepInput(index, e.target.value);
              }}
            />
            <div className={styles.btnsDiv}>
              <button
                className={styles.addStepbtn}
                onClick={(e) => {
                  addStep(e);
                }}
              >
                Add Step {`${index + 2}`}
              </button>
              <button
                className={styles.deleteStepBtn}
                onClick={(e) => {
                  deleteStep(e, index);
                }}
              >
                Delete this step
              </button>
            </div>
          </div>
        ))}
      {errors[inputName] !== undefined && (
        <p className={styles.danger}>{errors[inputName]}</p>
      )}
    </div>
  );
};

export default StepsInputForm;
