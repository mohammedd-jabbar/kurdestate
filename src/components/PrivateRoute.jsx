import { Navigate, Outlet } from "react-router-dom";
import { UseAuthStatus } from "../hooks/UseAuthStatus";

export const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = UseAuthStatus();

  if (checkingStatus) {
    return <div>Loading...</div>;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};
