import { RouteObject } from "react-router-dom";
import ROUTES from "./routes";
import Feature from "layout/feature";
import PrivateRoute from "./privateRoute";
import LazyLoader from "components/routesContainer";
import { lazy } from "react";
const Dashboard = LazyLoader(lazy(() => import("modules/dashboard/dashboard")));
const FeatureRoutes: RouteObject = {
  path: ROUTES.BASE_ROUTE,
  element: <Feature />,
  children: [
    {
      path: ROUTES.FEATURE_ROUTES.DASHBOARD,
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
    },
  ],
};
export default FeatureRoutes;
