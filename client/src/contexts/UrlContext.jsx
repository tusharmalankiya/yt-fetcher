import React, { createContext} from "react";

export const UrlContext = createContext();

const UrlContextProvider = (props) => {
  // const hostUrl = "http://184.72.77.145";
  
  const hostUrl = "http://localhost";

  return (
    <UrlContext.Provider value={{ hostUrl }}>
      {props.children}
    </UrlContext.Provider>
  );
};

export default UrlContextProvider;