import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import axios from "axios";
import WeatherCard from "./WeatherCard";

const Header = () => {
    const [init, setInit] = useState(false);
    const [weatherCondition, setWeatherCondition] = useState();
    const [weatherData, setWeatherData] = useState(null);
    const [coords, setCoords] = useState({ lat: 50.6720144, lon: 4.6158388 });
    const [options, setOptions] = useState({
        particles: {},
        background: "#fff",
    });

    // Particles options
    const particlesType = {
        rainParticlesOptions: {
            particles: useMemo(
                () => ({
                    fullScreen: false,
                    fpsLimit: 60,
                    particles: {
                        color: {
                            value: "#0d47a1",
                        },
                        move: {
                            direction: "bottom",
                            angle: {
                                value: 20,
                            },
                            enable: true,
                            outModes: {
                                default: "out",
                            },
                            random: false,
                            speed: 24,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                            },
                            value: 100,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 3 },
                        },
                    },
                }),
                []
            ),
            background: "#1d1d1d",
        },
        snowParticlesOptions: {
            particles: useMemo(
                () => ({
                    fullScreen: false,
                    fpsLimit: 60,
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        move: {
                            direction: "bottom",
                            angle: {
                                value: 20,
                            },
                            enable: true,
                            outModes: {
                                default: "out",
                            },
                            random: false,
                            speed: 24,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                            },
                            value: 100,
                        },
                        opacity: {
                            value: 1,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 5 },
                        },
                    },
                }),
                []
            ),
            background: "#DCE4F0",
        },
        sunParticlesOptions: {
            particles: useMemo(
                () => ({
                    fullScreen: false,
                    fpsLimit: 60,
                    particles: {
                        color: {
                            value: "#FFD700",
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "out",
                            },
                            random: true,
                            speed: 0.5,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                            },
                            value: 100,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 3 },
                        },
                    },
                }),
                []
            ),
            background: "#36B7FF",
        },
    };

    // Get user position
    useEffect(() => {
        const getPosition = (pos) => {
            setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        };

        const showPositionError = (err) => {
            console.log("ERR: Getting current position =>", err);
        };

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

    // Request current weather data and load particles
    useEffect(() => {
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${
                    coords.lat
                }&lon=${coords.lon}&units=metric&lang=fr&appid=${
                    import.meta.env.VITE_OWM_API
                }`
            )
            .then((res) => {
                setWeatherData(res.data);

                const weatherConditionId = res.data.weather[0].id;
                const firstNum = parseInt(weatherConditionId.toString()[0], 10);

                if (firstNum === 2 || firstNum === 3 || firstNum === 5) {
                    setWeatherCondition("rain");
                } else if (firstNum === 6) {
                    setWeatherCondition("snow");
                } else if (firstNum === 8) {
                    setWeatherCondition("sun");
                } else {
                    setWeatherCondition("sun");
                }

                const newOptions =
                    particlesType[`${weatherCondition}ParticlesOptions`] ||
                    particlesType.sunParticlesOptions;
                setOptions(newOptions);

                // Loading particles
                initParticlesEngine(async (engine) => {
                    await loadFull(engine);
                }).then(() => {
                    setInit(true);
                });
            })
            .catch((err) => {
                console.log("ERR: Fetching current weather data =>", err);
            });
    }, [coords, weatherCondition]);

    const particlesLoaded = (container) => {
        console.log("Particles are now loaded =>", container);
    };

    // Return HTML
    if (init) {
        return (
            <header style={{ backgroundColor: options.background }}>
                {weatherData !== null ? (
                    <WeatherCard weatherData={weatherData} />
                ) : (
                    <p>Chargement des données...</p>
                )}
                <Particles
                    id="tsparticles"
                    // particlesLoaded={particlesLoaded}
                    options={options.particles}
                />
            </header>
        );
    }

    return <></>;
};

export default Header;
