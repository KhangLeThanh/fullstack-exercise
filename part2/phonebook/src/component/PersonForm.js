import React from 'react'

const PersonForm = ({values, onChange, onSubmit}) =>{
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: 
          <input  
            value={values.name}
            name="name"
            onChange={onChange}/>
        </div>
        <div>
          number: 
          <input  
            value={values.number}
            name="number"
            onChange={onChange}/>
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
