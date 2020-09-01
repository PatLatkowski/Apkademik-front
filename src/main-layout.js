import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Schedule from "./components/Schedule";

import "./CSS/main-layout.css";
import TopBar from "./components/top-bar";
import SideBar from "./components/side-bar";

class MainPage extends React.Component {
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col" style={{ background: "#EEEEEE" }}>
            <TopBar />
          </div>
        </div>
        <div class="row">
          <div class="col-2" style={{ background: "#EEEEEE" }}>
            <SideBar />
          </div>
          <div class="col-10 bg-secondary">
            <Schedule />
          </div>
        </div>
      </div>
    );
  }
}
export default MainPage;
