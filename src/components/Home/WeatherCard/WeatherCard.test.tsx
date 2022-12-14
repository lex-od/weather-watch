import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "redux/store";
import { ICityWithWeatherItem } from "redux/cities/citiesTypes";
import { WeatherCard } from "./WeatherCard";

const city: ICityWithWeatherItem = {
  id: 698740,
  name: "Odessa",
  state: "",
  country: "UA",
  coord: {
    lon: 30.732622,
    lat: 46.477474,
  },
  weather: null,
};

const cityWithWeather: ICityWithWeatherItem = {
  id: 698740,
  name: "Odessa",
  state: "",
  country: "UA",
  coord: {
    lon: 30.732622,
    lat: 46.477474,
  },
  weather: {
    coord: {
      lon: 30.7326,
      lat: 46.4775,
    },
    weather: [
      {
        id: 801,
        main: "Clouds",
        description: "few clouds",
        icon: "02d",
      },
    ],
    base: "stations",
    main: {
      temp: 1.88,
      feels_like: -1.45,
      temp_min: 1.88,
      temp_max: 1.88,
      pressure: 1021,
      humidity: 63,
      sea_level: 1021,
      grnd_level: 1014,
    },
    visibility: 10000,
    wind: {
      speed: 3.26,
      deg: 113,
      gust: 3.54,
    },
    clouds: {
      all: 11,
    },
    dt: 1671013015,
    sys: {
      country: "UA",
      sunrise: 1670995990,
      sunset: 1671027013,
    },
    timezone: 7200,
    id: 698740,
    name: "Odesa",
    cod: 200,
  },
};

describe("WeatherCard component", () => {
  it("Card renders", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <WeatherCard item={city} />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText("Update")).toBeInTheDocument();
  });

  it("Card renders with weather", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <WeatherCard item={cityWithWeather} />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText(/Wind/)).toBeInTheDocument();
  });

  it("Card snapshot", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <WeatherCard item={cityWithWeather} />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
