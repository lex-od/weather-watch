import { combineReducers } from "@reduxjs/toolkit";
import citiesReducer from "redux/cities/citiesSlice";
import weatherReducer from "redux/weather/weatherSlice";

export const rootReducer = combineReducers({
  cities: citiesReducer,
  weather: weatherReducer,
});
