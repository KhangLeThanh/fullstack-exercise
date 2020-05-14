import React from 'react'

const Persons = ({person,removedPerson}) =>{

  return(
    <div>
        
        <div style={{paddingBottom:'1.5em'}}>{person.name} {person.number} <button onClick={removedPerson}>Delete</button></div>
        
    </div>
   
  )
}

export default Persons
