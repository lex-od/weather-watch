import { createSlice } from "@reduxjs/toolkit";
import { IWeatherState } from "./weatherTypes";
import weatherThunks from "./weatherThunks";

const initialState: IWeatherState = {
  list: [],
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      weatherThunks.getCurrentWeather.fulfilled,
      (state, { payload }) => {
        state.list = state.list.filter(({ id }) => id !== payload.id);
        state.list.push(payload);
      }
    );
  },
});

export default weatherSlice.reducer;
