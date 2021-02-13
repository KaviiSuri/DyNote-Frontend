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
  const [currentNotebookId, notebookData, setCurrentNotebookId] = useContainer(
    `${rootUrl}/notebook`,
    workspaceData,
    "notebooks"
  );

  return (
    <NotebookContext.Provider
      value={{ currentNotebookId, notebookData, setCurrentNotebookId }}
    >
      {children}
    </NotebookContext.Provider>
  );
}
