import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "routes/routes";
import { Layout } from "components/Layout/Layout";
import { Home } from "components/Home/Home";

function App() {
  return (
    <Routes>
      <Route path={routes.home} element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
