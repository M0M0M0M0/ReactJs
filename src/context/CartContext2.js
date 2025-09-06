import React from "react";

const GlobalContext = React.createContext(); //tao global context
export const GlobalContext =  GlobalContext.Provider; //tao provider

export default GlobalContext;