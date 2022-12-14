import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import * as router from "react-router-dom";
import * as redux from "react-redux";
import weatherThunks from "redux/weather/weatherThunks";
import * as citiesActs from "redux/cities/citiesSlice";

import { ICityWithWeatherItem } from "redux/cities/citiesTypes";
import { WeatherCard } from "./WeatherCard";

jest.mock("react-redux");
jest.mock("react-router-dom");
const mockedDispatch = jest.spyOn(redux, "useDispatch");
const mockedNavigate = jest.spyOn(router, "useNavigate");

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
    mockedDispatch.mockReturnValue(jest.fn());
    mockedNavigate.mockReturnValue(jest.fn());

    render(<WeatherCard item={city} />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText("Update")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("Card renders with weather", () => {
    mockedDispatch.mockReturnValue(jest.fn());
    mockedNavigate.mockReturnValue(jest.fn());

    render(<WeatherCard item={cityWithWeather} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText(/Wind:/)).toBeInTheDocument();
    expect(screen.getByText("Update")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("Should dispatch actions", async () => {
    // Mock return values
    const dispatch = jest.fn();
    mockedDispatch.mockReturnValue(dispatch);
    const navigate = jest.fn();
    mockedNavigate.mockReturnValue(navigate);

    // Spy actions
    const mockedGetCurrentWeather = jest.spyOn(
      weatherThunks,
      "getCurrentWeather"
    );
    const mockedDeleteCity = jest.spyOn(citiesActs, "deleteCity");

    render(<WeatherCard item={cityWithWeather} />);

    // Update
    fireEvent.click(screen.getByText("Update"));
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
    expect(mockedGetCurrentWeather).toHaveBeenCalledWith({ id: 698740 });

    // Delete
    fireEvent.click(screen.getByText("Delete"));
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(mockedDeleteCity).toHaveBeenCalledWith({ cityId: 698740 });

    // Navigate to details
    fireEvent.click(screen.getByRole("heading"));
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/details/698740");
  });

  it("Card snapshot", () => {
    mockedDispatch.mockReturnValue(jest.fn());
    mockedNavigate.mockReturnValue(jest.fn());

    const { container } = render(<WeatherCard item={cityWithWeather} />);

    expect(container).toMatchSnapshot();
  });
});
