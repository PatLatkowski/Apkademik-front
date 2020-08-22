import ReactDOM from "react-dom";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../CSS/components/top-bar.css";
import logo from "../components/logo.png";

class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="container-topbar">
        <div class="row">
          <div class="col-2 bg-warning">
            <img class="img-topbar" src={logo} alt="logo" />
          </div>
          <div class="col-10 bg-info">
            <div class="account">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Ururarer
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default TopBar;
