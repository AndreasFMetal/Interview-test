import "./App.css";
import React, { useState } from "react";
import axios from "axios";

import iconSelector from "./iconSelector";
import wmoMapping from "./wmoMapping";

function App() {
  // const [data, setData] = useState({});
  const [dataDaily, setDataDaily] = useState([]);
  const [location, setLocation] = useState("");
  const [locationData, setLocationData] = useState({});
  const urlLocation = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`;
  // const [wmo, setWmo] = useState({})

  function searchCity() {
    //Find Location
    axios.get(urlLocation).then((response) => {
      setLocationData(response.data.results[0]);
      console.log("location-change");
      console.log(response.data.results[0]);
      console.log(response.data.results[0].name);
      console.log(response.data.results[0].latitude);
      console.log(response.data.results[0].longitude);

      //Weather Update
      let urlWeather = `https://api.open-meteo.com/v1/forecast?latitude=${response.data.results[0].latitude}&longitude=${response.data.results[0].longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&hourly=temperature_2m,weather_code&timezone=Europe%2FLondon&wind_speed_unit=mph&temporal_resolution=hourly_6`;
      let perDay = [];
      let index = 0;
      axios.get(urlWeather).then((response) => {
        if(response){
          // setData(response.data);
        for (index = 0; index < response.data.daily.time.length; index++) {
          if (index < 5) {
            perDay.push({
              time: response.data.daily.time[index],
              temp: response.data.daily.temperature_2m_max[index],
              tempMin: response.data.daily.temperature_2m_min[index],
              code: response.data.daily.weather_code[index],
              wind: response.data.daily.weather_code[index],
            });
                    }          }
        }
        setDataDaily(perDay);
        console.log(response.data);
        console.log(perDay);
      })
    }).catch(error => {
      alert('Selected country was not found, please search again');
    });
  }

  const change = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="top">
            <div className="headerTitle">Ageas Weather App</div>
            <div className="search">
              <input
                type="text"
                id="searchBox"
                value={location}
                onChange={change}
                placeholder="Enter Locaiton"
              ></input>
              <button onClick={searchCity} className="searchButton">
                Search
              </button>
            </div>
          </div>
          <div className="locationLabel">
            <div> {locationData.name} {locationData.country}</div>
          </div>
          {/* <div> {locationData.latitude}</div>
          <div> {locationData.longitude}</div> */}
          <div className="bottomContainer">
            <div className="bottom">
              <div className="container">
                <div className="daysContainer">
                  {dataDaily.map((day, index) => {
                    return (
                      <div key={index} className="day-col">
                        <div className="day-date p20 f20">{day.time}</div>
                        <div className="weather-icon">
                          <img
                            className="icon"
                            alt='weatherIcon' src={iconSelector(day.code)}
                          ></img>
                        </div>
                        <div className="weather-description-label">
                          {/* <span>Weather: </span> */}
                          <span className="description">
                            {wmoMapping(day.code)}
                          </span>
                        </div>
                        <div className="temprature-label">
                          <span className="f20">Temprature: </span>
                          <span className="tempMin f20 blue">{day.tempMin}</span>
                          <span className="f20 blue">°C</span><span className="f20"> - </span>
                          <span className="tempMin f20 red">{day.temp}</span>
                          <span className="f20 red">°C</span>
                        </div>
                        <div className="wind-speed f20">
                          <span>Wind Speed: </span>
                          <span className="windSpeed f20">{day.wind}</span>
                          <span>mph</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container"></div>
      </header>
    </div>
  );
}

export default App;
