import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import nodeJs from "../../../images/nodeJs.jpg";
import profileImg from "../../../images/foto de perfil.jpg";
import reactPng from "../../../images/react.png";
import reduxPng from "../../../images/redux.png";
import htmlPng from "../../../images/html.png";
import cssPng from "../../../images/css.png";
import mongoosePng from "../../../images/mongoose.png";
import mongoDbPng from "../../../images/mongodb.png";
import expressPng from "../../../images/express.png";
import typescriptPng from "../../../images/typescript.png";
import responsivePng from "../../../images/responsive.png";

const About: React.FC = () => {
  const LinkedIn = "https://www.linkedin.com/in/santiago-acu%C3%B1a-894ba9256/";

  const GitHub = "https://github.com/Santiago-Acuna";

  const portfolio = "https://portfolio-deploy-beta.vercel.app/";

  return (
    <div className={`${styles.container} ${styles.fadeIN}`}>
      <div className={styles.cardAboutItems}>
        <Link to="/">
          <button className={styles.button}>Back</button>
        </Link>
        <div className={styles.flipCard}>
          <div className={styles.flipCardInner}>
            <div className={styles.flipCardfront}>
              <img src={profileImg} className={styles.flipImage} alt="Author" />
            </div>
            <div className={styles.flipCardback}>
              <div className={styles.cardbackSection}>
                <p className={styles.namep}>Santiago Acuña</p>
                <p>Software Developer</p>
                <p>Henry's Student</p>
              </div>
              <div className={styles.cardbackSection}>
                <h3>Social Medias</h3>
                <p>
                  <a className={styles.Link} href={LinkedIn}>
                    LinkedIn - Santiago Acuña
                  </a>
                </p>
                <p>
                  <a className={styles.Link} href={GitHub}>
                    Github - /Santiago-Acuna
                  </a>
                </p>
                <p>Gmail:</p>
                <p>santiagoacu1990@gmail.com</p>
              </div>
              <p>Portfolio:</p>
              <a className={styles.buttonA} href={portfolio}>
                <button className={styles.portfolioBtn}>Go to visit</button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.technologiesGridSide}>
        <div className={styles.technologiesContainer}>
          <h2 className={styles.technologies}>Technologies:</h2>
          <div className={styles.cardAboutItemss}>
            <a href="https://es.reactjs.org/">
              <img className={styles.icon} src={reactPng} alt="React" />
            </a>
            <a href="https://es.redux.js.org/">
              <img className={styles.icon} src={reduxPng} alt="Redux" />
            </a>
            <a href="https://developer.mozilla.org/es/docs/Glossary/HTML5">
              <img className={styles.icon} src={htmlPng} alt="HTML" />
            </a>
            <a href="https://developer.mozilla.org/es/docs/Web/CSS">
              <img className={styles.icon} src={cssPng} alt="CSS" />
            </a>
            <a href="https://nodejs.org/es/docs/">
              <img className={styles.icon} src={nodeJs} alt="NodeJs" />
            </a>
            <a href="https://www.typescriptlang.org/">
              <img
                className={styles.icon}
                src={typescriptPng}
                alt="Typescript"
              />
            </a>
            <a href="https://expressjs.com/">
              <img className={styles.icon} src={expressPng} alt="Express" />
            </a>
            <a href="https://www.mongodb.com/">
              <img className={styles.icon} src={mongoDbPng} alt="Mongo DB" />
            </a>
            <a href="https://mongoosejs.com/">
              <img className={styles.icon} src={mongoosePng} alt="Mongoose" />
            </a>
            <a href="https://developer.mozilla.org/es/docs/Learn/CSS/CSS_layout/Responsive_Design">
              <img
                className={styles.icon}
                src={responsivePng}
                alt="Responsive"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
