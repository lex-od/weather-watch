import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

import mockCities from "json/mockCities.json";
import weatherSelectors from "redux/weather/weatherSelectors";
import { ICityItem, ICityWithWeatherItem } from "./citiesTypes";

const getSelectedCities = (state: RootState) => state.cities.selectedCities;

const getCityByIdWithWeather = createSelector(
  [
    getSelectedCities,
    weatherSelectors.getWeatherByCities,
    (_, cityId: number) => cityId,
  ],
  (selectedCities, weatherByCities, cityId): ICityWithWeatherItem | null => {
    const city = selectedCities.find(({ id }) => id === cityId);
    if (!city) return null;

    const weather = weatherByCities.find(({ id }) => id === cityId);
    return {
      ...city,
      weather: weather || null,
    };
  }
);

const getSelectedCitiesWithWeather = createSelector(
  [getSelectedCities, weatherSelectors.getWeatherByCities],
  (selectedCities, weatherByCities): ICityWithWeatherItem[] => {
    return selectedCities.map((city) => {
      const weather = weatherByCities.find(({ id }) => id === city.id);
      return {
        ...city,
        weather: weather || null,
      };
    });
  }
);

const getSelectedCityIdsWithNoWeather = createSelector(
  [getSelectedCities, weatherSelectors.getWeatherByCities],
  (selectedCities, weatherByCities) => {
    const noWeatherCities = selectedCities.filter((city) =>
      weatherByCities.every(({ id }) => id !== city.id)
    );
    return noWeatherCities.map(({ id }) => id);
  }
);

const getRemainingAvailableCities = createSelector(
  [getSelectedCities],
  (selectedCities): ICityItem[] => {
    return mockCities.filter((city) =>
      selectedCities.every(({ id }) => id !== city.id)
    );
  }
);

const citiesSelectors = {
  getSelectedCities,
  getCityByIdWithWeather,
  getSelectedCitiesWithWeather,
  getSelectedCityIdsWithNoWeather,
  getRemainingAvailableCities,
};
export default citiesSelectors;
