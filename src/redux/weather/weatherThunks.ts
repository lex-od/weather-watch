import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { api } from "services";
import {
  IGetCurrentWeatherParams,
  IGetCurrentWeatherResponse,
} from "services/api/types";
import citiesSelectors from "redux/cities/citiesSelectors";

const getCurrentWeather = createAsyncThunk(
  "weather/getCurrentWeather",
  async (payload: IGetCurrentWeatherParams) => {
    const { data } = await api.getCurrentWeather(payload);
    return data;
  }
);

const getCurrentWeatherBySelectedCities = createAsyncThunk(
  "weather/getCurrentWeatherBySelectedCities",
  async (_, { getState }) => {
    const noWeatherIds: number[] =
      citiesSelectors.getSelectedCityIdsWithNoWeather(getState());

    const allResults = await Promise.allSettled(
      noWeatherIds.map((id) => api.getCurrentWeather({ id }))
    );

    const successResults = allResults.filter(
      ({ status }) => status === "fulfilled"
    ) as TWeatherSuccessResults;

    return successResults.map(({ value }) => value.data);

    // Helper type
    type TWeatherSuccessResults = PromiseFulfilledResult<
      AxiosResponse<IGetCurrentWeatherResponse, any>
    >[];
  }
);

const weatherThunks = {
  getCurrentWeather,
  getCurrentWeatherBySelectedCities,
};
export default weatherThunks;
