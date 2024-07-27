import React, { useEffect } from "react";

const WeatherCard = ({ weatherData }) => {
    useEffect(() => {
        const data = {
            city: {
                name: weatherData.name,
            },
            temp: {
                current: +"°C",
                max: +"°C",
                min: +"°C",
                feels_like: +"°C",
            },
            weather: {
                humidity: weatherData.main.humidity + "%",
                cloudiness: +"%",
            },
            wind: {
                speed: +" m/s",
            },
        };

        console.log(data);
    }, []);

    return (
        <div className="card">
            <h2>{weatherData.name}</h2>
            <p className="current-temp">{weatherData.main.temp.toFixed(1)}°C</p>
            <p>
                {weatherData.weather[0].description[0].toUpperCase() +
                    weatherData.weather[0].description.slice(1)}{" "}
                {weatherData.main.temp_max.toFixed(1)}°C/
                {weatherData.main.temp_min.toFixed(1)}°C
            </p>
            <ul className="details">
                <li>
                    Humidité <span>{weatherData.main.humidity}%</span>
                </li>
                <li>
                    Ressentie{" "}
                    <span>{weatherData.main.feels_like.toFixed(1)}°C</span>
                </li>
                <li>
                    Couverture nuageuse <span>{weatherData.clouds.all}%</span>
                </li>
                <li>
                    Vitesse du vent{" "}
                    <span>{weatherData.wind.speed.toFixed(1)} m/s</span>
                </li>
            </ul>
        </div>
    );
};

export default WeatherCard;
