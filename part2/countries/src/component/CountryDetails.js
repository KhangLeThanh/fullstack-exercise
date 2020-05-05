import React, { useState }  from 'react'
import Weather from './Weather';


const CountryDetails = ({country,filter}) =>{
  const [count, setCounts] = useState('');
  let result = country.filter(item => item.name.toLowerCase().includes(filter))
 
  return(
    <div>
     {result.length < 10 ?
        <div>
          {result.length > 1 ?
            result.map((filterCountry,idx) => (
              <div key={idx} id={idx}>
                <p>{filterCountry.name} <span><button value={idx} onClick={(e) => setCounts(e.target.value)}>show</button></span></p>       
                {idx === parseInt(count) ?
                  <div>
                    <h1>{filterCountry.name} </h1>          
                    <p>capital {filterCountry.capital}</p>
                    <p>population {filterCountry.population}</p>
                    <h2>languages</h2>
                    <ul>
                      {filterCountry.languages.map((language,index)=>(
                        <li key={index}>
                            {language.name}
                        </li>
                      ))}
                    </ul>
                    <img style={{width:'250px', height:'250px'}} src={filterCountry.flag} alt="country_flag" />
                      <h2>Weather in {filterCountry.capital}</h2>
                      <Weather country={filterCountry.capital}/>
                  </div>
                :
                  <div></div>
                }
              </div>
            ))
          :
            result.map((filterCountry,idx) => (
              <div key={idx}>
                <h1>{filterCountry.name} </h1>          
                <p>capital {filterCountry.capital}</p>
                <p>population {filterCountry.population}</p>
                <h2>languages</h2>
                <ul>
                  {filterCountry.languages.map((language,index)=>(
                    <li key={index}>
                        {language.name}
                    </li>
                  ))}
                </ul>
                <img style={{width:'250px', height:'250px'}} src={filterCountry.flag} alt="country_flag" />
                <Weather country={filterCountry.capital}/>

              </div>
            ))
          } 
        </div>
        : 
          <p>Too many matches, specify another filter</p>
        }   
     
    </div>
  )
}

export default CountryDetails
