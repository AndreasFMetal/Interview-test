import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import clear from "./img/clear.gif";
import cloudy from "./img/part-cloudy.gif";
import fog from "./img/fog.gif";
import drizzle from "./img/drizzle.gif";
import rain from "./img/rain.gif";
import snow from "./img/snow.gif";
import storm from "./img/storm.gif";

function App() {
  const [data, setData] = useState({});
  const [dataDaily, setDataDaily] = useState([]);
  const [location, setLocation] = useState("");
  const [locationData, setLocationData] = useState({});
  const urlLocation = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`;
  // const [wmo, setWmo] = useState({})

  function wmoMapping(code) {
    //   Code	Description
    // 0	Clear sky
    // 1, 2, 3	Mainly clear, partly cloudy, and overcast
    // 45, 48	Fog and depositing rime fog
    // 51, 53, 55	Drizzle: Light, moderate, and dense intensity
    // 56, 57	Freezing Drizzle: Light and dense intensity
    // 61, 63, 65	Rain: Slight, moderate and heavy intensity
    // 66, 67	Freezing Rain: Light and heavy intensity
    // 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
    // 77	Snow grains
    // 80, 81, 82	Rain showers: Slight, moderate, and violent
    // 85, 86	Snow showers slight and heavy
    // 95 *	Thunderstorm: Slight or moderate
    // 96, 99 *	Thunderstorm with slight and heavy hail
    switch (code) {
      case 0:
        return "Clear sky";
        break;
      case 1:
      case 2:
      case 3:
        return "Cloudy";
        break;
      case 45:
      case 48:
        return "Fog";
        break;
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
        return "Drizzle";
        break;
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
      case 80:
      case 81:
      case 82:
        return "Rain";
        break;
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:
        return "Snow";
        break;
      case 95:
      case 96:
      case 99:
        return "Thunderstorm";
        break;
      default:
        return "Unknown code";
    }
  }

  function iconSelector(code) {
    switch (code) {
      case 0:
        return clear;
        break;
      case 1:
      case 2:
      case 3:
        return cloudy;
        break;
      case 45:
      case 48:
        return fog;
        break;
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
        return drizzle;
        break;
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
      case 80:
      case 81:
      case 82:
        return rain;
        break;
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:
        return snow;
        break;
      case 95:
      case 96:
      case 99:
        return storm;
        break;
      default:
        return clear;
    }
  }

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
        if(response){setData(response.data);
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
            <div> {locationData.name}</div>
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
