import { Navigate, Route, Routes } from "react-router-dom";
import AppWrapper from "./layout/AppWrapper";
import AppOutlet from "./layout/AppOutlet";
import { paths } from "./routes/paths";
import routes from "./routes";
import { Suspense } from "react";
import Footer from "./components/footer/Footer";
import Preloader from "./components/preloader/Preloader";
import PublicOutlet from "./layout/guard/publicRoute/PublicOutlet";
import Auth from "./views/auth/Auth";

export default function App() {
  return (
    <AppWrapper>
      <Routes>
        <Route element={<AppOutlet />}>
          <Route index element={<Navigate to={paths.HOME} />} />
          {routes.map(({ component: Component, path }) => (
            <Route
              path={path}
              key={path}
              element={
                <Suspense fallback={<Preloader />}>
                  <Component />
                </Suspense>
              }
            />
          ))}
        </Route>

        <Route element={<PublicOutlet />}>
          <Route index element={<Navigate to={paths.LOGIN} />} />
          <Route
            path={paths.LOGIN}
            element={
              <Suspense fallback={<Preloader />}>
                <Auth />
              </Suspense>
            }
          />
        </Route>

        {/* <Route index element={<NoMatch />} /> */}
      </Routes>
      <Footer/>
    </AppWrapper>
  );
}