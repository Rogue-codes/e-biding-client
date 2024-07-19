import { Outlet } from "react-router-dom";
import PublicRoute from "./PublicRoute";

const PublicOutlet = () => {
  return (
    <PublicRoute>
      <Outlet />
    </PublicRoute>
  );
};

export default PublicOutlet;
