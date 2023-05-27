import LazyLoader from "components/routesContainer";
import { lazy } from "react";
import { Outlet, RouteObject } from "react-router-dom";
import ROUTES from "./routes";
import PublicRoute from "./publicRoute";

const Login = LazyLoader(lazy(() => import("modules/auth/login")));

const AuthRoutes: RouteObject = {
  path: ROUTES.BASE_ROUTE,
  element: <Outlet />,
  children: [
    {
      path: ROUTES.AUTH_ROUTES.LOGIN,
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
  ],
};
export default AuthRoutes;
