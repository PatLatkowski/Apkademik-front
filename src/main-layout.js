import ReactDOM from "react-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./CSS/main-layout.css";
import TopBar from "./components/top-bar";
import Board from "./components/board";
import { Switch, Route } from "react-router-dom";
import ShowPost from "./components/showPost";

function MainPage() {
  return (
    <div className="container">
      <div className="row">
        <div className="col bg-success">
          <TopBar />
        </div>
      </div>
      <div className="row">
        <div className="col-2 bg-primary ">col1</div>
        <div className="col-10 bg-light mt-2">
          <Switch>
            <Route exact path="/main-page/:boardTitle" component={Board} />
            <Route
              path="/main-page/:boardTitle/post/:id"
              component={ShowPost}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
