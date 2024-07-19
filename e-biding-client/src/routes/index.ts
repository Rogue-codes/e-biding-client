import { lazy } from "react";
import { paths } from "./paths";

const routes = [
  {
    path: paths.HOME,
    exact: true,
    component: lazy(() => import("../views/home/Home")),
  },
  {
    path: paths.MARKETPLACE,
    exact: true,
    component: lazy(() => import("../views/marketplace/MarketPlace")),
  },
  {
    path: paths.BIDHISTORY,
    exact: true,
    component: lazy(() => import("../views/bidhistory/BidHistory")),
  },
  {
    path: paths.PROFILE,
    exact: true,
    component: lazy(() => import("../views/profile/Profile")),
  },
  {
    path: paths.SINGLEBID,
    exact: true,
    component: lazy(() => import("../views/marketplace/SIngleBid")),
  },
];

export default routes;
