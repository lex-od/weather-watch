import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import mockCities from "json/mockCities.json";
import {
  IAddCityPayload,
  ICitiesState,
  IDeleteCityPayload,
} from "./citiesTypes";

const initialState: ICitiesState = {
  // Init by Kyiv, Odessa, Dnipro from json
  selectedCities: [mockCities[4], mockCities[7], mockCities[1]],
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addNewCity: (state, action: PayloadAction<IAddCityPayload>) => {
      const { newCity } = action.payload;

      const isExists = state.selectedCities.some(({ id }) => id === newCity.id);
      if (isExists) return;

      state.selectedCities.push(newCity);
    },

    deleteCity: (state, action: PayloadAction<IDeleteCityPayload>) => {
      const { cityId } = action.payload;

      state.selectedCities = state.selectedCities.filter(
        ({ id }) => id !== cityId
      );
    },
  },
});

export const { addNewCity, deleteCity } = citiesSlice.actions;
export default citiesSlice.reducer;
