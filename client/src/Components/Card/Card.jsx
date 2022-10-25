import React from 'react';

import styles from './Card.module.css'



export default function Card({name, image, diets, id}){


  return(
    <div className={styles.mainContainer}>
      
      
  
      
      <img className={styles.image} src={image} alt = "img not found"   />
      

      <h3 className={styles.title}>{name}</h3>
  

           <p className={styles.diets}>Types:{diets}</p>

      

    </div>
  );
}