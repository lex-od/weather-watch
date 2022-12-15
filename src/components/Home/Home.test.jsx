import { render, screen, fireEvent } from "@testing-library/react";
import * as redux from "react-redux";
import * as router from "react-router-dom";
import weatherThunks from "redux/weather/weatherThunks";
import * as citiesActs from "redux/cities/citiesSlice";

import { Home } from "./Home";

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

const stateWeatherLoading = {
  ...state,
  weather: {
    weatherByCities: [],
    weatherAllLoading: true,
  },
};

const cherkasyCity = {
  id: 710791,
  name: "Cherkasy",
  state: "",
  country: "UA",
  coord: {
    lon: 32.062069,
    lat: 49.428539,
  },
};

jest.mock("react-redux");
jest.mock("react-router-dom");
const spyUseDispatch = jest.spyOn(redux, "useDispatch");
const spyUseSelector = jest.spyOn(redux, "useSelector");
const spyNavigate = jest.spyOn(router, "useNavigate");

describe("Home component", () => {
  it("Home renders", () => {
    spyUseDispatch.mockReturnValue(jest.fn());
    spyUseSelector.mockImplementation((cb) => cb(state));
    spyNavigate.mockReturnValue(jest.fn());

    render(<Home />);

    expect(screen.getByText("Weather watch")).toBeInTheDocument();
    expect(screen.getByText("Add city")).toBeInTheDocument();
  });

  it("Home with card renders", () => {
    spyUseDispatch.mockReturnValue(jest.fn());
    spyUseSelector.mockImplementation((cb) => cb(state));
    spyNavigate.mockReturnValue(jest.fn());

    render(<Home />);

    expect(screen.getByText("Weather watch")).toBeInTheDocument();
    expect(screen.getByText("Add city")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText(/Wind:/)).toBeInTheDocument();
    expect(screen.getByText("Update")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("Loading renders", () => {
    spyUseDispatch.mockReturnValue(jest.fn());
    spyUseSelector.mockImplementation((cb) => cb(stateWeatherLoading));
    spyNavigate.mockReturnValue(jest.fn());

    render(<Home />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("Should dispatch actions", () => {
    // Mock return values
    const mockDispatch = jest.fn();
    spyUseDispatch.mockReturnValue(mockDispatch);
    spyUseSelector.mockImplementation((cb) => cb(state));
    spyNavigate.mockReturnValue(jest.fn());

    // Spy actions
    const spyGetCurrentWeatherBySelectedCities = jest.spyOn(
      weatherThunks,
      "getCurrentWeatherBySelectedCities"
    );
    const spyAddNewCity = jest.spyOn(citiesActs, "addNewCity");

    render(<Home />);

    // Get weather by selected cities
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(spyGetCurrentWeatherBySelectedCities).toHaveBeenCalledTimes(1);

    // Add new city
    fireEvent.click(screen.getByText("Add city"));
    fireEvent.click(screen.getByText("Cherkasy"));
    fireEvent.click(screen.getByText("Add"));
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(spyAddNewCity).toHaveBeenCalledWith({ newCity: cherkasyCity });
  });
});
