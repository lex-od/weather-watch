import { Outlet } from "react-router-dom";
import css from "./Layout.module.scss";

export const Layout = () => {
  return (
    <div className={css.Layout}>
      <Outlet />
    </div>
  );
};
