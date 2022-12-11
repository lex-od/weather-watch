import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "services";
import { IGetCurrentWeatherParams } from "services/api/types";

const getCurrentWeather = createAsyncThunk(
  "weather/getCurrentWeather",
  async (payload: IGetCurrentWeatherParams) => {
    const { data } = await api.getCurrentWeather(payload);
    return data;
  }
);

const weatherThunks = {
  getCurrentWeather,
};
export default weatherThunks;
