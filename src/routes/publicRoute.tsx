import { Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import NavigationScroll from "layout/navigationScroll";
import { useAuth } from "hooks/auth/useAuth";

const PublicRoute = ({ children }: any) => {
  const auth = useAuth();

  const location = useLocation();
  if (auth) {
    return <Navigate to="/dashboard" state={{ from: location }} />;
  }
  return <NavigationScroll>{children}</NavigationScroll>;
};
export default PublicRoute;
