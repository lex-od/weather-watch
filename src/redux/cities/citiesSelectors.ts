import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import weatherSelectors from "redux/weather/weatherSelectors";
import { IGetCurrentWeatherResponse } from "services/api/types";
import { ICityItem, ICityWithWeatherItem } from "./citiesTypes";

const getSelectedCities = (state: RootState) => state.cities.selectedCities;

const getCityByIdWithWeather = createSelector(
  [
    getSelectedCities,
    weatherSelectors.getWeatherByCities,
    (_, cityId: number) => cityId,
  ],
  (
    selectedCities: ICityItem[],
    weatherByCities: IGetCurrentWeatherResponse[],
    cityId
  ): ICityWithWeatherItem | null => {
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
  (
    selectedCities: ICityItem[],
    weatherByCities: IGetCurrentWeatherResponse[]
  ): ICityWithWeatherItem[] => {
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
  (
    selectedCities: ICityItem[],
    weatherByCities: IGetCurrentWeatherResponse[]
  ): number[] => {
    const noWeatherCities = selectedCities.filter((city) => {
      return weatherByCities.every(({ id }) => id !== city.id);
    });
    return noWeatherCities.map(({ id }) => id);
  }
);

const citiesSelectors = {
  getSelectedCities,
  getCityByIdWithWeather,
  getSelectedCitiesWithWeather,
  getSelectedCityIdsWithNoWeather,
};
export default citiesSelectors;
