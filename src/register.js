import ReactDOM from "react-dom";
import React from "react";
import logo from "./components/logo.png";
import "./register.css";

class Register extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="topBox">
          <div className="logo">
            <img src={logo} />
          </div>
          <div className="header">
            <h1>Create account</h1>
          </div>
        </div>
        <div className="bottomBox">
          <form>
            <input type="text" id="email" placeholder="Email" />
            <br />
            <br />
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="inputName"
            />
            <input
              type="text"
              id="surname"
              placeholder="Surname"
              className="inputSurname"
            />
            <br />
            <br />
            <input type="text" id="dormNumber" placeholder="Dorm number" />
            <br />
            <br />
            <input type="text" id="roomNumber" placeholder="Room number" />
            <br />
            <br />
            <input type="password" id="password" placeholder="Password" />
            <br />
            <br />
            <input
              type="text"
              id="confirmPassword"
              placeholder="Confirm password"
            />
            <br />
            <br />
            <input type="submit" value="Confirm" />
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
