import React from 'react';
import  styles from './paginado.module.css'




export default function Paginado( {recipesPage, allRecipes, paginado} ){

  const pageNumbers = []

  for(let i = 0; i < Math.ceil(allRecipes/recipesPage); i++){
      pageNumbers.push(i+1)
  }

  return(
      <nav > 
          <ul className={styles.barra}>
              {
                
                  pageNumbers?.map( number => (
                      
                          <li  key={number}>
                              <a onClick={()=> paginado(number)}>{number}</a>

                          </li>
                          ))

                      
                
              }
          </ul>
      </nav>
  )

}