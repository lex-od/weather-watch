import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  IAddCityPayload,
  ICitiesState,
  IDeleteCityPayload,
} from "./citiesTypes";

const initialState: ICitiesState = {
  selectedCities: [],
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addNewCity: (state, action: PayloadAction<IAddCityPayload>) => {
      const { newCity } = action.payload;

      const isExists = state.selectedCities.some(({ id }) => id === newCity.id);

      if (isExists) return;

      state.selectedCities = [newCity, ...state.selectedCities];
    },

    deleteCity: (state, action: PayloadAction<IDeleteCityPayload>) => {
      const { cityId } = action.payload;

      state.selectedCities = state.selectedCities.filter(
        ({ id }) => id !== cityId
      );
    },
  },
});

export const { addNewCity } = citiesSlice.actions;
export default citiesSlice.reducer;
