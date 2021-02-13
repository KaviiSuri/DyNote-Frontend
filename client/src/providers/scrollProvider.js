import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { rootUrl } from "../config";
import useContainer from "../hooks/useContainer";
import { useNotebook } from "./notebookProvider";

const ScrollContext = React.createContext();

export function useScroll() {
  return useContext(ScrollContext);
}

export function ScrollProvider({ children }) {
  const { notebookData } = useNotebook();
  const [
    currentScrollId,
    setCurrentScrollId,
    scrollData,
    setScrollData,
  ] = useContainer(`${rootUrl}/scroll`, notebookData, "scrolls", false);

  return (
    <ScrollContext.Provider
      value={{
        currentScrollId,
        setCurrentScrollId,
        scrollData,
        setScrollData,
      }}
    >
      {/* <WorkspaceUpdateContext.Provider value={}> */}
      {children}
      {/* </WorkspaceUpdateContext.Provider> */}
    </ScrollContext.Provider>
  );
}
