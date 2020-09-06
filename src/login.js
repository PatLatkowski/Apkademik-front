import React, { useState } from "react";
import logo from "./components/logo.png";
import Joi from "@hapi/joi";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CSS/login.css";
import ErrorMessage from "./components/ErrorMessage";
import Cookies from "universal-cookie";

const serverUrl = "http://localhost:8080";

var schema = Joi.object().keys({
  login: Joi.string()
    .required()
    .email({ tlds: { allow: ["com", "net", "pl"] } }), //FIXME: allow: false always returns error for some reason
  password: Joi.string().min(8).required(),
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: "" };
    this.state = { password: "" };
    this.state = { errorMessage: "" };
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
        if (err) {
          this.setState({ errorMessage: err.details[0].message });
          console.log(err);
        } else {
          axios
            // Tymczasowo ustawione na sztywno
            .post(serverUrl + "/authenticate", {
              email: this.state.login,
              password: this.state.password,
            })
            .then((response) => {
              const cookies = new Cookies();
              cookies.set("token", response.data, { path: "/" });
              this.props.history.push("/main-page");
            })
            .catch((error) => {
              if (error.request.status === 401)
                this.setState({ errorMessage: "Incorrect email or password" });
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
      <div class="container login-container">
        <div class="row m-2">
          <div class="col-6">
            <img src={logo} alt="logo" class="rounded float-right" />
          </div>
          <div class="col-3 login-inputDiv">
            <form id="log" onSubmit={this.handleLogin}>
              <div class="row form-group">
                <input
                  type="email"
                  id="login"
                  placeholder="email"
                  name="login"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </div>
              <div class="row form-group">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </div>
            </form>
            <div class="row">
              <ErrorMessage text={this.state.errorMessage} />
            </div>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-5 mx-auto">
            <input
              form="log"
              type="submit"
              name="Submit"
              value="Submit"
              className="login-input"
            />
          </div>
        </div>
        <div class="row form-group">
          <div class="col-5 mx-auto login-button">
            <Link to="/register">
              <button type="submit" name="Register">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
