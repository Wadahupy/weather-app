import { useRef, useState } from "react";

import sunny from "./assets/sunny.png";
import cloudy from "./assets/cloudy.png";
import rainy from "./assets/rainy.png";
import snowy from "./assets/snowy.png";
import sorry from "./assets/weather.svg";

const api = {
  key: import.meta.env.REACT_APP_API_KEY,
  base: import.meta.env.REACT_APP_API_BASE_URL,
};
function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [isFirstSearch, setIsFirstSearch] = useState(true);
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchPressed();
    }
  };

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        console.log(result);
        setFirstSearch(false);
      });
  };

  const weatherImage = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Drizzle: rainy,
    Thunderstorm: rainy,
    Mist: cloudy,
    Haze: cloudy,
  };

  const weatherIcon =
    weather.weather && weather.weather[0]
      ? weatherImage[weather.weather[0].main]
      : null;

  const getCurrentDate = () => {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return now.toLocaleDateString("en-US", options);
  };

  const clearSearch = () => {
    setSearch("");
    inputRef.current.value = "";
    setIsFirstSearch(false);
  };

  const getGradient = (weather) => {
    if (!weather || !weather.weather || !weather.weather[0])
      return "bg-primary"; // default background

    switch (weather.weather[0].main.toLowerCase()) {
      case "clear":
        return "bg-gradient-to-r from-cyan-600 to-sky-600";
      case "clouds":
        return "bg-gradient-to-r from-gray-400 to-gray-600";
      case "rain":
        return "bg-gradient-to-r from-blue-700 to-gray-400";
      case "snow":
        return "bg-gradient-to-r from-white to-gray-300";
      case "thunderstorm":
        return "bg-gradient-to-r from-gray-700 to-gray-900";
      default:
        return "bg-primary"; // default background
    }
  };

  return (
    <div className={`min-h-screen ${getGradient(weather)}`}>
      <div className="absolute -z-10 min-h-screen w-screen brightness-100"></div>
      <div
        className={`flex justify-center place-items-center flex-col ${
          isFirstSearch ? "min-h-screen" : ""
        }`} // Center the search bar if it's the first search
      >
        {/* Search */}
        <div
          className={`flex flex-row m-4 h-16 w-10/12 md:w-8/12 lg:w-7/12 xl:w-6/12 2xl:w-5/12 place-items-center p-5 rounded-3xl shadow-2xl bg-transparent border-4 backdrop-blur-3xl backdrop-opacity-5 backdrop-brightness-50 ${
            isFirstSearch ? "mt-0" : "mt-10"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="3em"
            height="3em"
            viewBox="0 0 24 24"
          >
            <path
              fill="#ffffff"
              d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
            />
          </svg>
          <input
            type="text"
            className="bg-transparent w-full h-12 rounded-none focus:outline-none px-2 text-white text-lg"
            placeholder="Enter city name"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          <button onClick={clearSearch} className="text-white text-xl">
            x
          </button>
        </div>

        {typeof weather.main != "undefined" ? (
          <div className="h-full w-10/12 md:w-8/12 lg:w-7/12 xl:w-6/12 2xl:w-5/12 rounded-3xl backdrop-blur-3xl border-4 shadow-2xl bg-opacity-70 flex flex-col place-items-center backdrop-opacity-5 backdrop-brightness-50">
            <div className="flex flex-row mt-10 gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3em"
                height="3em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffffff"
                  d="M12 3a7 7 0 0 0-7 7c0 2.862 1.782 5.623 3.738 7.762A26 26 0 0 0 12 20.758q.262-.201.615-.49a26 26 0 0 0 2.647-2.504C17.218 15.623 19 12.863 19 10a7 7 0 0 0-7-7m0 20.214l-.567-.39l-.003-.002l-.006-.005l-.02-.014l-.075-.053l-.27-.197a28 28 0 0 1-3.797-3.44C5.218 16.875 3 13.636 3 9.999a9 9 0 0 1 18 0c0 3.637-2.218 6.877-4.262 9.112a28 28 0 0 1-3.796 3.44a17 17 0 0 1-.345.251l-.021.014l-.006.005l-.002.001zM12 8a2 2 0 1 0 0 4a2 2 0 0 0 0-4m-4 2a4 4 0 1 1 8 0a4 4 0 0 1-8 0"
                />
              </svg>

              {/* Location */}
              <p className="text-white text-5xl font-bold ">{weather.name},</p>
              <p className="text-white text-5xl"> {weather.sys.country}</p>
            </div>
            {/* time and date */}
            <p className="text-white text-xl my-5">{getCurrentDate()}</p>
            <div className="flex flex-col md:flex-col lg:flex-col xl:flex-row text-center">
              {/* Icon */}
              {weatherIcon && (
                <img
                  src={weatherIcon}
                  alt={weather.weather[0].description}
                  className="w-80 h-80"
                />
              )}
              <div className="flex flex-col my-auto">
                {/* Temperature */}
                {weather.main && (
                  <p className="text-white text-6xl font-bold">
                    {Math.trunc(weather.main.temp)}°C
                  </p>
                )}
                {/* Condition */}
                {weather.weather && (
                  <p className="text-white text-3xl font-semibold my-5">
                    {weather.weather[0].main}
                  </p>
                )}
                {weather.weather && (
                  <p className="text-white text-xl">
                    ({weather.weather[0].description})
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-row gap-0 sm:2 md:gap-3 lg:gap-3 xl:gap-5 2xl:gap-24 my-10">
              <div className="flex flex-col gap-3">
                <div className=" h-20 w-52 flex flex-col rounded-2xl text-center place-content-center">
                  {/* Wind Speed */}
                  {weather.wind && (
                    <div className="flex flex-row items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="4em"
                        height="4em"
                        viewBox="0 0 256 256"
                      >
                        <path
                          fill="#ffffff"
                          d="M184 184a32 32 0 0 1-32 32c-13.7 0-26.95-8.93-31.5-21.22a8 8 0 0 1 15-5.56C137.74 195.27 145 200 152 200a16 16 0 0 0 0-32H40a8 8 0 0 1 0-16h112a32 32 0 0 1 32 32m-64-80a32 32 0 0 0 0-64c-13.7 0-26.95 8.93-31.5 21.22a8 8 0 0 0 15 5.56C105.74 60.73 113 56 120 56a16 16 0 0 1 0 32H24a8 8 0 0 0 0 16Zm88-32c-13.7 0-26.95 8.93-31.5 21.22a8 8 0 0 0 15 5.56C193.74 92.73 201 88 208 88a16 16 0 0 1 0 32H32a8 8 0 0 0 0 16h176a32 32 0 0 0 0-64"
                        />
                      </svg>
                      <div className="flex flex-col justify-start place-items-start ml-2">
                        <p className="text-white text-lg">
                          {weather.wind.speed} m/s
                        </p>
                        <h3 className="text-white text-lg">Wind Speed</h3>
                      </div>
                    </div>
                  )}
                </div>

                <div className="h-20 w-52 flex flex-col rounded-2xl text-center place-content-center">
                  {/* Cloud Coverage */}
                  {weather.clouds && (
                    <div className="flex flex-row items-center justify-center gap-1 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="4em"
                        height="4em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#ffffff"
                          fillOpacity="0"
                          d="M9 7L12 5L15 7L21 15L18 19H6L3 15L9 7Z"
                        >
                          <animate
                            fill="freeze"
                            attributeName="fillOpacity"
                            begin="0.8s"
                            dur="0.5s"
                            values="0;1"
                          />
                        </path>
                        <g
                          fill="none"
                          stroke="#ffffff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <path
                            strokeDasharray="20"
                            strokeDashoffset="20"
                            d="M12 19C12 19 9.5 19 7 19C4.5 19 3 17 3 15C3 13 4.5 11 7 11C8 11 8.5 11.5 8.5 11.5M12 19H17C19.5 19 21 17 21 15C21 13 19.5 11 17 11C16 11 15.5 11.5 15.5 11.5"
                          >
                            <animate
                              fill="freeze"
                              attributeName="stroke-dashoffset"
                              dur="0.4s"
                              values="20;0"
                            />
                          </path>
                          <path
                            strokeDasharray="9"
                            strokeDashoffset="9"
                            d="M17 11C17 11 17 10.5 17 10C17 7.5 15 5 12 5M7 11V10C7 7.5 9 5 12 5"
                          >
                            <animate
                              fill="freeze"
                              attributeName="stroke-dashoffset"
                              begin="0.5s"
                              dur="0.3s"
                              values="9;0"
                            />
                          </path>
                        </g>
                      </svg>
                      <div className="flex flex-col justify-start place-items-start">
                        <p className="text-white text-xl">
                          {weather.clouds.all}%
                        </p>
                        <h3 className="text-white text-lg">Cloud Coverage</h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-row">
                  <div className="h-20 w-52 flex flex-col rounded-2xl text-center place-content-center">
                    {/* Visibility */}
                    {weather.visibility && (
                      <div className="flex flex-row items-center justify-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="4em"
                          height="4em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#ffffff"
                            d="M20.454 21.87L17.612 19H6.5q-1.896 0-3.198-1.302T2 14.5q0-1.829 1.226-3.098t2.87-1.368q.018-.373.208-.925q.19-.553.438-.951l-3.88-3.881l.707-.708l17.593 17.593zm.454-3.812L8.78 5.937q.875-.523 1.612-.73T12 5q2.502 0 4.251 1.749T18 11v1h.616q1.436.046 2.41 1.055T22 15.5q0 .687-.25 1.332t-.842 1.226"
                          />
                        </svg>
                        <div className="flex flex-col justify-start place-items-start">
                          <p className="text-white text-xl">
                            {weather.visibility / 1000} km
                          </p>
                          <h3 className="text-white text-lg">Visibility</h3>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="h-20 w-52 flex flex-col rounded-2xl text-center place-content-center">
                  {/* Humidity */}
                  {weather.main && (
                    <div className="flex flex-row items-center justify-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="4em"
                        height="4em"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="#ffffff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          color="#ffffff"
                        >
                          <path d="M3.5 13.678c0-4.184 3.58-8.319 6.094-10.706a3.463 3.463 0 0 1 4.812 0C16.919 5.36 20.5 9.494 20.5 13.678C20.5 17.78 17.281 22 12 22s-8.5-4.22-8.5-8.322" />
                          <path d="M4 12.284c1.465-.454 4.392-.6 7.984 1.418c3.586 2.014 6.532 1.296 8.016.433" />
                        </g>
                      </svg>
                      <div className="flex flex-col justify-start place-items-start">
                        <p className="text-white text-xl">
                          {weather.main.humidity}%
                        </p>
                        <h3 className="text-white text-lg">Humidity</h3>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-row text-center place-content-center"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          !isFirstSearch && (
            <div className="h-full w-10/12 md:w-8/12 lg:w-7/12 xl:w-6/12 2xl:w-5/12 rounded-3xl backdrop-blur-3xl border-4 shadow-2xl bg-opacity-70 flex flex-col place-items-center backdrop-opacity-5 backdrop-brightness-50 text-center py-10 text-2xl text-white">
              <img src={sorry} alt="unavailable" className="h-96" />
              No Search Found
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
