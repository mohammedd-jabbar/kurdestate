/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const ExpandedContext = createContext();

const SidebarProvider = ({ children }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <ExpandedContext.Provider
      value={{
        expanded,
        setExpanded,
      }}
    >
      {children}
    </ExpandedContext.Provider>
  );
};

export default SidebarProvider;
