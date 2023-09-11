import { getUserStatus } from "../data/queries";
import { useQuery } from "react-query";

export const UseAuthStatus = () => {
  const { data: user, isLoading } = useQuery("auth", getUserStatus);

  const isLoggedIn = Boolean(user);

  return { isLoggedIn, isLoading };
};
