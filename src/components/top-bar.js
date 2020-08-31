import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../CSS/components/top-bar.css";
import logo from "../components/logo.png";
import { Link } from "react-router-dom";

class TopBar extends React.Component {
  render() {
    return (
      <div class="container-topbar">
        <div class="row">
          <div class="col-2 bg-warning">
            <Link to="/main-page">
              <img class="img-topbar" src={logo} alt="logo" />
            </Link>
          </div>
          <div class="col-10">
            <div class="account-topbar">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Ururarer
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/account">Konto</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Wyloguj (TODO)
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
