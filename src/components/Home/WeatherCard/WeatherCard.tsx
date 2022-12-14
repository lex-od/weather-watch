import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button } from "@mui/material";

import css from "./WeatherCard.module.scss";
import { ICityWithWeatherItem } from "redux/cities/citiesTypes";
import weatherThunks from "redux/weather/weatherThunks";
import { formatTemperature } from "utils";
import { useAppDispatch } from "hooks";
import { deleteCity } from "redux/cities/citiesSlice";

interface IWeatherCard {
  item: ICityWithWeatherItem;
}

export const WeatherCard: FC<IWeatherCard> = ({ item }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { weather } = item;
  const iconCode = weather?.weather[0]?.icon;
  const shortDescription = weather?.weather[0]?.main;

  const handleContentClick = () => {
    navigate(`/details/${item.id}`);
  };

  const handleUpdate = async () => {
    setLoading(true);
    await dispatch(weatherThunks.getCurrentWeather({ id: item.id }));
    // Не обрабатываем ошибку, т. к. при использовании
    // createAsyncThunk возвращается всегда "успешный" промис
    setLoading(false);
  };

  const handleDelete = () => {
    dispatch(deleteCity({ cityId: item.id }));
  };

  return (
    <Card>
      <CardContent
        sx={{ minHeight: 236, cursor: "pointer" }}
        onClick={handleContentClick}
      >
        <Typography variant="h5">{item.name}</Typography>

        {iconCode && (
          <div className={css.iconThumb}>
            <img
              src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`}
              alt="weather icon"
            />
          </div>
        )}

        {weather && (
          <>
            <Typography sx={{ mb: 1.5 }} variant="h5" component="p">
              {formatTemperature(weather.main.temp)}°, {shortDescription}
            </Typography>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="p"
            >
              Wind: {Math.round(weather.wind.speed)} m/s
            </Typography>
          </>
        )}
      </CardContent>

      <CardActions>
        <LoadingButton
          onClick={handleUpdate}
          loading={loading}
          startIcon={<RefreshIcon />}
          sx={{ width: "50%" }}
        >
          Update
        </LoadingButton>

        <Button
          onClick={handleDelete}
          startIcon={<DeleteIcon />}
          sx={{ width: "50%" }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
