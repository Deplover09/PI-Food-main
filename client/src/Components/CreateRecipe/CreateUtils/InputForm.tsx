import styles from "../CreateRecipe.module.css";
import { type recipeFormState } from "./CreateForm";

interface inputFormProps {
  inputName: string;
  input: recipeFormState;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  errors: Record<string, string | undefined>;
}

const InputForm: React.FC<inputFormProps> = ({
  inputName,
  input,
  handleChange,
  errors
}) => {
  const isHealScore = inputName === "healScore" ? "heal score" : inputName;
  const firstLetter = isHealScore.charAt(0).toUpperCase();
  const inputNameCapitalLetter = firstLetter + isHealScore.slice(1);
  if (inputName === "summary") {
    return (
      <div className={styles.subContainer}>
        <label className={styles.subTitle} htmlFor={inputName}>
          {inputNameCapitalLetter}:
        </label>
        <textarea
          id={inputName}
          className={styles.subTextBox}
          maxLength={1000}
          value={input[inputName]}
          name={inputName}
          autoComplete="off"
          placeholder={inputNameCapitalLetter}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {errors[inputName] !== undefined && (
          <p className={styles.danger}>{errors[inputName]}</p>
        )}
      </div>
    );
  }
  return (
    <div className={styles.subContainer}>
      <label className={styles.subTitle} htmlFor={inputName}>
        {inputNameCapitalLetter}:
      </label>
      <input
        id={inputName}
        className={styles.subInput}
        type="text"
        value={input[inputName] ?? ""}
        name={inputName}
        autoComplete="off"
        placeholder={inputNameCapitalLetter}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      {errors[inputName] !== undefined && (
        <p className={styles.danger}>{errors[inputName]}</p>
      )}
    </div>
  );
};

export default InputForm;
