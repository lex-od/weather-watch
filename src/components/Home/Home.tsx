import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import css from "./Home.module.scss";
import { useAppDispatch, useAppSelector } from "hooks";
import weatherThunks from "redux/weather/weatherThunks";
import citiesSls from "redux/cities/citiesSelectors";
import { WeatherCard } from "./WeatherCard/WeatherCard";
import { useEffect } from "react";
import weatherSls from "redux/weather/weatherSelectors";
import { routes } from "routes/routes";

export const Home = () => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector(citiesSls.getSelectedCities);
  const citiesWithWeather = useAppSelector(
    citiesSls.getSelectedCitiesWithWeather
  );
  const loading = useAppSelector(weatherSls.getWeatherAllLoading);

  useEffect(() => {
    dispatch(weatherThunks.getCurrentWeatherBySelectedCities());
  }, [dispatch, cities]);

  return (
    <Box>
      <Grid container spacing={3} sx={{ position: "relative" }}>
        {loading && (
          <div className={css.loadingBackdrop}>
            <CircularProgress size={48} />
          </div>
        )}

        {citiesWithWeather.map((item) => (
          <Grid key={item.id} item xs={4}>
            <WeatherCard item={item} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: "center", padding: "50px 0" }}>
        <Link
          component={RouterLink}
          to={routes.addCity}
          variant="button"
          underline="none"
          className={css.addCityLink}
        >
          Add city
        </Link>
      </Box>
    </Box>
  );
};
