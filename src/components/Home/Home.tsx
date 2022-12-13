import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import css from "./Home.module.scss";
import { useAppDispatch, useAppSelector } from "hooks";
import weatherThunks from "redux/weather/weatherThunks";
import citiesSls from "redux/cities/citiesSelectors";
import { WeatherCard } from "./WeatherCard/WeatherCard";
import { useEffect, useState } from "react";
import weatherSls from "redux/weather/weatherSelectors";
import { AddCityDialog } from "components/AddCityDialog/AddCityDialog";
import { ICityItem } from "redux/cities/citiesTypes";
import { addNewCity } from "redux/cities/citiesSlice";

export const Home = () => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector(citiesSls.getSelectedCities);
  const citiesWithWeather = useAppSelector(
    citiesSls.getSelectedCitiesWithWeather
  );
  const loading = useAppSelector(weatherSls.getWeatherAllLoading);

  const [isAddModal, setIsAddModal] = useState(false);

  const closeAddModal = () => setIsAddModal(false);

  const handleAddCitySubmit = (newCity: ICityItem) => {
    dispatch(addNewCity({ newCity }));
    closeAddModal();
  };

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
        <Button
          variant="outlined"
          size="large"
          onClick={() => setIsAddModal(true)}
        >
          Add city
        </Button>
      </Box>

      <AddCityDialog
        open={isAddModal}
        onSubmit={handleAddCitySubmit}
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
