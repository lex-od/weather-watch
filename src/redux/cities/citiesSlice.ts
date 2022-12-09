import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export interface ICitiesState {
  list: null;
}

const initialState: ICitiesState = {
  list: null,
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addNewCity: (state, action: PayloadAction<any>) => {
      //
    },
  },
});

export const { addNewCity } = citiesSlice.actions;
export default citiesSlice.reducer;

// 📌 Selectors

export const getCitiesList = (state: RootState) => state.cities.list;
