import { RootState } from "redux/store";

const getWeatherByCities = (state: RootState) => state.weather.weatherByCities;

const weatherSelectors = {
  getWeatherByCities,
};
export default weatherSelectors;
