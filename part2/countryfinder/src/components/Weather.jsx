import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from './Loading'
const api_key = import.meta.env.VITE_SOME_KEY

const Weather = (capital) => {

    const wheatherCapital = capital.capital
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${wheatherCapital}&appid=${api_key}`
    const [weather, setWeather] = useState([])

    useEffect(() => {
        axios.get(baseUrl)
        .then(arr => {
            setWeather([arr.data.main.temp, arr.data.wind.speed, arr.data.weather[0].icon], arr.data.weather[0].description)
        })
    }, [])

    const iconUrl = `https://openweathermap.org/img/wn/${weather[2]}@2x.png`

  return (
    <div>
        <h2>Weather in {wheatherCapital}</h2>

        <div>temperature {weather[0]} Celcius</div>
        {weather[2] ? <img src={iconUrl} alt={weather[3]} /> : <Loading />}
        <div>wind {weather[1]} m/s</div>
    </div>
  )
}

export default Weather