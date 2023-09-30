import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UseAuthStatus } from "../../hooks/UseAuthStatus";
import Spinner from "./Spinner";

export const PrivateLoginRoute = () => {
  const { isLoggedIn, isLoading } = UseAuthStatus();

  const location = useLocation();
  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const allowedRoutes = ["/sign-up", "/login", "/forgot-password"];
  if (isLoggedIn && allowedRoutes.includes(location.pathname)) {
    return <Navigate to="/" />;
  } else if (!isLoggedIn && allowedRoutes.includes(location.pathname)) {
    return <Outlet />;
  }
};
