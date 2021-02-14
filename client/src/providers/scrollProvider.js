import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { rootUrl } from "../config";
import useContainer from "../hooks/useContainer";
import { useNotebook } from "./notebookProvider";
import { useAuth } from "./authProvider";
import { useWorkspace } from "./workspaceProvider";

const ScrollContext = React.createContext();

export function useScroll() {
  return useContext(ScrollContext);
}

export function ScrollProvider({ children }) {
  const {
    notebookData,
    currentNotebookId,
    setCurrentNotebookId,
  } = useNotebook();
  const { firebaseUser, backendUser } = useAuth();
  const { currentWorkspaceId, setCurrentWorkspaceId } = useWorkspace();
  const [currentScrollId, setCurrentScrollId] = useState();
  const [scrollData, setScrollData] = useState();
  const [notes, setNotesInternal] = useState();
  // const [
  const compareByTime = (a, b) => {
    if (a.start_time < b.start_time) return -1;
    if (a.start_time > b.start_time) return 1;
    return 0;
  };
  const setNotes = (notes) => {
    notes = notes.sort(compareByTime);
    setNotesInternal((prev) => notes);
    setScrollData((prev) => ({ ...prev, notes }));
  };
  // ] = useContainer(`${rootUrl}/scroll`, notebookData, "scrolls", false);
  const fetchData = async (id) => {
    try {
      const firebase_token = firebaseUser
        ? await firebaseUser.getIdToken()
        : "";
      const { data } = await axios.get(`${rootUrl}/scroll/${id}`, {
        headers: {
          firebase_token,
        },
      });
      setScrollData(data);
      setNotes(data.notes);
      if (data.owner === backendUser._id) {
        if (data.notebook !== currentNotebookId) {
          setCurrentNotebookId(data.notebook);
          if (data.workspace !== currentWorkspaceId)
            setCurrentWorkspaceId(data.workspace);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response) console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (currentScrollId) {
      fetchData(currentScrollId);
    }
  }, [currentScrollId]);

  return (
    <ScrollContext.Provider
      value={{
        currentScrollId,
        setCurrentScrollId,
        scrollData,
        setScrollData,
        notes,
        setNotes,
      }}
    >
      {/* <WorkspaceUpdateContext.Provider value={}> */}
      {children}
      {/* </WorkspaceUpdateContext.Provider> */}
    </ScrollContext.Provider>
  );
}
