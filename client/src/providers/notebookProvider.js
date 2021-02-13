import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { rootUrl } from "../config";
import { useAuth } from "../providers/authProvider";
import useContainer from "../hooks/useContainer";
import { useWorkspace } from "./workspaceProvider";

const NotebookContext = React.createContext();
export function useNotebook() {
  return useContext(NotebookContext);
}
export function NotebookProvider({ children }) {
  const { workspaceData } = useWorkspace();
  // const { firebaseUser, backendUser } = useAuth();
  const [currentNotebookId, setCurrentNotebookId] = useState();

  const [notebookData, setNotebookData] = useState();

  //==== effects ====
  //effect to refetch workspace when change in id
  useEffect(() => {
    if (currentNotebookId) {
      if (workspaceData) {
        setNotebookData(
          workspaceData.notebooks.find((nb) => nb._id === currentNotebookId)
        );
      }
    }
  }, [currentNotebookId]);

  useEffect(() => {
    if (workspaceData) {
      if (
        !currentNotebookId ||
        !workspaceData["notebooks"].includes(currentNotebookId)
      ) {
        if (workspaceData["notebooks"][0]) {
          setCurrentNotebookId(workspaceData["notebooks"][0]._id);
        }
      }
    }
  }, [workspaceData]);
  return (
    <NotebookContext.Provider
      value={{
        currentNotebookId,
        notebookData,
        setCurrentNotebookId,
        setNotebookData,
      }}
    >
      {children}
    </NotebookContext.Provider>
  );
}
