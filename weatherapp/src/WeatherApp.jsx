import { useState } from 'react'
import InfoBox from './InfoBox'
import SearchBox from './SearchBox'


export default function WeatherApp(){
    const [weatherInfo, setWeatherInfo] = useState({
        location : "Delhi",
        temp: 24.84,
        tempMin: 23,
        tempMax: 26,
        humidity: 47,
        feelsLike: 25,
        weather: "haze",
    });

    let updateInfo =(newInfo)=>{
        setWeatherInfo(newInfo);
    }

    return(
        <>
            <SearchBox updateInfo={updateInfo}/>
            <br />
            <InfoBox info={weatherInfo} />
        </>
    )
}