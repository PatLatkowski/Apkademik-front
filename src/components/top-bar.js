import React, { useContext, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../CSS/components/top-bar.css";
import logo from "../components/logo.png";
import { Link, useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { UserContext } from "../index";
import { contextInitialState } from "../consts";
import axios from "axios";

const TopBar = () => {
  let history = useHistory();
  const { userName, setUserName } = useContext(UserContext);

  useEffect(() => {
    if (userName === contextInitialState) {
      const cookies = new Cookies();
      const token = cookies.get("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        axios
          .get("http://46.41.142.44:8080/user", config)
          .then(({ data: { name, surname } }) => {
            setUserName(name + " " + surname);
          })
          .catch((error) => {
            if (error.request.status === 401) {
              const cookies = new Cookies();
              cookies.remove("token");
              history.push("/login");
            }
          });
      } catch (e) {
        console.log(e);
      }
    }
  });

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
              <Dropdown.Toggle id="dropdown-basic" className="dropdown">
                {userName}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/account">Account</Dropdown.Item>
                <Dropdown.Item href="/dormAdminPanel">
                  Dorm Adminitrator's Panel
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
