import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useAppDispatch, useAppSelector } from "hooks";
import weatherThunks from "redux/weather/weatherThunks";
import citiesSls from "redux/cities/citiesSelectors";
import { WeatherCard } from "./WeatherCard/WeatherCard";
import { useEffect } from "react";

export const Home = () => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector(citiesSls.getSelectedCities);
  const citiesWithWeather = useAppSelector(
    citiesSls.getSelectedCitiesWithWeather
  );

  useEffect(() => {
    dispatch(weatherThunks.getCurrentWeatherBySelectedCities());
  }, [dispatch, cities]);

  return (
    <Box>
      <Grid container spacing={3}>
        {citiesWithWeather.map((item) => (
          <Grid key={item.id} item xs={4}>
            <WeatherCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
