import axios from "axios";
import React, { useEffect, useState } from "react";
import DayOverview from "./DayOverview";
import DayForecast from "./DayForecast";

const Forecast = ({ coords }) => {
    const [daysData, setDaysData] = useState(null);
    const [dayForecast, setDayForecast] = useState(
        daysData !== null ? daysData[0] : null
    );

    const getDaysData = (data) => {
        let lastDay = "";
        const days = [];

        for (let i = 0; i < data.length; i++) {
            const date = data[i].dt_txt.split(" ");
            const day = date[0].split("-")[2];

            if (day !== lastDay) {
                const dayData = {
                    date: new Date(date[0]).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                    }),
                    weather: {
                        name: data[i].weather[0].main,
                        icon_id: `https://openweathermap.org/img/wn/${data[
                            i
                        ].weather[0].icon.replace("n", "d")}@2x.png`,
                        min_temp: `${data[i].main.temp_min}°`,
                        max_temp: `${data[i].main.temp_max}°`,
                    },
                    global_infos: {
                        humidity: `${data[i].main.humidity}%`,
                        wind_speed: `${data[i].wind.speed}m/s`,
                        cloudiness: `${data[i].clouds.all}%`,
                        precipitation: `${data[i].pop}%`,
                    },
                };

                lastDay = day;
                days.push(dayData);
            }
        }

        setDayForecast(days[0]);
        setDaysData(days.slice(0, 5));
    };

    useEffect(() => {
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${
                    coords.lat
                }&lon=${coords.lon}&units=metric&lang=fr&appid=${
                    import.meta.env.VITE_OWM_API
                }`
            )
            .then((res) => {
                getDaysData(res.data.list);
            })
            .catch((err) => {
                console.log("ERR: Fetch forecast =>", err);
            });
    }, [coords]);

    return (
        <div className="forecast">
            <h2>Prévisions sur 5 jours</h2>
            <div className="content">
                {daysData !== null ? <DayForecast day={dayForecast} /> : null}
                <div className="days-overview">
                    {daysData !== null
                        ? daysData.map((day) => (
                              <div
                                  className="day"
                                  key={day.date}
                                  onClick={() => setDayForecast(day)}
                              >
                                  <DayOverview day={day} />
                              </div>
                          ))
                        : null}
                </div>
            </div>
        </div>
    );
};

export default Forecast;
