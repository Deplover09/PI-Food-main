import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {postRecipe, getDiets, getRepices} from "../../Actions/index.js";
import {useDispatch, useSelector} from "react-redux";
import styles from './CreateRecipe.module.css'
import noImg from '../../images/noImage.png'




export default function CreatePokemon() {
    const dispatch = useDispatch();
    const history = useHistory();
    const alldiets = useSelector(state => state.diets);
  
    
    // const [errorValidated, setErrorValidated] = useState({})
    
    const [input, setInput] = useState({
        
        name:"",
        image: "",
        summary: "",
        healthScore:"",
        steps:"",
        diets:[]
        
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
        } else {
            setDisabled(false)
        }

    //   if (!input.healthScore) {
    //     errors.healthScore = 'HealthScore is required'
    //   } else if(/\d{1,3}/.test(input.healthScore)){
    //     errors.healthScore = 'HealthScore can only be numbers'
    
    //   } else if (/^([1-9][0-9]?|100)$/.test(input.healthScore)){
    //     errors.healthScore = 'HealthScore can only be from 1 to 100'
    //   }
      
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

    function handledietsDelete(e){
        setInput({
            ...input,
            diets: input.diets.filter(typ => typ !== e)
        })
    }


    // ^([1-9][0-9]?|100)$
 
    let expReg = /^\b[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s0-9]+$/;
    function handleSubmit(e){
        e.preventDefault()

        // if(!input.image){
        //     input.image = noImg;
        // }
        // if(!input.name){
        //     return alert('Enter game name');
        // }else if(!expReg.test(input.name)){
        //     return alert('The name must only have letters or numbers')
        // }
        // else if(!input.summary){
        //     return alert('Enter a summary point');

        // }
        // else if(!input.healthScore) {
        //     return alert("Enter an healthScore point");
        // }else if(!input.steps) {
        //     return alert("Enter a steps point");
        // }else if(!input.diets.length){
        //     return alert('Select at least 1 genres');
        // }
        

        dispatch(postRecipe(input))
        alert("Pokemon Created Successfully")
        setInput({
            name:"",
            image: "",
            summary: "",
            healthScore:"",
            steps:"",
            diets:[]
        })
        history.push("/Home")
    }

    

    return(
    
    <div >
    <div className = {styles.content}  >
    <div >
                        <Link to="Home"><button className = {styles.btn}>Back</button></Link>
                        </div>
    <div className ={styles.container}>
    
        <div  >
            
            <div >

                <h1 className ={styles.text} >Create your own Pokemon!</h1>
                {/* onSubmit={e => handleSubmit(e)} */}

                <form onSubmit={e => handleSubmit(e)}>  
                    <div>
                        <div className={styles.cint3} >
                        {/* htmlFor="name" */}
                            <label htmlFor="name" >Name: </label>
                            <input 
                                className={styles.cint2}
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

                        <div className = {styles.cint3}  >
                            <label htmlFor="image" >Image: </label>
                            <input
                                className = {styles.cint2}
                                type="text" 
                                value={input.image}
                                name="image"
                                required=""
                                autoComplete="off"
                                placeholder="http://image_path.jpg"
                                onChange={e =>handleChange(e)}
                            />
                        </div>

                        

                        {/* ---------------------------------------- */}
                        <div className = {styles.cint3} >
                            <label htmlFor="healthScore" >healthScore: </label>
                                <input
                                    className = {styles.cint2}
                                    type="text" 
                                    value={input.healthScore}
                                    name="healthScore"
                                    required=""
                                    autoComplete="off"
                                    placeholder="healthScore"
                                    onChange={e =>handleChange(e)}
                                />
                                
                            </div> 

                        {/* --------------------------------------- */}

                        <div className = {styles.cint3} >
                            <label htmlFor="steps" >steps: </label>
                            <input 
                               className = {styles.cint2}
                                type="text" 
                                value={input.steps}
                                name="steps"
                                required=""
                                autoComplete="off"
                                placeholder="steps"
                                onChange={e =>handleChange(e)}
                            />
                            
                        </div>

                        {/* --------------------------------------- */}
                                              
                        <div className = {styles.cint3} >
                            <label htmlFor="summary" >summary: </label>
                            <input 
                                className = {styles.cint2}
                                type="text" 
                                value={input.summary}
                                name="summary"
                                required=""
                                autoComplete="off"
                                placeholder="summary"
                                onChange={e =>handleChange(e)}
                            />

                        </div> 
                       
                            
                        </div>
                        <div >
                        <div>
                            <select onChange={e =>handleSelectFordiets(e)}>
                                <option value="typ">diets</option>
                                {   alldiets.map( e =>(
                                        <option key={e.id} value={e.name}>{e.name}</option>
                                    ))  
                                } 
                            </select> 
                            
                        </div>
                        
                        
 
                        </div>
                        {/* --------------------------------------- */}

                        <button className = {styles.btn} type="submit" disabled={disabled} >Create</button>
                        {/* onClick={e => handleSubmit(e)} */}
                        
                    
                </form>
            </div>

        </div>
            <div >
         
            {input.diets.map(e =>
                    <div ckey={e}>
                        
                        <p onClick={()=> handledietsDelete(e)} >{e}</p>
                       
                    </div>
            )}
            </div>

            <div >
        

            </div>
            
    </div>
    </div>
    </div>
    )
}