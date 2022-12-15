import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "services";
import { IGetCurrentWeatherParams } from "services/api/types";
import { showError } from "utils";
import citiesSelectors from "redux/cities/citiesSelectors";
import { RootState } from "redux/store";

const getCurrentWeather = createAsyncThunk(
  "weather/getCurrentWeather",
  async (payload: IGetCurrentWeatherParams) => {
    try {
      const { data } = await api.getCurrentWeather(payload);
      return data;
    } catch (error) {
      showError(error);
      throw error;
    }
  }
);

const getCurrentWeatherBySelectedCities = createAsyncThunk(
  "weather/getCurrentWeatherBySelectedCities",
  async (_, { getState }) => {
    const noWeatherIds = citiesSelectors.getSelectedCityIdsWithNoWeather(
      getState() as RootState
    );

    try {
      const results = await Promise.all(
        noWeatherIds.map((id) => api.getCurrentWeather({ id }))
      );
      return results.map(({ data }) => data);
    } catch (error) {
      showError(error);
      throw error;
    }
  }
);

const weatherThunks = {
  getCurrentWeather,
  getCurrentWeatherBySelectedCities,
};
export default weatherThunks;
