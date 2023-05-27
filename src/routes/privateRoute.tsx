import { useAuth } from "hooks/auth/useAuth";
import NavigationScroll from "layout/navigationScroll";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const auth = useAuth();
  const location = useLocation();
  if (!auth) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return <NavigationScroll>{children}</NavigationScroll>;
};
export default PrivateRoute;
