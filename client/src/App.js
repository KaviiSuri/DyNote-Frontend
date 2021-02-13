import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/home";
import WorkSpace from "./pages/WorkSpace/workspace";
import { AuthProvider } from "./providers/authProvider";
import { WorkspaceProvider } from "./providers/workspaceProvider";

function App() {
  console.log(process.env.FIREBASE_WEB_CONFIG_BASE64);
  return (
    <AuthProvider>
      <WorkspaceProvider>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/workspace" component={WorkSpace} />
          {/* <Route path="/not-found" component={NotFound} /> */}
          <Redirect from="/" exact to="/home" />
          {/* <Redirect to="/not-found" /> */}
        </Switch>
      </WorkspaceProvider>
    </AuthProvider>
  );
}

export default App;
