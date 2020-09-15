import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../CSS/components/top-bar.css";
import logo from "../components/logo.png";
import { Link, useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const TopBar = () => {
  let history = useHistory();

  const handleLogout = (event) => {
    const cookies = new Cookies();
    cookies.remove("token");
    history.push("/login");
  };
  return (
    <div className="container-topbar">
      <div className="row">
        <div className="col-2">
          <Link to="/">
            <img className="img-topbar" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="col-10 second-column">
          <div className="account-topbar">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Ururarer
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/account">Account</Dropdown.Item>
                <Dropdown.Item href="/">
                  Dorm Adminitrator's Panel (TODO)
                </Dropdown.Item>
                <Dropdown.Item href="/appAdminPanel">
                  App Adminitrator's Panel
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TopBar;
