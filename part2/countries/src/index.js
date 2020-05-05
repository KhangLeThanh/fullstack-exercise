import React, { useState,  useEffect }  from 'react'
import axios from 'axios'
import FilterCountry from './component/FilterCountry'
import CountryDetails from './component/CountryDetails'
import ReactDOM from 'react-dom'

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ find_country, setFindCountries] = useState('') 

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
      
  }, [])
  const handleFilter = (newValue) => {
    setFindCountries(newValue)
  }

 
  return (
    <div>
      <FilterCountry  value={find_country} onChange={handleFilter}/>
     
      <CountryDetails country={countries} filter={find_country}/>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)