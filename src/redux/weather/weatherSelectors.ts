import { RootState } from "redux/store";

const getWeatherByCities = (state: RootState) => {
  return state.weather.weatherByCities;
};

const getWeatherAllLoading = (state: RootState) => {
  return state.weather.weatherAllLoading;
};

const weatherSelectors = {
  getWeatherByCities,
  getWeatherAllLoading,
};
export default weatherSelectors;
