import ReactDOM from "react-dom";
import React from "react";
import logo from "./components/logo.png";
import Joi from "@hapi/joi";
import "./register.css";

var schema = Joi.object().keys({
  email: Joi.string()
    .required()
    .email({ tlds: { allow: ["com", "net", "pl"] } }), //FIXME: allow: false always returns error for some reason
  firstName: Joi.string()
    .regex(new RegExp("[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*"))
    .required(),
  lastName: Joi.string()
    .regex(new RegExp("[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*"))
    .required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .options({ language: { any: { allowOnly: "must match password" } } }),
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "" };
    this.state = { firstName: "" };
    this.state = { lastName: "" };
    this.state = { dormNumber: "" };
    this.state = { roomNumber: "" };
    this.state = { password: "" };
    this.state = { confirmPassword: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleRegister(event) {
    schema.validate(
      {
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
      },
      (err, res) => {
        if (err) console.log(err);
        else console.log("Ok");
      }
    );
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className="topBox">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="header">
            <h1>Create account</h1>
          </div>
        </div>
        <div className="bottomBox">
          <form id="register" onSubmit={this.handleRegister}>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="FirstName"
              className="inputFirstName"
              onChange={this.handleChange}
            />
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="LastName"
              className="inputLastName"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              id="dormNumber"
              name="dormNumber"
              placeholder="Dorm number"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              id="roomNumber"
              name="roomNumber"
              placeholder="Room number"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <input
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <input
              form="register"
              type="submit"
              name="Confirm"
              value="Confirm"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
