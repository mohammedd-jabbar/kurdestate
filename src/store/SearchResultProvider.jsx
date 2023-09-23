/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const SearchResultContext = createContext();

const SearchResultProvider = ({ children }) => {
  const [search, setSearch] = useState(null);

  return (
    <SearchResultContext.Provider
      value={{
        search,
        setSearch,
      }}
    >
      {children}
    </SearchResultContext.Provider>
  );
};

export default SearchResultProvider;
