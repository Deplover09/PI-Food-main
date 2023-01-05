import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {postRecipe, getDiets, getRepices} from "../../Redux/Actions/index.js";
import {useDispatch, useSelector} from "react-redux";
import styles from './CreateRecipe.module.css'
import noImg from '../../images/noImage.png'




export default function CreatePokemon() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allDiets = useSelector(state => state.diets);
  
    
    // const [errorValidated, setErrorValidated] = useState({})
    
    const [input, setInput] = useState({
        
        name:"",
        image: "",
        summary: "",
        healthScore:"",
        steps:"",
        diets:[],
        review:"",
    });

    const[errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true)


    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch]);
    useEffect(() => {
        dispatch(getRepices())
    }, [dispatch]);


    function validate(input) {
        setDisabled(false)

  
        let errors = {};
        if (!input.name) {
          errors.name = 'Name is required';
          setDisabled(true)
        } else if (!/^\b[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(input.name) ) {
          errors.name = ' The name can only have letters and spaces';
          setDisabled(true)
        } 
        
        if (!input.healthScore) {
        errors.healthScore = 'Health score is required'
        setDisabled(true)
        }  else if(!/\d{1,3}/.test(input.healthScore)){
        setDisabled(true)
        errors.healthScore = 'HealthScore can only be numbers'
        } else if (!/^([1-9][0-9]?|100)$/.test(input.healthScore)){
        errors.healthScore = 'HealthScore can only be from 1 to 100'
        } 
        
        if (!input.summary) {
            errors.summary = 'Summary is required';
            setDisabled(true)
          } else if (!/^\b[A-Za-zÑñÁáÉéÍíÓóÚúÜü.,\s]+$/.test(input.summary) ) {
            errors.summary = ' The summary can only have letters, spaces, dots and comas';
            setDisabled(true)
          }

          if(input.diets.length === 0){
            setDisabled(true)
          }
        else {
        setDisabled(false)
        }
      
        return errors;
      };


    // useEffect(()=>{
    //     if(errors){
    //         setDisabled(true); //si no se deshabilitara el boton submit
            
    //       } else {
    //         setDisabled(false); //si todo esta correcto se habilitara el boton submit
    //       };

    // }, [errors, dispatch, disabled, input])


    function handleChange(e){
        
        setInput({ 
              ...input,
                [e.target.name]: e.target.value
            
        })

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
          }));





        //   console.log(errors.keys.length)
          console.log(disabled)
       
    }

    function handleSelectFordiets(e){
        setInput({
            ...input,
            diets: [...new Set([...input.diets, e.target.value])]
            
        })
        
    }

    function handleDietsDelete(e){
        setInput({
            ...input,
            diets: input.diets.filter(typ => typ !== e)
        })
    }
   
    function handleSubmit(e){
        e.preventDefault()

        if(!input.image){
            input.image = noImg;
        }
        if(!input.name){
            return alert('Enter recipe  name');
        } else if(!input.summary){
            return alert('Enter a summary point');
        }
        else if(!input.healthScore) {
            return alert("Enter an healthScore point");
        }else if(!input.steps) {
            return alert("Enter a steps point");
        }else if(!input.diets.length){
            return alert('Select at least 1 diet');
        }
        

        dispatch(postRecipe(input))
        alert("Recipe Created Successfully")
        setInput({
            name:"",
            image: "",
            summary: "",
            healthScore:"",
            steps:"",
            diets:[],
            // review:""
        })
        history.push("/Home")
    }

    

    return(
    
    
    <div className = {styles.background}  >
    
                        <Link to="Home"><button className = {styles.button}>Back</button></Link>          

                <h1 className ={styles.mainTitle} >Create your own Recipe</h1>
                {/* onSubmit={e => handleSubmit(e)} */}

                <form className={styles.formContainer} > 

                        <div className={styles.subContainer} >
                        {/* htmlFor="name" */}
                            <label className={styles.subTitle} >Name: </label>
                            <input 
                                className={styles.subInput}
                                type="text" 
                                value={input.name}
                                name="name"
                                // required=""
                                autoComplete="off"
                                placeholder="Name"
                                onChange={e =>handleChange(e)}
                            />
                            {errors.name && (<p className={styles.danger}>{errors.name}</p>)}
                            
                            {/* {!input.name || !expReg.test(input.name)? <h4 >{"Enter a Valid Name"}</h4>: false} */}
                        </div>

                        {/* --------------------------------------- */}

                        <div className={styles.subContainer}   >
                            <label className={styles.subTitle} >Image: </label>
                            <input
                               className={styles.subInput}
                                type="text" 
                                value={input.image}
                                name="image"
                                placeholder="http://image_path.jpg"
                                onChange={e =>handleChange(e)}
                            />
                        </div>

                        

                        {/* ---------------------------------------- */}
                        <div className={styles.subContainer} >
                            <label className={styles.subTitle} >Health score: </label>
                                <input
                                    className={styles.subInput}
                                    type="text" 
                                    value={input.healthScore}
                                    name="healthScore"
                                    placeholder="healthScore"
                                    onChange={e =>handleChange(e)}
                                />
                                {errors.healthScore && (<p className={styles.danger}>{errors.healthScore}</p>)}
                            </div> 

                        {/* --------------------------------------- */}

                        <div className={styles.subContainer} >
                            <label className={styles.subTitle} >summary: </label>
                            <textarea 
                                className={styles.subTextBox}
                                maxLength="1000"
                                type="text" 
                                value={input.summary}
                                name="summary"
                                onChange={e =>handleChange(e)}
                            >
                             </textarea>
                            {errors.summary && (<p className={styles.danger}>{errors.summary}</p>)}

                        </div> 

                        {/* --------------------------------------- */}

                        <div className={styles.subContainer} >
                            <label className={styles.subTitle} >steps: </label>
                            <textarea
                               className={styles.subTextBox}                         
                                type="text" 
                                value={input.steps}
                                name="steps"
                                onChange={e =>handleChange(e)}
                            >
                                </textarea> 
                            
                        </div>

                        {/* --------------------------------------- */}
                                                                    
                        
                        <div  className={styles.subContainer} >
                            <select className={styles.select} onChange={e =>handleSelectFordiets(e)}>
                                <option value="">Diets</option>
                                {   allDiets.map( e =>(
                                        <option key={e.id} value={e.name}>{e.name}</option>
                                    ))  
                                } 
                            </select> 

                            <ul className={styles.diets}>
                        <li>                            
                            {input.diets.map(diet => 
                            <div className={styles.selectedDiets}>
                                <p>{diet}</p>
                                <button className={styles.crossButton} onClick={() => handleDietsDelete(diet)}>x</button>
                            </div>
                            )}
                        </li>
                    </ul>
                            
                        </div>
                        {console.log(disabled)}


                        
                        {/* --------------------------------------- */}

                        <button className={styles.submitButton}  type="submit" disabled={disabled}  onClick={e => handleSubmit(e)}>Create</button>
                        {/* onClick={e => handleSubmit(e)} */}
                        
                    
                </form>
{/* 
                <ul className={styles.diets}>
                        <li>                            
                            {input.diets.map(diet => 
                            <div className={styles.selectedDiets}>
                                <p>{diet}</p>
                                <button className={styles.crossButton} onClick={() => handleDietsDelete(diet)}>x</button>
                            </div>
                            )}
                        </li>
                    </ul>
             */}

        
            {/* <div >
         
            {input.diets.map(e =>
                    <div ckey={e}>
                        
                        <p onClick={()=> handleDietsDelete(e)} >{e}</p>
                       
                    </div>
            )}
            </div>

            <div >
        

            </div> */}
            
    
    </div>
    
    )
}