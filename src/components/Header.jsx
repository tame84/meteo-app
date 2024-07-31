import Particles, { initParticlesEngine } from "@tsparticles/react";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { loadFull } from "tsparticles";
import WeatherCard from "./WeatherCard";

const Header = ({ coords }) => {
    const [init, setInit] = useState(false);
    const [particlesOptions, setParticlesOptions] = useState({
        particles: {},
        background: "#fff",
    });
    const [weatherData, setWeatherData] = useState(null);
    const [weatherCondition, setWeatherCondition] = useState();

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

    const getParticlesById = (id) => {
        const firstNum = parseInt(id.toString()[0], 10);

        if (firstNum === 2 || firstNum === 3 || firstNum === 5) {
            setWeatherCondition("rain");
        } else if (firstNum === 6) {
            setWeatherCondition("snow");
        } else if (firstNum === 8) {
            setWeatherCondition("sun");
        } else {
            setWeatherCondition("sun");
        }
    };

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
                const data = {
                    city: {
                        name: res.data.name,
                    },
                    temp: {
                        current: res.data.main.temp.toFixed(1) + "°C",
                        max: res.data.main.temp_max.toFixed(1) + "°C",
                        min: res.data.main.temp_min.toFixed(1) + "°C",
                        feels_like: res.data.main.feels_like.toFixed(1) + "°C",
                    },
                    main: {
                        humidity: res.data.main.humidity + "%",
                        cloudiness: res.data.clouds.all + "%",
                        description:
                            res.data.weather[0].description[0].toUpperCase() +
                            res.data.weather[0].description.slice(1),
                    },
                    wind: {
                        speed: res.data.wind.speed + "m/s",
                    },
                };
                setWeatherData(data);

                const weatherId = res.data.weather[0].id;

                getParticlesById(weatherId);

                const options =
                    particlesType[`${weatherCondition}ParticlesOptions`];
                setParticlesOptions(options);

                initParticlesEngine(async (engine) => {
                    await loadFull(engine);
                })
                    .then(() => setInit(true))
                    .catch((err) => {
                        console.log("ERR: Fetch current weather data =>", err);
                    });
            });
    }, [coords, weatherCondition]);

    if (init) {
        return (
            <header
                id="header"
                style={{
                    backgroundColor:
                        particlesOptions && particlesOptions.background,
                }}
            >
                {weatherData !== null ? (
                    <WeatherCard weather={weatherData} />
                ) : (
                    <p>Chargement des données</p>
                )}
                <Particles
                    id="tsparticles"
                    options={particlesOptions && particlesOptions.particles}
                />
            </header>
        );
    }
};

export default Header;
