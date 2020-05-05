import React, { useState, useEffect }  from 'react'
import axios from 'axios'

const Weather = ({country}) =>{
    
    const [ weather, setWeather] = useState([]) 
    useEffect(() => {
        axios
          .get(`http://api.weatherstack.com/current?access_key=867c7f5f0a7d8f61c40cf154437e932b&query=${country}`)
          .then(response => {
            setWeather(response.data)
          })
          
      }, [])
    return(
        <div>
            {weather.current !== undefined ?
            <div>
                <p><strong>Temperature:</strong>{weather.current.temperature} Celcius</p>
                <img src={weather.current.weather_icons} alt="weather_icon"/>
                <p><strong>wind:</strong>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
            </div>
            :
            <div><p>Loading...</p></div>
            }
        </div>
    )  
}

export default Weather
