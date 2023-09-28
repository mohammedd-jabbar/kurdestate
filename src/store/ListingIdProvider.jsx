/* eslint-disable react/prop-types */
import { createContext } from "react";
import { getPropertyIds } from "../data/queries";
import { useQuery } from "@tanstack/react-query";

export const ListingsIdContext = createContext(null);

const ListingIdProvider = ({ children }) => {
  const { data: id } = useQuery({
    queryKey: ["listingsId"],
    queryFn: getPropertyIds,
    retry: 1,
  });

  return (
    <ListingsIdContext.Provider value={{ id }}>
      {children}
    </ListingsIdContext.Provider>
  );
};

export default ListingIdProvider;
