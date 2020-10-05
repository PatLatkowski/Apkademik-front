import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Schedule from "./components/Schedule";
import "./CSS/main-layout.css";
import TopBar from "./components/top-bar";
import SideBar from "./components/side-bar";
import Board from "./components/board";
import { Switch, Route } from "react-router-dom";
import ShowPost from "./components/showPost";

function MainPage() {
  const [selectedOption, setSelectedOption] = useState(1);

  function getSelectedOption(event, value) {
    setSelectedOption(value);
  }

  return (
    <div className="container">
      <div className="row">
        <TopBar />
      </div>
      <div className="row" id="main">
        <div className="col-2" style={{ background: "#EEEEEE" }}>
          <SideBar
            onNodeSelect={(event, value) => getSelectedOption(event, value)}
          />
        </div>
        <div className="col-10 bg-secondary">
          <Switch>
            <Route exact path="/mainPage/reservation" component={Schedule} />
            <Route exact path="/mainPage/:boardTitle" component={Board} />
            <Route
              exact
              path="/mainPage/:boardTitle/post/:id"
              component={ShowPost}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
