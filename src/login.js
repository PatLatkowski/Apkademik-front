import React from "react";
import logo from "./components/logo.png";
import Joi from "@hapi/joi";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CSS/login.css";
import ErrorMessage from "./components/ErrorMessage";
import Cookies from "universal-cookie";

const serverUrl = "http://46.41.142.44:8080";

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
            .post(serverUrl + "/authenticate", {
              email: this.state.login,
              password: this.state.password,
            })
            .then((response) => {
              const cookies = new Cookies();
              cookies.set("token", response.data["token"], { path: "/" });
              this.props.history.push("/");
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
      <div className="container login-container">
        <div className="row m-2">
          <div className="col-6">
            <img src={logo} alt="logo" className="rounded float-right" />
          </div>
          <div className="col-3 login-inputDiv">
            <form id="log" onSubmit={this.handleLogin}>
              <div className="row form-group">
                <input
                  type="text"
                  id="login"
                  placeholder="email"
                  name="login"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </div>
              <div className="row form-group">
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
            <div className="row">
              <ErrorMessage text={this.state.errorMessage} />
            </div>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-5 mx-auto">
            <input
              form="log"
              type="submit"
              name="Submit"
              value="Submit"
              className="login-input"
            />
          </div>
        </div>
        <div className="row form-group">
          <div className="col-5 mx-auto login-button">
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
