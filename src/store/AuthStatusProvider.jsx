/* eslint-disable react/prop-types */
import { createContext } from "react";
import { getUserStatus } from "../data/queries";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext(null);

const AuthStatusProvider = ({ children }) => {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["auth"],
    queryFn: getUserStatus,
  });

  return (
    <AuthContext.Provider value={{ data, isLoading, error, isFetching }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthStatusProvider;
