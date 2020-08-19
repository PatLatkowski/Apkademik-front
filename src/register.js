import React from "react";
import logo from "./components/logo.png";
import Joi from "@hapi/joi";
import axios from "axios";
import "./register.css";
import ErrorMessage from "./components/ErrorMessage";

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

const serverUrl = "http://46.41.142.44:8080";

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
    this.state = { errorMessage: "" };
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
        if (err) {
          this.setState({ errorMessage: err.details[0].message });
          console.log(err);
        } else {
          axios
            .post(serverUrl + "/register", {
              password: this.state.password,
              name: this.state.firstName,
              fullName: this.state.lastName,
              email: this.state.email,
            })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              if (error.request.status === 409)
                this.setState({ errorMessage: "User already exists" });
              console.log(error);
            });
          this.props.history.push("/login");
          console.log("Ok");
        }
      }
    );

    event.preventDefault();
  }

  render() {
    return (
      <div className="register-container">
        <div className="register-topBox">
          <div className="register-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="register-header">
            <h1 className="register-h1">Create account</h1>
          </div>
        </div>
        <div className="register-bottomBox">
          <form id="register" onSubmit={this.handleRegister}>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              className="register-input"
            />
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First name"
              onChange={this.handleChange}
              className="register-inputFirstName"
            />
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last name"
              onChange={this.handleChange}
              className="register-inputLastName"
            />
            <input
              type="text"
              id="dormNumber"
              name="dormNumber"
              placeholder="Dorm number"
              onChange={this.handleChange}
              className="register-input"
            />
            <input
              type="text"
              id="roomNumber"
              name="roomNumber"
              placeholder="Room number"
              onChange={this.handleChange}
              className="register-input"
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
              className="register-input"
            />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={this.handleChange}
              className="register-input"
            />
            <ErrorMessage text={this.state.errorMessage} />
            <input
              form="register"
              type="submit"
              name="Confirm"
              value="Confirm"
              className="register-input"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
