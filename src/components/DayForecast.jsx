import React from "react";

const DayForecast = ({ day }) => {
    if (day) {
        return (
            <div className="day-forecast">
                <div className="header">
                    <div>
                        <img
                            src={day.weather.icon_id}
                            alt={day.weather.icon_id + " icon"}
                        />
                        <h3>{day.date}</h3>
                    </div>
                    <h4>
                        {day.weather.name} {day.weather.max_temp}/
                        {day.weather.min_temp}
                    </h4>
                </div>
                <div className="content">
                    <p>
                        Humidité <span>{day.global_infos.humidity}</span>
                    </p>
                    <p>
                        Vitesse du vent{" "}
                        <span>{day.global_infos.wind_speed}</span>
                    </p>
                    <p>
                        Couverture nuageuse{" "}
                        <span>{day.global_infos.cloudiness}</span>
                    </p>
                    <p>
                        Risque de pluie{" "}
                        <span>{day.global_infos.precipitation}</span>
                    </p>
                </div>
            </div>
        );
    }
};

export default DayForecast;
