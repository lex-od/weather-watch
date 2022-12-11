import css from "./Home.module.scss";
import weatherThunks from "redux/weather/weatherThunks";
import { useAppDispatch } from "hooks";

export const Home = () => {
  const dispatch = useAppDispatch();

  return (
    <div
      onClick={() => dispatch(weatherThunks.getCurrentWeather({ id: 698740 }))}
    >
      Home
    </div>
  );
};