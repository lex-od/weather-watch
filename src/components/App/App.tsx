import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { routes } from "routes/routes";
import { Layout } from "components/Layout/Layout";
import { Home } from "components/Home/Home";
import { WeatherDetails } from "components/WeatherDetails/WeatherDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path={routes.home} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={routes.details} element={<WeatherDetails />} />

          <Route path="*" element={<Navigate to={routes.home} />} />
        </Route>
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
