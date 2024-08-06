import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const day = new Date().toLocaleDateString();
  // console.log(day);
  const [time, setTime] = useState(new Date());
  const [data, setdata] = useState({
    coord: {
      lon: 10.99,
      lat: 44.34,
    },
    weather: [
      {
        id: 803,
        main: "Clouds",
        description: "broken clouds",
        icon: "04d",
      },
    ],
    base: "stations",
    main: {
      temp: 26.93,
      feels_like: 29.32,
      temp_min: 26.71,
      temp_max: 30.23,
      pressure: 1007,
      humidity: 77,
      sea_level: 1007,
      grnd_level: 942,
    },
    visibility: 10000,
    wind: {
      speed: 1.91,
      deg: 149,
      gust: 2.02,
    },
    clouds: {
      all: 62,
    },
    dt: 1722614617,
    sys: {
      type: 2,
      id: 2075663,
      country: "IT",
      sunrise: 1722571475,
      sunset: 1722623993,
    },
    timezone: 7200,
    id: 3163858,
    name: "Zocca",
    cod: 200,
  });
  useEffect(() => {
    setInterval(() => setTime(new Date(), 1000));
  }, []);
  const getLocation = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const recieve = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${Put_your_api_id}&units=metric`
          );
          const data = recieve.data;
          setdata(data);
          console.log(data);
        } catch (error) {
          console.error(error.message);
        }
      });
    } else {
      console.log("Failed to get data");
      const fail = `<h1>Faiiled to get data Please try after some time!!!</h1>`;
    }
  };
  useEffect(() => {
    getLocation();
  }, []);
  const greeting = function (time) {
    const hours = Number(time);
    let greet;
    if (hours > 3 && hours < 12) {
      greet = "Good Morning 🌅";
    } else if (hours >= 12 && hours < 18) {
      greet = "Good Afternoon ";
    } else if (hours > 18 && hours < 21) {
      greet = "Good Evening 🌆";
    } else {
      greet = "Good Night 🛌";
    }
    return greet;
  };
  return (
    <>
      <div className="BIGBIGContainer">
        <div className="BigContainer">
          <div className="Title">
            <p classNmae="country">
              {data.name}, <span className="side">{data.sys.country}</span>
              <p className="side">{day}</p>
            </p>
            <p className="time">{time.toLocaleTimeString()}</p>
          </div>
          <p>{greeting(time.getHours())}</p>
          <p className="temperature">{Math.floor(data.main.temp)}°C</p>
          <p className="Kind">{data.weather[0].main}</p>
          <div className="Bottom">
            <p className="child_bottom">
              <img src="../public/feels_like.png" />
              <p>feels like</p>
              {Math.floor(data.main.feels_like)}°C
            </p>
            <p className="child_bottom">
              <img src="../public/wind_speed.png" />
              <p>wind speed</p>
              {data.wind.speed} m/s
            </p>
            <p className="child_bottom">
              <img src="../public/humidity.png" />
              <p>Humidity</p>
              {data.main.humidity}%
            </p>
            <p className="child_bottom">
              <img src="../public/visibility.png" />
              <p>visibility</p>
              {data.visibility / 1000} KM
            </p>
          </div>
        </div>
      </div>
      <div className="Parent">
        <img className="image" />
      </div>
    </>
  );
}

export default App;
