import React, { useState, useEffect } from "react";
import validate from "./validate";
import SelectDietsForm from "./SelectDietsForm";
import InputForm from "./InputForm";
import styles from "../CreateRecipe.module.css";
import { useNavigate } from "react-router-dom";

import {
  postRecipes,
  type postRecipesProps
} from "../../../redux/recipeSlice/asyncActions";
import { useCustomDispatch } from "../../../redux/hooks/hooks";
import { fetchDiets } from "../../../redux/recipeSlice/asyncActions";
import StepsInputForm from "./stepsInputForm";
import DragDropFiles from "./dragUploadImage";

export interface recipeFormState {
  name: string | "";
  summary: string | "";
  healthScore: number;
  image: string | "";
  steps: string[] | [];
  diets: string[] | [];
  [key: string]: string | number | undefined | string[];
}

export interface dietObj {
  name: string;
  _id: string;
}

const CreateRecipeForm: React.FC = () => {
  const [input, setInput] = useState<recipeFormState>({
    name: "",
    image: "",
    summary: "",
    healthScore: 0,
    steps: [] as string[],
    diets: [] as string[]
  });

  const [File, setFile] = useState<File | null>(null);
  const [dietsSelected, setDietsSelected] = useState<dietObj[]>([]);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [disabled, setDisabled] = useState(true);
  const dispatch = useCustomDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchDiets());
  }, []);
  useEffect(() => {
    // setInput({
    //   ...input,
    //   diets: dietsSelected.map((d) => d._id)
    // });
    validate({ input, setDisabled, setErrors });
  }, [input]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };
  const handleSelectFordiets = (diet: dietObj): void => {
    setDietsSelected([...new Set([...dietsSelected, diet])]);
    setInput({ ...input, diets: [...new Set([...input.diets, diet._id])] });
  };

  const handleDietsDelete = (diet: dietObj): void => {
    setDietsSelected(dietsSelected.filter((d) => d.name !== diet.name));
    setInput({ ...input, diets: input.diets.filter((d) => d !== diet._id) });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (input.name === "") {
      alert("Enter recipe  name");
      return;
    } else if (input.summary === "") {
      alert("Enter a summary point");
      return;
    } else if (input.healthScore === undefined) {
      alert("Enter an healthScore point");
      return;
    } else if (input.steps.length === 0) {
      alert("Enter a steps point");
      return;
    } else if (input.diets.length === 0) {
      alert("Select at least 1 diet");
      return;
    }

    dispatch(postRecipes(input as postRecipesProps));
    console.log("post dispached");

    alert("Recipe Created Successfully");
    navigate("/");
  };

  return (
    <form className={styles.formContainer}>
      <InputForm
        inputName="name"
        input={input}
        handleChange={handleChange}
        errors={errors}
      />
      <div className={styles.subContainer}>
        <p className={styles.subTitle}>Image:</p>
        <DragDropFiles
          File={File}
          setFile={setFile}
          input={input}
          setInput={setInput}
        />
      </div>

      <InputForm
        inputName="healthScore"
        input={input}
        handleChange={handleChange}
        errors={errors}
      />
      <InputForm
        inputName="summary"
        input={input}
        handleChange={handleChange}
        errors={errors}
      />

      <SelectDietsForm
        handleSelectFordiets={handleSelectFordiets}
        handleDietsDelete={handleDietsDelete}
        dietsSelected={dietsSelected}
        errors={errors}
      />

      <StepsInputForm
        inputName="steps"
        input={input}
        setInput={setInput}
        errors={errors}
        setDisabled={setDisabled}
        setErrors={setErrors}
      />

      <button
        className={styles.submitButton}
        type="submit"
        disabled={disabled}
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default CreateRecipeForm;
