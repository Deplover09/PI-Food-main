import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCustomDispatch, useCustomSelector } from "../../redux/hooks/hooks";
import styles from "./idCard.module.css";
import { fecthRecipesByParams } from "../../redux/recipeSlice/asyncActions";
import { clearDetail } from "../../redux/recipeSlice/recipesSlice";

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

  return (
    <div className={styles.container}>
      {/* <div className={styles.boxButton}>
        <Link to="/">
          <button className={styles.button}>Back</button>
        </Link>
      </div> */}

      {detail !== undefined ? (
        <div className={styles.box}>
          <p className={styles.mainTitle}>{detail.name}</p>
          <img
            className={styles.image}
            src={detail.image}
            alt="img not  found"
          />
          <div className={styles.rightDive}>
            <div className={styles.idContainer}>
              <p className={styles.subTitle}>Id</p>
              <p className={styles.info}>{detail.id}</p>
            </div>
            <div className={styles.healthContainer}>
              <h3 className={styles.subTitle}>Health Score</h3>
              <p className={styles.info}>{detail.healthScore}</p>
            </div>
            <div className={styles.dietsContainer}>
              <h3 className={styles.subTitle}>Diets</h3>
              <p className={styles.info}>{detail.diets?.map((r) => r + " ")}</p>
            </div>
          </div>

          <div className={styles.stepsContainer}>
            <h3 className={styles.subTitle}>Step by Step</h3>
            <p className={styles.info}>{detail.steps}</p>
          </div>

          <div className={styles.typesContiner}>
            <h3 className={styles.subTitle}>Types of dish</h3>
            <p className={styles.info}>{detail.diets}</p>
          </div>

          <div className={styles.summaryContainer}>
            <h3 className={styles.subTitle}>Summary</h3>
            <p>{detail.summary}</p>
          </div>
        </div>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
};

export default IDCard;
