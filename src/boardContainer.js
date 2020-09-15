import Board from "./components/board";
import React from "react";
import ShowPost from "./components/showPost";
import { Switch, Route, matchPath } from "react-router-dom";

function BoardContainer() {
  return (
    <div>
      TEXT
      <Switch>
        <Route exact path="/:boardTitle" component={Board} />
        <Route path="/:boardTitle/post/:id" component={ShowPost} />
      </Switch>
    </div>
  );
}
export default BoardContainer;
