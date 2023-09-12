/* eslint-disable react/prop-types */
import { createContext } from "react";
import { getUserInfo } from "../data/queries";
import { useQuery } from "@tanstack/react-query";

export const UserInfoContext = createContext(null);

const UserInfoProvider = ({ children }) => {
  const { data, isLoading, error, isFetching, isError } = useQuery({
    queryKey: ["auth"],
    queryFn: getUserInfo,
    retry: 1,
  });

  return (
    <UserInfoContext.Provider
      value={{ data, isLoading, error, isFetching, isError }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;
