import { BsSearch } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { ThreeDots } from "react-loader-spinner";
import { FaWind } from "react-icons/fa";
import { useEffect, useState } from "react";
import Chart from "./Chart";
import "./Home.css";

const apiStatusConstants = {
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
  notFound: "NOT_FOUND",
};

const apiKey = "9e3bb5a5aa11e208c2199b222d3847b7";
const initialCity = "Delhi";

const Home = ({ addRecentSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.inProgress);
  const [weatherData, setWeatherData] = useState({});
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    fetchWeatherInfo(initialCity);
  }, []);

  useEffect(() => {
    fetchWeatherInfo(searchInput ? searchInput : initialCity);
  }, [unit]);

  const fetchWeatherInfo = async (city) => {
    if (city.trim() !== "") {
      setApiStatus(apiStatusConstants.inProgress);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            setApiStatus(apiStatusConstants.notFound);
            throw new Error("City not found");
          }
          setApiStatus(apiStatusConstants.failure);
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setWeatherData(data);
        setApiStatus(apiStatusConstants.success);

        if (searchInput) {
          addRecentSearch(city);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please enter a city");
    }
  };

  const renderLoadingView = () => (
    <div className="products-loader-container">
      <ThreeDots color="white" height="50" width="50" />
    </div>
  );

  const renderUnit = () => {
    if (unit === "metric") {
      return (
        <span>
          <sup>o</sup>C
        </span>
      );
    }
    return (
      <span>
        <sup>o</sup>F
      </span>
    );
  };

  const Switch = () => {
    return (
      <div className="d-flex justify-content-end mb-3">
        <label>Units: </label>
        <input
          className="react-switch-checkbox align-self-end"
          id={`react-switch-new`}
          type="checkbox"
          onChange={() => {
            if (unit === "metric") {
              setUnit("imperial");
            } else {
              setUnit("metric");
            }
          }}
          checked={unit !== "metric"}
        />
        <label
          className="react-switch-label ml-auto"
          htmlFor={`react-switch-new`}
        >
          <span className={`react-switch-button`}>{renderUnit()}</span>
        </label>
      </div>
    );
  };

  const renderSuccessView = () => (
    <>
      <div className="view-container">
        <Switch />
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-around w-100">
          <div>
            <div className="w-100">
              <img
                alt="weather-icon"
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
              />
              <h4 className="mt-0">{weatherData.weather[0].main}</h4>
            </div>
            <h1>
              {weatherData.main.temp} {renderUnit()}
            </h1>
            <h4>{weatherData.name}</h4>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-around w-100">
          <div className="w-100">
            <WiHumidity size="55" />
            <p>{`Humidity: ${weatherData.main.humidity}%`}</p>
          </div>
          <div className="w-100">
            <FaWind size="45" />
            <p>{`Wind Speed: ${weatherData.wind.speed}km/hr`}</p>
          </div>
        </div>
        <Chart />
      </div>
    </>
  );

  const renderFailureView = () => (
    <div className="view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="failure"
        className="w-75"
      />
      <h4>Something went wrong. Please try again later</h4>
    </div>
  );

  const renderNotFoundView = () => (
    <div className="view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
        alt="notfound"
        className="w-75"
      />
      <h4>City Not Found</h4>
    </div>
  );

  const renderUI = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.notFound:
        return renderNotFoundView();
      default:
        return null;
    }
  };

  return (
    <div className="d-flex flex-column w-100 align-items-center p-3 py-5">
      <div className="w-100 d-flex flex-row justify-content-center">
        <div className="search-input-container">
          <BsSearch className="search-icon" />
          <input
            value={searchInput}
            type="search"
            className="search-input"
            placeholder="Search for a city"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <button
          className="search-btn"
          onClick={() => fetchWeatherInfo(searchInput)}
        >
          Search
        </button>
      </div>
      {renderUI()}
    </div>
  );
};

export default Home;
