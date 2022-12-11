import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  IAddNewCityPayload,
  ICitiesState,
  IDeleteCityPayload,
} from "./citiesTypes";

const initialState: ICitiesState = {
  selectedIds: [],
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addNewCity: (state, action: PayloadAction<IAddNewCityPayload>) => {
      const { newId } = action.payload;
      if (state.selectedIds.includes(newId)) {
        return;
      }
      state.selectedIds = [newId, ...state.selectedIds];
    },

    deleteCity: (state, action: PayloadAction<IDeleteCityPayload>) => {
      const { delId } = action.payload;
      state.selectedIds = state.selectedIds.filter((id) => id !== delId);
    },
  },
});

export const { addNewCity } = citiesSlice.actions;
export default citiesSlice.reducer;
