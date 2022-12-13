import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

import css from "./Home.module.scss";
import { useAppDispatch, useAppSelector } from "hooks";
import weatherThunks from "redux/weather/weatherThunks";
import citiesSls from "redux/cities/citiesSelectors";
import weatherSls from "redux/weather/weatherSelectors";
import { ICityItem } from "redux/cities/citiesTypes";
import { addNewCity } from "redux/cities/citiesSlice";
import { WeatherCard } from "./WeatherCard/WeatherCard";
import { AddCityDialog } from "./AddCityDialog/AddCityDialog";

export const Home = () => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector(citiesSls.getSelectedCities);
  const citiesWithWeather = useAppSelector(
    citiesSls.getSelectedCitiesWithWeather
  );
  const remainingCities = useAppSelector(citiesSls.getRemainingAvailableCities);
  const loading = useAppSelector(weatherSls.getWeatherAllLoading);

  const [isAddModal, setIsAddModal] = useState(false);

  const closeAddModal = () => setIsAddModal(false);

  const handleAddCitySubmit = (newCity: ICityItem) => {
    dispatch(addNewCity({ newCity }));
    closeAddModal();
  };

  // Получаем только отсутствующую погоду
  useEffect(() => {
    dispatch(weatherThunks.getCurrentWeatherBySelectedCities());
  }, [dispatch, cities]);

  return (
    <Box sx={{ padding: "15px 0" }}>
      <Typography variant="h2" sx={{ textAlign: "center", mb: "50px" }}>
        Weather watch
      </Typography>

      <Grid container spacing={3} sx={{ mb: "50px", position: "relative" }}>
        {citiesWithWeather.map((item) => (
          <Grid key={item.id} item xs={4}>
            <WeatherCard item={item} />
          </Grid>
        ))}

        {loading && (
          <div className={css.loadingBackdrop}>
            <CircularProgress size={48} />
          </div>
        )}
      </Grid>

      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="outlined"
          size="large"
          onClick={() => setIsAddModal(true)}
        >
          Add city
        </Button>
      </Box>

      <AddCityDialog
        cities={remainingCities}
        onSubmit={handleAddCitySubmit}
        open={isAddModal}
        onClose={closeAddModal}
      />
    </Box>
  );
};

// import { Link as RouterLink } from "react-router-dom";
// import Link from "@mui/material/Link";

// <Link
//   component={RouterLink}
//   to={routes.addCity}
//   variant="button"
//   underline="none"
//   className={css.addCityLink}
// >
//   Add city
// </Link>;
