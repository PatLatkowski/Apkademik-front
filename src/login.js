import React from "react";
import logo from "./components/logo.png";
import { Link } from "react-router-dom";
import "./login.css";

class Login extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="topBox">
          <div className="logo">
            <img src={logo} />
          </div>
          <div className="loginInput">
            <form id="form">
              <input type="text" id="login" placeholder="Login" />
              <br />
              <br />
              <input type="password" id="password" placeholder="Password" />
            </form>
          </div>
        </div>
        <div className="bottomBox">
          <button type="submit" name="Submit">
            Login
          </button>
          <br />
          <br />
          <Link to="/register">
            <button type="submit" name="Register">
              Register
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
export default Login;
