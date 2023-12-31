import { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayWeather = ( {city, temp, wind, ico }) => {
    const icoURL = `https://openweathermap.org/img/wn/${ico}@2x.png`
    return (
        <>
            <h2>weather in {city}</h2>
            <p>temperature {(temp -273.15).toFixed(2)} Celcius</p>
            <img src={icoURL} height={100}></img>
            <p>wind {wind} m/s</p>
        </>
    )
}

const CountryView = ({ country }) => {
    const api_key = import.meta.env.VITE_SOME_KEY
    const name = country.name.common
    
    const capital = country.capital[0]

    // Weather
    const [weather, setWeather] = useState()
    useEffect(() => {
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=${api_key}`)
            .then(response => {
                setWeather(response.data)
            })
    }, [])

    const area = country.area

    const flag = country.flags.png
    const flagStyles = {
    height: 300,
    width: 'auto'
    }

    const languages = Object.values(country.languages)    
    
    return (
    <div>
    <h1>{name}</h1>
    <p>capital {capital}</p>
    <p>area {area}</p>
    <h3>languages</h3>
    <ul>
        {languages.map(lang => 
        <li key={lang}>{lang}</li>
        )}
    </ul>
    <img style={flagStyles} src={flag}></img>
    {weather && <DisplayWeather city={capital} temp={weather['main']['temp']} wind={weather['wind']['speed']} ico={weather['weather'][0]['icon']}/>}
    </div> 
    )
}

const View = ({ countries, setCountries }) => {
    
    // Show button
    const showButton = name => {
        const coun = [countries.find(c => c.name.common === name)]
        
        setCountries(coun)
    }
    
    if (countries.length > 10) {
      return <div><p>too many matches bro</p></div>
    }
    else if (countries.length === 1) {
      return <CountryView country={countries[0]} />
    }
    return (
      <div>
        {countries.map(country => (
          <p key={country.name.common}>{country.name.common} <button onClick={() => showButton(country.name.common)}>show</button></p>
        ))}
      </div>
    );
  };

export default View