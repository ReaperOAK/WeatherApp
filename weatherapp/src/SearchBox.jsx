import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import './SearchBox.css';

export default function SearchBox({updateInfo}){
    let [location, setLocation] = useState("");
    let [error, setError] = useState(false);

    let getWeatherInfo = async()=>{
        try{
            let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&limit=1&units=metric&appid=a40f172d87c3e6b212997a790ff44ae9`);
            let jsonResponse = await response.json();
            let result = {
                location : location,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            }
            return result;
        }catch(err){
            throw err;
        }
    };

    let handleChange = (evt) => {
        setLocation(evt.target.value);
    };

    let handleSubmit = async (evt) =>{
        try{
            evt.preventDefault();
            setLocation("");
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setError(false);
        }catch(err){
            setError(true);
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className='formElements'>
                <TextField id="location" label="Location" variant="outlined" required value={location} onChange={handleChange} />
                <Button variant="contained" type="submit">
                    Search
                </Button></div>
                <div>
                {error && <p style={{color : "red", textAlign: "center"}}>Location not found in our database!</p>}</div>
            </form>
            
        </div>
    )
}