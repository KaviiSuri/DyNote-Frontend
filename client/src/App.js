import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Switch>
      {/* <Route path="/home" component={Home} />
        <Route path="/not-found" component={NotFound} />
        <Redirect from="/" exact to="/home" />
        <Redirect to="/not-found" /> */}
    </Switch>
  );
}

export default App;
