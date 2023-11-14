import React from "react";
import styles from "./idCard.module.css";
import signoMenorBlanco from "../../images/signo menor blanco.png";
import signoMenorCeleste from "../../images/signo menor celeste.png";

const BackButton: React.FC = () => {
  const ImgLink: React.FC<{ img1: string; img2: string }> = ({
    img1,
    img2
  }) => {
    const handleMouseOver = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
      const imgElement = e.currentTarget.querySelector("img");
      if (imgElement !== null && imgElement !== undefined) {
        imgElement.src = img2;
      }
    };

    const handleMouseOut = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
      const imgElement = e.currentTarget.querySelector("img");
      if (imgElement !== null && imgElement !== undefined) {
        imgElement.src = img1;
      }
    };

    return (
      <div
        className={styles.backButton}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onFocus={() => {}}
        onBlur={() => {}}
      >
        <img className={styles.imageBackButton} src={img1} alt="icon" />

        <p className={styles.pBackButton}>Back</p>
      </div>
    );
  };

  return <ImgLink img1={signoMenorBlanco} img2={signoMenorCeleste}></ImgLink>;
};

export default BackButton;
