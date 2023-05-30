import React, { createContext, useEffect, useState } from "react";

export const ContextProvider = createContext();
const Context = ({ children }) => {
  let token = localStorage.getItem("token");
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState();
  return (
    <>
      <ContextProvider.Provider
        value={{
          t: [theme, setTheme],
          userDetails: [user, setUser],
        }}
      >
        {children}
      </ContextProvider.Provider>
    </>
  );
};

export default Context;
