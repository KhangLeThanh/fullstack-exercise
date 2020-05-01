import React from 'react'

const Filter = (props) =>{
  const handleFilter = (event) => {
    props.onChange(event.target.value)
  }
  return(
    <div>
     filter shown with: <input  
            value={props.value}
            onChange={handleFilter}/>
    </div>
  ) 
}

export default Filter
