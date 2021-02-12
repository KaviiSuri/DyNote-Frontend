import React, { useContext, useState } from "react";
const WorkbookContext = React.createContext();
const WorkbookUpdateContext = React.createContext();
// exports
export function useWorkbook() {
  return useContext(WorkbookContext);
}
export function useWorkbookUpdate() {
  return useContext(WorkbookUpdateContext);
}
export function WorkbookProvider({ children }) {
  // States

  // functionalities

  return (
    <WorkbookContext.Provider value={}>
      <WorkbookUpdateContext.Provider value={}>
        {children}
      </WorkbookUpdateContext.Provider>
    </WorkbookContext.Provider>
  );
}
