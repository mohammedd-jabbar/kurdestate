import { Navigate, Outlet } from "react-router-dom";
import { UseAuthStatus } from "../../hooks/UseAuthStatus";
import Spinner from "./Spinner";

export const PrivateRoute = () => {
  const { isLoggedIn, isLoading } = UseAuthStatus();

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
