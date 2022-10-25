import React, {useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { recipeParams, clearDetail } from '../../Actions/index.js'
import styles from './idCard.module.css'




export default function IDCard(props){
  console.log(props.match.params.id)
  // let {id} = useParams(); 
  const id =  props.match.params.id
  const detail = useSelector(state => state.detail);
   const dispatch = useDispatch();
//   useEffect( () => {
//     dispatch(getDetail(id));
// },[dispatch,id])
  useEffect(() => {
  dispatch(recipeParams(id))
      return () => {
          dispatch(clearDetail())
      }
  }, [dispatch,id])
  console.log(id)
  console.log(detail)
  


  return(
        
      <div className={styles.container}>
        {detail ?  (
          <div className={styles.all}>
          <div  className={styles.infoContainer}>   
            <h1 class="nombreDetail">
              <br /> {detail.name}
            </h1>
            <img
              src={detail.image}
              alt="pokemon"
              width="190px"
              height="225x"
            />
              <div>

              <h4>ID: {detail.id}</h4>
              </div>

              <div className={styles.lifeContainer} >
              <h4>Health Score: {detail.healthScore}</h4>
              </div>

              <h4>Type of dish: {detail.types}</h4>

              <div className={styles.defenseContainer}>

              <h4>Summary: {detail.summary}</h4>

              </div>
              <h4>Step by step: {detail.steps}</h4>

              <div className={styles.speedContainer}>


              
              <div className={styles.typesContainer}>
            <h4>Diets: {detail.diets?.map(t => (t + " "))} </h4>
            </div>

            </div> 

            </div>
             
            
          </div>
        ) : (
          <p>Loading..</p>
        )}
        <div className={styles.buttonContainer}>

        <Link to="/home">
          <button className= {styles.btn4}>Back</button>
        </Link>
        </div>
      </div>
    






 
    
  );



  
}


      