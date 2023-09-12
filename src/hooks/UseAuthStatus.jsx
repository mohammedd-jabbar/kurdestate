import { useContext } from "react";
import { UserInfoContext } from "../store/UserInfoProvider";

export const UseAuthStatus = () => {
  const { data, isLoading } = useContext(UserInfoContext);

  const isLoggedIn = Boolean(data);

  return { isLoggedIn, isLoading };
};
