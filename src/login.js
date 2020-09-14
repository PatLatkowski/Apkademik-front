import React, { useState } from "react";
import logo from "./components/logo.png";
import Joi from "@hapi/joi";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./CSS/login.css";
import ErrorMessage from "./components/ErrorMessage";
import Cookies from "universal-cookie";
import { UserContext } from "./index";
import { useInput } from "./components/useInput";

const serverUrl = "http://46.41.142.44:8080";

var schema = Joi.object().keys({
  login: Joi.string()
    .required()
    .email({ tlds: { allow: ["com", "net", "pl"] } }), //FIXME: allow: false always returns error for some reason
  password: Joi.string().min(8).required(),
});

function Login(props) {
  let history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const { value: login, bind: loginChange, reset: resetLogin } = useInput("");
  const {
    value: password,
    bind: passwordChange,
    reset: resetPassword,
  } = useInput("");

  const handleLogin = (event) => {
    event.preventDefault();
    schema.validate(
      {
        login: login,
        password: password,
      },
      (err, res) => {
        if (err) {
          setErrorMessage(err.details[0].message);
          console.log(err);
        } else {
          axios
            .post(serverUrl + "/authenticate", {
              email: login,
              password: password,
            })
            .then((response) => {
              const cookies = new Cookies();
              cookies.set("token", response.data["token"], { path: "/" });
              console.log(cookies);
              history.push("/");
            })
            .catch((error) => {
              if (error.request.status === 401)
                setErrorMessage("Incorrect email or password");
              console.log(error);
            });
          console.log("Ok");
        }
      }
    );
    resetLogin();
    resetPassword();
  };

  return (
    <div className="container login-container">
      <div className="row m-2">
        <div className="col-6">
          <img src={logo} alt="logo" className="rounded float-right" />
        </div>
        <div className="col-3 login-inputDiv">
          <form id="log" onSubmit={handleLogin}>
            <div className="row form-group">
              <input
                type="text"
                id="login"
                placeholder="email"
                name="login"
                {...loginChange}
              />
            </div>
            <div className="row form-group">
              <input
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                {...passwordChange}
              />
            </div>
          </form>
          <div className="row">
            <ErrorMessage text={errorMessage} />
          </div>
        </div>
      </div>
      <div className="row form-group">
        <div className="col-5 mx-auto">
          <button type="submit" form="log" className="login-input">
            Submit
          </button>
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

export default Login;
