import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import axios from "axios";
import { rootUrl } from "../config";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState();
  const [backendUser, setBackendUser] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  async function signup() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await auth.signInWithPopup(provider);
      console.log("User Signed In:");
      console.log(result.user);
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    setBackendUser(undefined);
    await auth.signOut();
    history.push("/home");
  }
  async function signinBackend(user) {
    try {
      let backendUser;
      if (user) {
        const res = await axios.post(
          `${rootUrl}/user/`,
          {
            username: user.displayName,
          },
          {
            headers: {
              firebase_token: await user.getIdToken(),
            },
          }
        );
        backendUser = res.data;
      }
      setBackendUser(backendUser);
      return backendUser;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setFirebaseUser(user);
      // create or login in backend
      signinBackend(user).then((bcUser) => {
        setLoading(false);
        if (user && bcUser) {
          history.push("/workspace");
        }
      });
    });
    return unsubscribe;
  }, []);
  const value = {
    firebaseUser,
    backendUser,
    setBackendUser,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
