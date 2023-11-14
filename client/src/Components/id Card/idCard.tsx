import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCustomDispatch, useCustomSelector } from "../../redux/hooks/hooks";
import styles from "./idCard.module.css";
import { fecthRecipesByParams } from "../../redux/recipeSlice/asyncActions";
import { clearDetail } from "../../redux/recipeSlice/recipesSlice";
import BackButton from "./backButton";

const IDCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { detail } = useCustomSelector((state) => state.recipe);
  const dispatch = useCustomDispatch();

  useEffect(() => {
    id !== null && id !== undefined && dispatch(fecthRecipesByParams(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);
  const dietsText = detail?.diets?.map((r) => r + ",").join(" ");
  const firstLetter = dietsText?.charAt(0).toUpperCase();
  const restOfString = dietsText?.slice(1, -1);
  const lastChar = dietsText?.slice(-1);
  const replacedLastChar = lastChar === "." ? lastChar : ".";
  const dietsFinalText = `${firstLetter}${restOfString}${replacedLastChar}`;
  return (
    <div className={styles.container}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <BackButton />
      </Link>

      {/* </div> */}

      {detail !== undefined ? (
        <div className={styles.box}>
          <p className={styles.mainTitle}>{detail.name}</p>
          <div className={styles.imageDiv}>
            <img
              className={styles.image}
              src={detail.image}
              alt="img not  found"
            />
          </div>
          <div className={styles.rightDive}>
            <div className={styles.idContainer}>
              <h3 className={styles.subTitle}>Id</h3>
              <p className={styles.info}>{detail.id}</p>
            </div>
            <div className={styles.healthContainer}>
              <h3 className={styles.subTitle}>Health Score</h3>
              <p className={styles.info}>{detail.healthScore}</p>
            </div>
            <div className={styles.dietsContainer}>
              <h3 className={styles.subTitle}>Diets</h3>
              <p className={styles.info}>{dietsFinalText}</p>
            </div>
          </div>
          <div className={styles.summaryContainer}>
            <h3 className={styles.subTitle}>Summary</h3>
            <p className={styles.info}>{detail.summary}</p>
          </div>

          <div className={styles.stepsContainer}>
            <h3 className={styles.subTitle}>Step by Step</h3>
            <p className={styles.info}>{detail.steps}</p>
          </div>
        </div>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
};

export default IDCard;
