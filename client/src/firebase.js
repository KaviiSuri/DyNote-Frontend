import firebase from "firebase/app";
import "firebase/auth";
import { firebaseWebConfigB64 } from "./config";
const app = firebase.initializeApp(
  JSON.parse(Buffer.from(firebaseWebConfigB64, "base64").toString("ascii"))
);

export const auth = app.auth();
export default app;
