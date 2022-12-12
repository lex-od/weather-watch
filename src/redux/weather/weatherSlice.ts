import { createSlice } from "@reduxjs/toolkit";
import { IWeatherState } from "./weatherTypes";
import weatherThunks from "./weatherThunks";
import { IGetCurrentWeatherResponse } from "services/api/types";

const initialState: IWeatherState = {
  weatherByCities: [],
  weatherAllLoading: false,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      weatherThunks.getCurrentWeather.fulfilled,
      (state, { payload }) => updateWeatherItem(state, payload)
    );

    builder.addCase(
      weatherThunks.getCurrentWeatherBySelectedCities.pending,
      (state) => {
        state.weatherAllLoading = true;
      }
    );
    builder.addCase(
      weatherThunks.getCurrentWeatherBySelectedCities.fulfilled,
      (state, { payload }) => {
        payload.forEach((weatherItem) => updateWeatherItem(state, weatherItem));
        state.weatherAllLoading = false;
      }
    );
    builder.addCase(
      weatherThunks.getCurrentWeatherBySelectedCities.rejected,
      (state) => {
        state.weatherAllLoading = false;
      }
    );
  },
});

// Helpers

const updateWeatherItem = (
  state: IWeatherState,
  item: IGetCurrentWeatherResponse
) => {
  state.weatherByCities = state.weatherByCities.filter(
    ({ id }) => id !== item.id
  );
  state.weatherByCities.push(item);
};

export default weatherSlice.reducer;
