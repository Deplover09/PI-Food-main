import React from "react";
import { Link } from "react-router-dom";
import styles from "./CreateRecipe.module.css";
import CreateRecipeForm from "./CreateUtils/CreateForm";

const CreateRecipe: React.FC = () => {
  return (
    <div className={styles.background}>
      <Link to="/">
        <button className={styles.button}>Back</button>
      </Link>
      <h1 className={styles.mainTitle}>Create your own Recipe</h1>
      <CreateRecipeForm />
    </div>
  );
};

export default CreateRecipe;
