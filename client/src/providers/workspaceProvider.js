import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { rootUrl } from "../config";
import { useAuth } from "../providers/authProvider";

const WorkspaceContext = React.createContext();
// const WorkspaceUpdateContext = React.createContext();
// exports
export function useWorkspace() {
  return useContext(WorkspaceContext);
}
// export function useWorkspaceUpdate() {
//   return useContext(WorkspaceUpdateContext);
// }
export function WorkspaceProvider({ children }) {
  // States
  const { firebaseUser, backendUser } = useAuth();
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState();
  const [workspaceData, setWorkspaceData] = useState();

  // functionalities
  const fetchData = async (currentWorkspaceId) => {
    try {
      const { data } = axios.get(
        `${rootUrl}/workspace/${currentWorkspaceId}`,
        {},
        {
          headers: {
            firebase_token: await firebaseUser.getIdToken(),
          },
        }
      );
      setWorkspaceData(data);
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  };

  //==== effects ====
  //effect to refetch workspace when change in id
  useEffect(() => {
    if (currentWorkspaceId) {
      fetchData(currentWorkspaceId);
    }
  }, [currentWorkspaceId]);

  // effect to change id to default if invalid id or user changed
  useEffect(() => {
    if (backendUser) {
      if (
        !currentWorkspaceId ||
        !backendUser.workspaces.includes(currentWorkspaceId)
      ) {
        console.log("Backend User From workspace", backendUser);
        setCurrentWorkspaceId(backendUser.workspaces[0]);
      }
    }
  }, [backendUser]);

  return (
    <WorkspaceContext.Provider
      value={{ currentWorkspaceId, workspaceData, setCurrentWorkspaceId }}
    >
      {/* <WorkspaceUpdateContext.Provider value={}> */}
      {children}
      {/* </WorkspaceUpdateContext.Provider> */}
    </WorkspaceContext.Provider>
  );
}
