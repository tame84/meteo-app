import React from "react";

const DayOverview = ({ day }) => {
    return (
        <div className="day-overview">
            <div>
                <img
                    src={day.weather.icon_id}
                    alt={day.weather.icon_id + " icon"}
                />
                <h3>{day.date}</h3>
            </div>

            <h4>
                {day.weather.name} {day.weather.max_temp}/{day.weather.min_temp}
            </h4>
        </div>
    );
};

export default DayOverview;
