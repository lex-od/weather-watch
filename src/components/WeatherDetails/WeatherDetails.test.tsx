import { render, screen, waitFor } from "@testing-library/react";
import * as redux from "react-redux";
import * as router from "react-router-dom";
import weatherThunks from "redux/weather/weatherThunks";

import { WeatherDetails } from "./WeatherDetails";

const state = {
  cities: {
    selectedCities: [
      {
        id: 698740,
        name: "Odessa",
        state: "",
        country: "UA",
        coord: {
          lon: 30.732622,
          lat: 46.477474,
        },
      },
    ],
  },
  weather: {
    weatherByCities: [
      {
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
    ],
    weatherAllLoading: false,
  },
};

jest.mock("react-redux");
jest.mock("react-router-dom");
const spyUseDispatch = jest.spyOn(redux, "useDispatch");
const spyUseSelector = jest.spyOn(redux, "useSelector");
const spyUseParams = jest.spyOn(router, "useParams");

describe("WeatherDetails component", () => {
  it("WeatherDetails renders", async () => {
    spyUseDispatch.mockReturnValue(jest.fn());
    spyUseSelector.mockImplementation((cb) => cb(state));
    spyUseParams.mockReturnValue({ cityId: "698740" });

    render(<WeatherDetails />);

    expect(screen.getByText(/Country:/)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
    expect(screen.getByText(/Temp:/)).toBeInTheDocument();
    expect(screen.getByText(/Pressure:/)).toBeInTheDocument();
  });

  it("No weather data found renders", async () => {
    spyUseDispatch.mockReturnValue(jest.fn());
    spyUseSelector.mockImplementation((cb) => cb(state));
    spyUseParams.mockReturnValue({ cityId: "not-existed-id" });

    render(<WeatherDetails />);

    expect(screen.queryByText(/Country:/)).toBeNull();
    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.queryByRole(/Temp:/)).toBeNull();
    expect(screen.queryByRole(/Pressure:/)).toBeNull();
    expect(screen.getByText("No weather data found")).toBeInTheDocument();
  });

  it("Should dispatch actions", async () => {
    // Mock return values
    const mockDispatch = jest.fn();
    spyUseDispatch.mockReturnValue(mockDispatch);
    spyUseSelector.mockImplementation((cb) => cb(state));
    spyUseParams.mockReturnValue({ cityId: "698740" });

    // Spy actions
    const spyGetCurrentWeather = jest.spyOn(weatherThunks, "getCurrentWeather");

    render(<WeatherDetails />);

    // Get weather
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
    expect(spyGetCurrentWeather).toHaveBeenCalledWith({ id: 698740 });
  });
});
