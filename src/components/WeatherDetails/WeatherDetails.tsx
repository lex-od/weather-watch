import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Grid } from "@mui/material";

import css from "./WeatherDetails.module.scss";
import { useAppDispatch, useAppSelector } from "hooks";
import { formatTemperature } from "utils";
import { routes } from "routes/routes";
import citiesSls from "redux/cities/citiesSelectors";
import weatherThunks from "redux/weather/weatherThunks";

export const WeatherDetails = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const cityIdNum = Number(cityId);
  const isCityIdValid = Number.isInteger(cityIdNum) && cityIdNum > 0;

  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => {
    if (!isCityIdValid) return null;
    return citiesSls.getCityByIdWithWeather(state, cityIdNum);
  });

  const [loading, setLoading] = useState(true);

  const weather = city?.weather;
  const iconCode = weather?.weather[0]?.icon;
  const longDescription = weather?.weather[0]?.description;

  useEffect(() => {
    (async () => {
      if (!isCityIdValid) {
        setLoading(false);
        return;
      }
      // createAsyncThunk => всегда "успешный" промис
      await dispatch(weatherThunks.getCurrentWeather({ id: cityIdNum }));
      setLoading(false);
    })();
  }, [dispatch, cityIdNum, isCityIdValid]);

  return (
    <Box sx={{ padding: "15px 0" }}>
      {city && (
        <Box sx={{ mb: "30px" }}>
          <Typography variant="h2">{city.name}</Typography>
          <Typography variant="subtitle1">Country: {city.country}</Typography>
        </Box>
      )}

      {loading && (
        <Box className={css.loadingBox}>
          <CircularProgress size={48} />
        </Box>
      )}

      {!loading && !weather && (
        <Box className={css.loadingBox}>
          <Typography variant="h5" component="p">
            No weather data found
          </Typography>
        </Box>
      )}

      {!loading && weather && (
        <Box sx={{ mb: "50px" }}>
          {iconCode && (
            <Box sx={{ width: "100px", mb: "30px" }}>
              <img
                src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`}
                alt="weather icon"
              />
            </Box>
          )}

          <Grid container spacing={4} sx={{ mb: "50px", position: "relative" }}>
            <Grid item xs={6}>
              <Typography variant="h5" component="p">
                Temp: {formatTemperature(weather.main.temp)}°
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" component="p">
                Feels like: {formatTemperature(weather.main.feels_like)}°
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h5"
                component="p"
                sx={{ textTransform: "capitalize" }}
              >
                {longDescription}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" component="p">
                Humidity: {weather.main.humidity}%
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" component="p">
                Pressure: {weather.main.pressure} hPa
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" component="p">
                Wind: {Math.round(weather.wind.speed)} m/s
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}

      <Link
        component={RouterLink}
        to={routes.home}
        variant="button"
        underline="none"
        className={css.backToHome}
      >
        <ArrowBackIcon sx={{ mr: "8px" }} />
        Back to Home
      </Link>
    </Box>
  );
};
