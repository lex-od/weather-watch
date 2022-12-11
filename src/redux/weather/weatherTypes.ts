import { IGetCurrentWeatherResponse } from "services/api/types";

export interface IWeatherState {
  weatherByCities: IGetCurrentWeatherResponse[];
  weatherAllLoading: boolean;
}
