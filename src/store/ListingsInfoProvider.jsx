/* eslint-disable react/prop-types */
import { createContext } from "react";
import { getPropertyLocations } from "../data/queries";
import { useQuery } from "@tanstack/react-query";

export const ListingsInfoContext = createContext(null);

const ListingsInfoProvider = ({ children }) => {
  const { data, isLoading, error, isFetching, isError } = useQuery({
    queryKey: ["listings"],
    queryFn: getPropertyLocations,
    retry: 1,
  });

  return (
    <ListingsInfoContext.Provider
      value={{ data, isLoading, error, isFetching, isError }}
    >
      {children}
    </ListingsInfoContext.Provider>
  );
};

export default ListingsInfoProvider;
