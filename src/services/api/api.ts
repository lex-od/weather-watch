import axios from "axios";

import { endpoints } from "services/endpoints";
import { IApi } from "./types";

// Properly stored in .env
axios.defaults.baseURL = "https://api.openweathermap.org";
const openWeatherKey = "eebd5a23845db2a10390b3af64e7af23";

export const api: IApi = {
  getCurrentWeather: (params) =>
    axios.get(endpoints.getCurrentWeather, {
      params: { units: "metric", appid: openWeatherKey, ...params },
    }),
};
