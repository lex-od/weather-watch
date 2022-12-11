import { AxiosResponse } from "axios";

export interface IApi {
  getCurrentWeather: (
    params: IGetCurrentWeatherParams
  ) => Promise<AxiosResponse<IGetCurrentWeatherResponse>>;
}

// 📌 getCurrentWeather
export interface IGetCurrentWeatherParams {
  id: number | string;
}
export interface IGetCurrentWeatherResponse {
  //
}
