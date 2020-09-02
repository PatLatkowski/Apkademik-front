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
        <div className="col-2 bg-warning">
          <Link to="/">
            <img className="img-topbar" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="col-10">
          <div className="account-topbar">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Ururarer
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/account">Konto</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                  Wyloguj (TODO)
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TopBar;
