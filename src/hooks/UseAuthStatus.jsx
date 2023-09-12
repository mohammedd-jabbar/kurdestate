import { useContext } from "react";
import { AuthContext } from "../store/AuthStatusProvider";

export const UseAuthStatus = () => {
  const { data, isLoading } = useContext(AuthContext);

  const isLoggedIn = Boolean(data);

  return { isLoggedIn, isLoading };
};
