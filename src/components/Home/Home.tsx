import css from "./Home.module.scss";
import { useAppDispatch } from "hooks";
import weatherThunks from "redux/weather/weatherThunks";

export const Home = () => {
  const dispatch = useAppDispatch();

  return (
    <div
      onClick={() => {
        dispatch(weatherThunks.getCurrentWeather({ id: 698740 }));
      }}
    >
      Home
    </div>
  );
};
