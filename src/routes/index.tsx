import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import AuthRoutes from "./authRoutes";
import FeatureRoutes from "./featureRoutes";
import NotFound from "components/not-found/notFound";

const NotFoundRoute: RouteObject = {
  path: "*",
  element: <NotFound />,
};
export const RouteManager = () => {
  return useRoutes([AuthRoutes, FeatureRoutes, NotFoundRoute]);
};
