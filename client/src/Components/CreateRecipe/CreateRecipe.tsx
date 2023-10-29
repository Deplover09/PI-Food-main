import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, getDiets, getRepices } from "../../Redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CreateRecipe.module.css";
import noImg from "../../images/noImage.png";

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allDiets = useSelector((state) => state.diets);

  const [input, setInput] = useState({
    name: "",
    image: "",
    summary: "",
    healthScore: "",
    steps: "",
    diets: [] as string[],
    review: "",
  });

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getRepices());
  }, [dispatch]);

  function validate(input: typeof input) {
    setDisabled(false);

    let errors: Record<string, string | undefined> = {};
    if (!input.name) {
      errors.name = "Name is required";
      setDisabled(true);
    } else if (!/^\b[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(input.name)) {
      errors.name = " The name can only have letters and spaces";
      setDisabled(true);
    }

    if (!input.healthScore) {
      errors.healthScore = "Health score is required";
      setDisabled(true);
    } else if (!/\d{1,3}/.test(input.healthScore)) {
      setDisabled(true);
      errors.healthScore = "HealthScore can only be numbers";
    } else if (!/^([1-9][0-9]?|100)$/.test(input.healthScore)) {
      errors.healthScore = "HealthScore can only be from 1 to 100";
    }

    if (!input.summary) {
      errors.summary = "Summary is required";
      setDisabled(true);
    } else if (!/^\b[A-Za-zÑñÁáÉéÍíÓóÚúÜü.,\s]+$/.test(input.summary)) {
      errors.summary =
        " The summary can only have letters, spaces, dots and comas";
      setDisabled(true);
    }

    if (input.diets.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    return errors;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    console.log(disabled);
  }

  function handleSelectFordiets(e: React.ChangeEvent<HTMLSelectElement>) {
    setInput({
      ...input,
      diets: [...new Set([...input.diets, e.target.value])],
    });
  }

  function handleDietsDelete(e: string) {
    setInput({
      ...input,
      diets: input.diets.filter((typ) => typ !== e),
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!input.image) {
      input.image = noImg;
    }
    if (!input.name) {
      return alert("Enter recipe  name");
    } else if (!input.summary) {
      return alert("Enter a summary point");
    } else if (!input.healthScore) {
      return alert("Enter an healthScore point");
    } else if (!input.steps) {
      return alert("Enter a steps point");
    } else if (!input.diets.length) {
      return alert("Select at least 1 diet");
    }

    dispatch(postRecipe(input));
    alert("Recipe Created Successfully");
    setInput({
      name: "",
      image: "",
      summary: "",
      healthScore: "",
      steps: "",
      diets: [],
      review: "",
    });
    history.push("/Home");
  }

  return (
    <div className={styles.background}>
      <Link to="Home">
        <button className={styles.button}>Back</button>
      </Link>

      <h1 className={styles.mainTitle}>Create your own Recipe</h1>

      <form className={styles.formContainer}>
        <div className={styles.subContainer}>
          <label className={styles.subTitle}>Name: </label>
          <input
            className={styles.subInput}
            type="text"
            value={input.name}
            name="name"
            autoComplete="off"
            placeholder="Name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className={styles.danger}>{errors.name}</p>}
        </div>

        <div className={styles.subContainer}>
          <label className={styles.subTitle}>Image: </label>
          <input
            className={styles.subInput}
            type="text"
            value={input.image}
            name="image"
            placeholder="http://image_path.jpg"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className={styles.subContainer}>
          <label className={styles.subTitle}>Health score: </label>
          <input
            className={styles.subInput}
            type="text"
            value={input.healthScore}
            name="healthScore"
            placeholder="healthScore"
            onChange={(e) => handleChange(e)}
          />
          {errors.healthScore && (
            <p className={styles.danger}>{errors.healthScore}</p>
          )}
        </div>

        <div className={styles.subContainer}>
          <label className={styles.subTitle}>summary: </label>
          <textarea
            className={styles.subTextBox}
            maxLength={1000}
            value={input.summary}
            name="summary"
            onChange={(e) => handleChange(e)}
          ></textarea>
          {errors.summary && <p className={styles.danger}>{errors.summary}</p>}
        </div>

        <div className={styles.subContainer}>
          <label className={styles.subTitle}>steps: </label>
          <textarea
            className={styles.subTextBox}
            value={input.steps}
            name="steps"
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>

        <div className={styles.subContainer}>
          <select
            className={styles.select}
            onChange={(e) => handleSelectFordiets(e)}
          >
            <option value="">Diets</option>
            {allDiets.map((e) => (
              <option key={e.id} value={e.name}>
                {e.name}
              </option>
            ))}
          </select>

          <ul className={styles.diets}>
            <li>
              {input.diets.map((diet) => (
                <div className={styles.selectedDiets}>
                  <p>{diet}</p>
                  <button
                    className={styles.crossButton}
                    onClick={() => handleDietsDelete(diet)}
                  >
                    x
                  </button>
                </div>
              ))}
            </li>
          </ul>
        </div>

        <button
          className={styles.submitButton}
          type="submit"
          disabled={disabled}
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
