import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipe } from '../../Actions/index.js';
import styles from './Searchbar.module.css'


export default function SearchBar({setCurrentPage}){
    const dispatch = useDispatch();
    const [name,setName] = useState("")


    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    
    }

    function handleSubmit(e){
        e.preventDefault();
        setCurrentPage(1)
        dispatch(getNameRecipe(name))
        setName("")
        
    
    }

    return(
        
        <div className = {styles.container}>
            <input 
            className={styles.textBox}
            type="text"
            value={name}
            placeholder="Search..."
            onChange={e=> handleInputChange(e)}
            />
            
            <button className={styles.button} type="submit" onClick={e=> handleSubmit(e)}>Search</button>
        </div>
        
    )
}