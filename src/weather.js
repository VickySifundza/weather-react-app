
import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState(null);

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
    });
  }

  function HandleSearch(event) {
    event.preventDefault();
    let Api = `49b631c45785fe73d2a88477803dea22`;
    let Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api}&units=metric`;
    axios.get(Url).then(displayWeather);
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }
  let form = (
    <form onSubmit={HandleSearch}>
      <input
        type="search"
        placeholder="Enter a City..."
        onChange={updateCity}
      />
      <input type="submit" value="Search" />
    </form>
  );
  if (loaded) {
    return (
      <div>
        {form}
        <h1> The Weather in {city} is ...</h1>
        <ul>
          <li>Temperature:{weather.temperature}℃ </li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind} km/h</li>{" "}
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
