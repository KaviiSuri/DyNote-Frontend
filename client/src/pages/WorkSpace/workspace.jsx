import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import Scrolls from "../ScrollsPage/Scrolls";
import { Route, Switch } from "react-router-dom";
import "./workspace.css";
import NotesPage from "../NotesPage/NotesPage";
const WorkSpace = () => {
  return (
    <>
      <SideBar />
      <div className="main__container">
        <Switch>
          <Route path="/workspace/scroll/:id" component={NotesPage} />
          <Route path="/" component={Scrolls} />
        </Switch>
      </div>
    </>
  );
};

export default WorkSpace;
