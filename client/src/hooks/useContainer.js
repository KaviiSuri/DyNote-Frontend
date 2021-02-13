import { useState, useEffect } from "react";
import axios from "axios";
import { rootUrl } from "../config";
import { useAuth } from "../providers/authProvider";

export default function useContainer(getUrl, parent, key) {
  // States
  const { firebaseUser, backendUser } = useAuth();
  const [currentId, setCurrentId] = useState();
  const [data, setData] = useState();
  // functionalities
  const fetchData = async (id) => {
    try {
      const { data } = axios.get(
        `${getUrl}/${id}`,
        {},
        {
          headers: {
            firebase_token: await firebaseUser.getIdToken(),
          },
        }
      );
      setData(data);
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  };

  //==== effects ====
  //effect to refetch workspace when change in id
  useEffect(() => {
    if (currentId) {
      fetchData(currentId);
    }
  }, [currentId]);

  // effect to change id to default if invalid id or user changed
  useEffect(() => {
    if (parent) {
      if (!currentId || !parent[key].includes(currentId)) {
        // console.log("Backend User From workspace", backendUser);
        setCurrentId(parent[key][0]);
      }
    }
  }, [parent]);
  return [currentId, data, setCurrentId];
}
