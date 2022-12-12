import { FC } from "react";
import { Card } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import css from "./WeatherCard.module.scss";
import { ICityWithWeatherItem } from "redux/cities/citiesTypes";
import { formatTemperature } from "utils";

interface IWeatherCard {
  item: ICityWithWeatherItem;
}

export const WeatherCard: FC<IWeatherCard> = ({ item }) => {
  const { weather } = item;
  const iconCode = weather?.weather[0]?.icon;
  const shortDescription = weather?.weather[0]?.main;

  return (
    <Card>
      <CardContent sx={{ minHeight: 236 }}>
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
              {formatTemperature(weather.main.temp)}, {shortDescription}
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
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
