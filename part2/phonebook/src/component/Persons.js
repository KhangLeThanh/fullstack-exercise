import React from 'react'

const Persons = ({person,filter}) =>{
  return(
    <div>
     {person
          .filter(contact =>contact.name.toLowerCase().includes(filter))
          .map((contact,idx) => 
            <p key={idx}>{contact.name} {contact.number}</p>
        )}
    </div>
  )
}

export default Persons
