import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { recipeParams, clearDetail } from "../../Redux/Actions/index";
import styles from "./idCard.module.css";

interface IDCardProps {
  match: {
    params: {
      id: string;
    };
  };
}

export default function IDCard(props: IDCardProps) {
  const { id } = useParams<{ id: string }>();
  const detail = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recipeParams(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      <div className={styles.boxButton}>
        <Link to="/home">
          <button className={styles.button}>Back</button>
        </Link>
      </div>
      <div className={styles.subContainer}>
        {detail ? (
          <div className={styles.box}>
            <img
              className={styles.image}
              src={detail.image}
              alt="img not found"
            />

            <h1 className={styles.mainTitle}>{detail.name}</h1>

            <div className={styles.healthContainer}>
              <h3 className={styles.subTitle}>Health Score</h3>
              <p className={styles.info}>{detail.healthScore}</p>
            </div>

            <div className={styles.dietsContainer}>
              <h3 className={styles.subTitle}>Diets</h3>
              <p className={styles.info}>{detail.diets?.map((r) => r + " ")}</p>
            </div>

            <div className={styles.stepsContainer}>
              <h3 className={styles.subTitle}>Step by Step</h3>
              <p className={styles.info}>{detail.steps}</p>
            </div>
            <div className={styles.idContainer}>
              <h3 className={styles.subTitle}>Id</h3>

              <p className={styles.info}>{detail.id}</p>
            </div>

            <div className={styles.typesContiner}>
              <h3 className={styles.subTitle}>Types of dish</h3>
              <p className={styles.info}>{detail.types}</p>
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
    </div>
  );
}
