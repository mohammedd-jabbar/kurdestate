import { Navigate, Outlet } from "react-router-dom";
import { UseAuthStatus } from "../hooks/UseAuthStatus";

export const PrivateRoute = () => {
  const { isLoggedIn, isLoading } = UseAuthStatus();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};
