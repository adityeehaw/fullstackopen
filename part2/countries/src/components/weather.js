import React from "react";
import { useEffect,useState } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_WEATHERAPI

const GetWeather = ({country}) => {

    const [weather,setWeather] = useState([])

    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`)
        .then(response => {
            setWeather(response.data)})
    },[])

    const weathericon = weather?.weather?.length ? weather?.weather[0].icon : "10d"

    return (
        <div>
            <h1>weather in : {country.capital}</h1>
            <p>tempertaure : {weather.main?.temp}K</p>
            <img src = {`http://openweathermap.org/img/wn/${weathericon}@2x.png`}/>
            <p>wind speed: {weather.wind?.speed} m/s</p>
        </div> 
    )
}


export default GetWeather