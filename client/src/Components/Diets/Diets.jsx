import React from "react";



export default function DietsSelectOption({allDiets}){
    
return(

    <>
        {
            allDiets?.map(e =>{
                return(
                    <option key={e.id} value={e.name} >
                    
                        {
                            e.name
                        }
                    </option>
                )
            })
        }
    </>
    
)

}