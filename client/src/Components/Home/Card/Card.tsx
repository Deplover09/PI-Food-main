import React from "react";
import styles from "./Card.module.css";

interface CardProps {
  name: string;
  image: string;
  diets: string[];
  id: string;
}

const Card: React.FC<CardProps> = ({ name, image, diets }) => {
  return (
    <div className={styles.mainContainer}>
      <img className={styles.image} src={image} alt="img not found" />
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.diets}>Types: {diets.join(", ") + "."}</p>
    </div>
  );
};
export default Card;
