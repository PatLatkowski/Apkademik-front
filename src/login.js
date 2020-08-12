import React from "react";
import logo from "./components/logo.png";
import Joi from "@hapi/joi";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css";

var schema = Joi.object().keys({
  login: Joi.string()
    .required()
    .email({ tlds: { allow: ["com", "net", "pl"] } }), //FIXME: allow: false always returns error for some reason
  password: Joi.string().min(8).required(),
});

const serverUrl = "http://46.41.142.44:8080";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: "" };
    this.state = { password: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin(event) {
    schema.validate(
      {
        login: this.state.login,
        password: this.state.password,
      },
      (err, res) => {
        if (err) console.log(err);
        else {
          axios
          // Tymczasowo ustawione na sztywno
            .post(serverUrl + "/authenticate", {
              email: "czajnik98@wp.pl",
              password: "ala",
            })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
          console.log("Ok");
        }
      }
    );

    event.preventDefault();
  }

  render() {
    return (
      <div className="login-container">
        <img src={logo} alt="logo" className="login-img" />
        <form id="log" onSubmit={this.handleLogin} className="login-form">
          <div className="login-inputDiv">
            <input
              type="text"
              id="login"
              placeholder="Login"
              name="login"
              value={this.state.value}
              onChange={this.handleChange}
              className="login-input"
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={this.state.value}
              onChange={this.handleChange}
              className="login-input"
            />
          </div>
          <input
            form="log"
            type="submit"
            name="Submit"
            value="Submit"
            className="login-input"
          />
        </form>
        <Link to="/register">
          <button type="submit" name="Register" className="login-button">
            Register
          </button>
        </Link>
      </div>
    );
  }
}
export default Login;
