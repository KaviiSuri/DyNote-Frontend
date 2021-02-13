import React, { useContext, useState } from "react";
const WorkspaceContext = React.createContext();
const WorkspaceUpdateContext = React.createContext();
// exports
export function useWorkspace() {
  return useContext(WorkspaceContext);
}
export function useWorkspaceUpdate() {
  return useContext(WorkspaceUpdateContext);
}
export function WorkspaceProvider({ children }) {
  // States

  // functionalities

  return (
    <WorkspaceContext.Provider value={}>
      <WorkspaceUpdateContext.Provider value={}>
        {children}
      </WorkspaceUpdateContext.Provider>
    </WorkspaceContext.Provider>
  );
}
