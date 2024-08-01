import React from "react";

const WeatherCard = ({ weather }) => {
    return (
        <div className="weather-card">
            <div className="card-content">
                <h2>{weather.city.name}</h2>
                <p id="currentTemp">{weather.temp.current}</p>
                <p className="min-max">
                    {weather.main.description} {weather.temp.max} /{" "}
                    {weather.temp.min}
                </p>
                <ul className="details">
                    <li>
                        <p>Humidité</p>
                        <span>{weather.main.humidity}</span>
                    </li>
                    <li>
                        <p>Ressenti</p>
                        <span>{weather.temp.feels_like}</span>
                    </li>
                    <li>
                        <p>Couverture nuageuse</p>
                        <span>{weather.main.cloudiness}</span>
                    </li>
                    <li>
                        <p>Vitesse du vent</p>
                        <span>{weather.wind.speed}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default WeatherCard;
