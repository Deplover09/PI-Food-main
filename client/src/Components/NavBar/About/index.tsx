import React from "react";
import styles from "./index.module.css";
import nodeJs from "../../../images/nodeJs.jpg";

export default function About() {
  const LinkedIn = "https://www.linkedin.com/in/santiago-acu%C3%B1a-894ba9256/";
  const GitHub = "https://github.com/Santiago-Acuna";

  return (
    <div className={`${styles.container} ${styles.fadeIN}`}>
      <div className={styles.gridAboutContainer}>
        <div className={styles.cardAboutItems}>
          <div className={styles.flipCard}>
            <div className={styles.flipCardInner}>
              <div className={styles.flipCardfront}>
                <img
                  src="https://media.licdn.com/dms/image/D4D03AQGQJ98-DgqIUw/profile-displayphoto-shrink_200_200/0/1668285048460?e=1677110400&v=beta&t=2GxK1kTZIRozIT1rHPhy9bJvOFJIAJp_ucAI0jg3ZSw"
                  className={styles.flipImage}
                  alt="Author"
                />
              </div>
              <div className={styles.flipCardback}>
                <h1>Santiago Acuña</h1>
                <p>Software Developer</p>
                <p>Henry's Student</p>
                <hr />
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
              </div>
            </div>
          </div>
        </div>

        <div className={styles.cardAboutItems}>
          <h2 className={styles.technologies}>Technologies:</h2>
          <div className={styles.cardAboutItems}>
            <a href="https://es.reactjs.org/">
              <img
                className={styles.icon}
                src="https://cdn.iconscout.com/icon/free/png-256/react-1-282599.png"
                alt="React"
              />
            </a>
            <a href="https://es.redux.js.org/">
              <img
                className={styles.icon}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-ius7-Jh63wNY2IEkn_za_L-jmfEt5kKNUEkSlpN7e5iABYZVH-Jbn-YADH4JT3W1-20&usqp=CAU"
                alt="Redux"
              />
            </a>
            <a href="https://developer.mozilla.org/es/docs/Glossary/HTML5">
              <img
                className={styles.icon}
                src="https://cdn0.iconfinder.com/data/icons/social-network-7/50/22-512.png"
                alt="HTML"
              />
            </a>
            <a href="https://developer.mozilla.org/es/docs/Web/CSS">
              <img
                className={styles.icon}
                src="https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_960_720.png"
                alt="CSS"
              />
            </a>
            <a href="https://nodejs.org/es/docs/">
              <img className={styles.icon} src={nodeJs} alt="NodeJs" />
            </a>
            <a href="https://www.mongodb.com/es">
              <img
                className={styles.icon}
                src="https://erandro.github.io/EranPort/assets/images/mongodb.png"
                alt="Mongo DB"
              />
            </a>
            <a href="https://www.postgresql.org/">
              <img
                className={styles.icon}
                src="https://erandro.github.io/EranPort/assets/images/typescript.png"
                alt="Typescript"
              />
            </a>
            <a href="https://developer.mozilla.org/es/docs/Learn/CSS/CSS_layout/Responsive_Design">
              <img
                className={styles.icon}
                src="https://iconarchive.com/download/i93899/graphicloads/seo-services/responsive-design.ico"
                alt="Responsive"
              />
            </a>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
}
