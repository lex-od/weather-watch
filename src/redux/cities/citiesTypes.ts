import { IGetCurrentWeatherResponse } from "services/api/types";

export interface ICitiesState {
  selectedCities: ICityItem[];
}

export interface ICityItem {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
}

// City with weather

export interface ICityWithWeatherItem extends ICityItem {
  weather: IGetCurrentWeatherResponse | null;
}

// Add new city

export interface IAddCityPayload {
  newCity: ICityItem;
}

// Delete city

export interface IDeleteCityPayload {
  cityId: number;
}
