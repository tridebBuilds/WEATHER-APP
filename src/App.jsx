import "./App.css";
import axios from "axios";
import { useState } from "react";
function App() {
  const [result, setResults] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const handleChange = (event) => {
    setCity(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setResults(null);
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=fc78ffd15b434ce4967183014252211&q=${city}&aqi=no`
      );
      setResults(response.data);
    } catch (err) {
      if (city == "") {
        setError("please enter the city name");
      } else {
        setError("error:city not found!");
      }
    }
  };
  return (
    <>
      <div className="body">
        <div className=" bg-[url('/bg.jpg')] w-full h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center">
          <div className="weather-search-container">
            <h1 className="heading-main font-bold text-white mb-1.5">
              WEATHER APP
            </h1>
            <form id="weatherForm" onSubmit={handleSubmit}>
              <input
                className="w-full mb-2.5 p-2.5 border border-black rounded-[5px]"
                type="text"
                id="cityInput"
                value={city}
                onChange={handleChange}
                placeholder="Enter city name"
              />
              <button
                type="submit"
                className="bg-blue-500 w-30 h-10 rounded-xl cursor-pointer px-2.5 text-lg text-white hover:bg-blue-700"
              >
                Search
              </button>
            </form>
            <div id="error" className="error text-red-600"></div>
            <div id="weatherResult" className="weather-result"></div>
            <div className="massages text-amber-100 pt-3 text-2xl ">
              {error && <p className="error"> {error}</p>}

              {result && (
                <div className="weather-result text-white ">
                  <h2>{result.location.name}</h2>
                  <h2>{result.location.region}</h2>
                  <p>Temperature:{result.current.temp_c}°C</p>
                  <p>Weather: {result.current.condition.text}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
