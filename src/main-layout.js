import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Schedule from "./components/Schedule";
import TestComponent from "./components/testComponent";
import "./CSS/main-layout.css";
import TopBar from "./components/top-bar";
import Board from "./components/board";
import { Switch, Route, matchPath } from "react-router-dom";
import ShowPost from "./components/showPost";
import SideBar from "./components/side-bar";
import BoardContainer from "./boardContainer";

function MainPage(props) {
  const [selectedOption, setSelectedOption] = useState(1);

  function getSelectedOption(event, value) {
    console.log(value);
    setSelectedOption(value);
  }

  const OPTIONS = {
    1: <Schedule />,
    2: <BoardContainer />,
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col" style={{ background: "#EEEEEE" }}>
          <TopBar />
        </div>
      </div>
      <div className="row">
        <div className="col-2" style={{ background: "#EEEEEE" }}>
          <SideBar
            onNodeSelect={(event, value) => getSelectedOption(event, value)}
          />
        </div>
        <div className="col-10 bg-secondary">{OPTIONS[selectedOption]}</div>
      </div>
    </div>
  );
}

export default MainPage;
