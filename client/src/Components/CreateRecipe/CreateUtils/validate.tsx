import { type recipeFormState } from "./CreateForm";

interface validateProps {
  input: recipeFormState;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setErrors: React.Dispatch<
    React.SetStateAction<Record<string, string | undefined>>
  >;
}

const validate = ({ input, setDisabled, setErrors }: validateProps): void => {
  setDisabled(false);

  const errors: Record<string, string | undefined> = {};
  setErrors(errors);
  if (input.name === "") {
    errors.name = "Name is required";
    setDisabled(true);
  } else if (!/^\b[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(input.name)) {
    errors.name = " The name can only have letters and spaces";
    setDisabled(true);
  }

  if (input.healthScore === undefined) {
    errors.healthScore = "Health score is required";
    setDisabled(true);
  } else if (!/\d{1,3}/.test(input.healthScore.toString())) {
    setDisabled(true);
    errors.healthScore = "HealthScore can only be numbers";
  } else if (!/^([1-9][0-9]?|100)$/.test(input.healthScore.toString())) {
    errors.healthScore = "HealthScore can only be from 1 to 100";
  }

  if (input.summary === "") {
    errors.summary = "Summary is required";
    setDisabled(true);
  } else if (!/^\b[A-Za-zÑñÁáÉéÍíÓóÚúÜü.,\s]+$/.test(input.summary)) {
    errors.summary =
      " The summary can only have letters, spaces, dots and comas";
    setDisabled(true);
  }

  if (input.diets.length === 0 || input.diets[0] === "") {
    errors.steps = "At least one step is required";
    setDisabled(true);
  } else {
    setDisabled(false);
  }

  setErrors(errors);
};

export default validate;
