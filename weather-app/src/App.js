import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import sunny from "./img/sunny.gif";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [locationData, setLocationData] = useState({});
  const urlLocation = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`;

  function click() {
    //Find Location
    axios.get(urlLocation).then((response) => {
      setLocationData(response.data.results[0]);
      console.log("location-change");
      console.log(response.data.results[0]);
      console.log(response.data.results[0].name);
      console.log(response.data.results[0].latitude);
      console.log(response.data.results[0].longitude);

      //Weather Update
      let urlWeather = `https://api.open-meteo.com/v1/forecast?latitude=${response.data.results[0].latitude}&longitude=${response.data.results[0].longitude}&daily=weather_code,wind_speed_10m_max,temperature_2m_max&hourly=temperature_2m,weather_code&timezone=Europe%2FLondon&wind_speed_unit=mph&temporal_resolution=hourly_6`;
      axios.get(urlWeather).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
    });
  }

  const change = (event) => {
    setLocation(event.target.value);
  };

  function weatherUpdate() {}

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
              <button onClick={click} className="searchButton">
                Search
              </button>
            </div>
          </div>
          <div> {locationData.name}</div>
          {/* <div> {locationData.latitude}</div>
          <div> {locationData.longitude}</div> */}
          <div className="bottom">
            <div className="container">
              <div className="daysContainer">
                <div className="day-col">
                  <div className="day-date" id="date">
                    30/03/2025
                  </div>
                  <div className="weather-icon">
                    <img id="icon" src={sunny}></img>
                  </div>
                  <div className="weather-description">
                    <span>Weather: </span>
                    <span id="description">Sunny</span>
                  </div>
                  <div className="temprature">
                    <span>Temprature: </span>
                    <span id="temp">18</span>
                    <span>°C</span>
                  </div>
                  <div className="wind-speed">
                    <span>Wind Speed: </span>
                    <span id="windSpeed">10</span>
                    <span>mph</span>
                  </div>
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
