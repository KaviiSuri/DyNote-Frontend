import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { rootUrl } from "../config";
import { useAuth } from "../providers/authProvider";
import useContainer from "../hooks/useContainer";

const WorkspaceContext = React.createContext();

export function useWorkspace() {
  return useContext(WorkspaceContext);
}

export function WorkspaceProvider({ children }) {
  const { backendUser } = useAuth();
  const [
    currentWorkspaceId,
    setCurrentWorkspaceId,
    workspaceData,
    setWorkspaceData,
  ] = useContainer(`${rootUrl}/workspace`, backendUser, "workspaces", true);

  return (
    <WorkspaceContext.Provider
      value={{
        currentWorkspaceId,
        workspaceData,
        setWorkspaceData,
        setCurrentWorkspaceId,
      }}
    >
      {/* <WorkspaceUpdateContext.Provider value={}> */}
      {children}
      {/* </WorkspaceUpdateContext.Provider> */}
    </WorkspaceContext.Provider>
  );
}
