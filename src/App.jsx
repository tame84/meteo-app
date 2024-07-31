import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import axios from "axios";
import Forecast from "./components/Forecast";

const App = () => {
    const [coords, setCoords] = useState({ lat: 48.866667, lon: 2.333333 });
    const [resultsData, setResultsData] = useState(null);
    const searchRef = useRef();

    const getPosition = (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
    };

    const showPositionError = (err) => {
        console.log(console.log("ERR: Get current position =>", err));
    };

    const handleSearch = (e) => {
        setResultsData(null);

        if (e.target.value.length < 3) {
            return;
        }

        axios
            .get(
                `http://api.openweathermap.org/geo/1.0/direct?q=${
                    e.target.value
                }&limit=5&appid=${import.meta.env.VITE_OWM_API}`
            )
            .then((res) => {
                if (res.data.length > 0) {
                    setResultsData(res.data);
                } else {
                    setResultsData(null);
                }
            })
            .catch((err) => console.log("ERR: Fetch city by user search", err));
    };

    const handleResultSubmit = (index) => {
        setCoords({ lat: resultsData[index].lat, lon: resultsData[index].lon });
        searchRef.current.value = "";
        setResultsData(null);
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                getPosition,
                showPositionError
            );
        } else {
            alert(
                "La géolocalisation n'est pas supportée par ce navigateur, une ville par défaut a été séléctionnée."
            );
        }
    }, []);

    return (
        <div>
            <Header coords={coords} />
            <form>
                <input
                    type="text"
                    placeholder="Rechercher une ville"
                    onChange={(e) => handleSearch(e)}
                    ref={searchRef}
                />
                <ul id="searchResults">
                    {resultsData !== null ? (
                        resultsData.map((city, index) => {
                            return (
                                <li
                                    key={"search-result-" + index}
                                    onClick={() => handleResultSubmit(index)}
                                >
                                    {city.name} ({city.country}{" "}
                                    {city.state && ", " + city.state})
                                </li>
                            );
                        })
                    ) : (
                        <p>Aucun résultat.</p>
                    )}
                </ul>
            </form>
            <Forecast coords={coords} />
        </div>
    );
};

export default App;
