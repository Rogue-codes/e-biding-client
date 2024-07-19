import { Outlet } from "react-router-dom";
import AuthGaurd from "./guard/AuthGuard";
import Layout from "./Layout";

const AppOutlet = () => {
  return (
    <AuthGaurd>
      <Layout>
        <Outlet />
      </Layout>
    </AuthGaurd>
  );
};

export default AppOutlet;
