import React, { useState, useEffect } from "react";
import logo from "./components/logo.png";
import Joi from "@hapi/joi";
import axios from "axios";
import "./CSS/register.css";
import ErrorMessage from "./components/ErrorMessage";
import { Link, useHistory } from "react-router-dom";
import { serverUrl } from "./consts";

var schema = Joi.object().keys({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: ["com", "net", "pl"] } }), //FIXME: allow: false always returns error for some reason
  name: Joi.string()
    .regex(new RegExp("[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*"))
    .required(),
  surname: Joi.string()
    .regex(new RegExp("[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*"))
    .required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .options({ language: { any: { allowOnly: "must match password" } } }),
});

function Register() {
  let history = useHistory();
  const initialState = "";
  const [email, setemail] = useState(initialState);
  const [name, setname] = useState(initialState);
  const [surname, setsurname] = useState(initialState);
  const [password, setpassword] = useState(initialState);
  const [confirmPassword, setconfirmPassword] = useState(initialState);
  const [errorMessage, seterrorMessage] = useState(initialState);

  function handleRegister(event) {
    schema.validate(
      {
        email: email,
        name: name,
        surname: surname,
        password: password,
        confirmPassword: confirmPassword,
      },
      (err, res) => {
        if (err) {
          seterrorMessage(err.details[0].message);
          console.log(err);
        } else {
          axios
            .post(serverUrl + "/register", {
              password: password,
              name: name,
              surname: surname,
              email: email,
            })
            .then((response) => {
              console.log(response);
              history.push("/login");
              console.log("Ok");
            })
            .catch((error) => {
              if (error.request.status === 409)
                this.setState({ errorMessage: "User already exists" });
              console.log(error);
            });
        }
      }
    );

    event.preventDefault();
  }

  return (
    <div class="conteiner register-container">
      <div class="row m-2">
        <div class="col-6">
          <Link to="/">
            <img src={logo} alt="logo" class="rounded float-right" />
          </Link>
        </div>
        <div class="col-6">
          <h1 class="font-weight-bold register-header">Register</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-6 mx-auto">
          <form id="register" onSubmit={handleRegister}>
            <div class="form-group">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                onChange={(event) => setemail(event.target.value)}
                className="register-input"
              />
            </div>
            <div class="form-row">
              <div class="form-group col">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="First name"
                  onChange={(event) => setname(event.target.value)}
                  className="register-input"
                />
              </div>
              <div class="form-group col">
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  placeholder="Last name"
                  onChange={(event) => setsurname(event.target.value)}
                  className="register-input"
                />
              </div>
            </div>
            <div class="form-group">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={(event) => setpassword(event.target.value)}
                className="register-input"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={(event) => setconfirmPassword(event.target.value)}
                className="register-input"
              />
            </div>
            <div class="form-group">
              <ErrorMessage text={errorMessage} />
            </div>
            <div class="form-group">
              <input
                form="register"
                type="submit"
                name="Confirm"
                value="Confirm"
                className="register-input"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
