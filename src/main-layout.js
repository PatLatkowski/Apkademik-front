import ReactDOM from "react-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./main-layout.css";
import TopBar from "./components/top-bar";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col bg-success">
            <TopBar />
          </div>
        </div>
        <div class="row">
          <div class="col-2 bg-primary ">col1</div>
          <div class="col-10 bg-secondary">col2</div>
        </div>
      </div>
    );
  }
}
export default MainPage;
