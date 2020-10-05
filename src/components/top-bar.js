import React, { useContext, useEffect, useState } from "react";
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
  const [userID, setUserID] = useState("");
  const [userRole, setUserRole] = useState([]);

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
          .then(({ data: { id, name, surname } }) => {
            setUserName(name + " " + surname);
            setUserID(id);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  useEffect(() => {
    if (userID !== "") {
      const cookies = new Cookies();
      const token = cookies.get("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        axios
          .get("http://46.41.142.44:8080/user/" + userID + "/roles", config)
          .then((response) => {
            const roles = [];

            if (Array.isArray(response.data) && !response.data.length) {
              roles.push("null");
            } else {
              response.data.forEach((element) => {
                roles.push(element.name);
              });
            }
            console.log(roles);
            setUserRole(roles);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, [userID]);

  const handleLogout = (event) => {
    const cookies = new Cookies();
    setUserName(contextInitialState);
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
                {userName}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/account">Account</Dropdown.Item>
                {userRole.includes("ADMIN") ||
                userRole.includes("DORMADMIN") ? (
                  <Dropdown.Item href="/dormAdminPanel">
                    Dorm Adminitrator's Panel
                  </Dropdown.Item>
                ) : (
                  <div></div>
                )}
                {userRole.includes("ADMIN") ? (
                  <Dropdown.Item href="/appAdminPanel">
                    App Adminitrator's Panel
                  </Dropdown.Item>
                ) : (
                  <div></div>
                )}

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
