import { lazy } from "react";
import { paths } from "./paths";

const routes = [
  {
    path: paths.HOME,
    exact: true,
    component: lazy(
      () => import("../views/accountManagement/AccountManagement")
    ),
  },
  {
    path: paths.MARKETPLACE,
    exact: true,
    component: lazy(
      () => import("../views/biddingManagement/BiddingManagement")
    ),
  },
  {
    path: paths.ANALYTICS,
    exact: true,
    component: lazy(() => import("../views/analytics/Analytics")),
  },
  {
    path: paths.CREATE_BID,
    exact: true,
    component: lazy(() => import("../views/biddingManagement/CreateBid")),
  },
  {
    path: paths.VIEW_BID,
    exact: true,
    component: lazy(() => import("../views/biddingManagement/ViewBid")),
  },
];

export default routes;
