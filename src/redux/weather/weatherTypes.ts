import { IGetCurrentWeatherResponse } from "services/api/types";

export interface IWeatherState {
  list: IGetCurrentWeatherResponse[];
}
