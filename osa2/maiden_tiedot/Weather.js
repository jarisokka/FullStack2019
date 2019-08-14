import React from 'react'

const Weather = ({weather, city}) => {
    console.log('kaupunki ' + city)
    if (city === null) {
      return null
    }
    return (
    <div>
    <h3>weather in {city}</h3>
      <p><b>temperature </b> {weather.temp_c}  Celsius</p>
      <img
    src={weather.condition.icon}
    alt={`${weather.condition.icon}'s icon`}
    style={{ width: '50px', height: '50px' }}
    />
      <p><b>wind </b> {weather.wind_kph}  kph direction {weather.wind_dir}</p>
    </div>
    )
  }  

export default Weather