import React from 'react'

const FilterCountry = (props) =>{
  const handleFilter = (event) => {
    props.onChange(event.target.value)
  }
  return(
    <div>
     find countries:  <input  
            value={props.value}
            onChange={handleFilter}/>
    </div>
  ) 
}

export default FilterCountry
