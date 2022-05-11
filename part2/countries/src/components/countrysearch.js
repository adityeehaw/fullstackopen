import React from "react"
import GetWeather from "./weather"

const Countrysearch = ({countries, searchName, setSearch}) => {
    
    const getLanguages = (country) => {
        const arr = []
        for (const lang in country.languages) {
            arr.push(country.languages[lang])
        }
        return(
            arr.map((ar) => <li key = {ar}>{ar}</li>)
        )
    }
    
    const countryfilter = countries.filter(country => country.name.common.toLowerCase().includes(searchName.toLowerCase()))


    if (searchName == ''){
        return ('')
      }
    else if (countryfilter.length >= 10 && searchName != ''){
        return (<p>Too Many matches</p>)
    }
    else if (countryfilter.length > 1 &&  countryfilter.length < 10  && searchName != ''){
       return (countryfilter
         .map(country =>
            
             <p key = {country.name.common}>{country.name.common} <button value = {country.name.common} onClick = {(event) => setSearch(event.target.value)}>Show</button></p>
             
            
       ))
     }
    else if (countryfilter.length === 1 && searchName != ''){
        return(countryfilter
            .map(country => 
            <div key = {country.name.common}>
                <h1>{country.name.common}</h1>
                <p>capital: {country.capital}</p>
                <p>Area: {country.area} sq.km</p>
                <h3>Languages:</h3>
                <ul >
                {getLanguages(country)}
                </ul>
                    
                <img src={country.flags.png}/>

                <GetWeather country={country}/>
            </div>)

        )
    }
  }

export default Countrysearch