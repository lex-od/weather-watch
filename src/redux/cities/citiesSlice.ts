import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  IAddCityPayload,
  ICitiesState,
  IDeleteCityPayload,
} from "./citiesTypes";

const initialState: ICitiesState = {
  selectedCities: [
    {
      id: 698740,
      name: "Odessa",
      state: "",
      country: "UA",
      coord: {
        lon: 30.732622,
        lat: 46.477474,
      },
    },
    {
      id: 696643,
      name: "Poltava",
      state: "",
      country: "UA",
      coord: {
        lon: 34.54073,
        lat: 49.593731,
      },
    },
    {
      id: 692194,
      name: "Sumy",
      state: "",
      country: "UA",
      coord: {
        lon: 34.800289,
        lat: 50.9216,
      },
    },
    {
      id: 690688,
      name: "Uman",
      state: "",
      country: "UA",
      coord: {
        lon: 30.22184,
        lat: 48.748379,
      },
    },
    {
      id: 689558,
      name: "Vinnytsia",
      state: "",
      country: "UA",
      coord: {
        lon: 28.48097,
        lat: 49.23278,
      },
    },
  ],
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
