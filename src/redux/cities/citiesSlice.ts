import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICitiesState } from "./citiesTypes";

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
