import { getUserStatus } from "../data/queries";
import { useQuery } from "@tanstack/react-query";

export const UseAuthStatus = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: getUserStatus,
  });

  const isLoggedIn = Boolean(user);

  return { isLoggedIn, isLoading };
};
