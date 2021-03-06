import React, { useState } from "react";
import axios from "axios";
import Joi from "@hapi/joi";
import { useInput } from "../useInput";
import Message from "../Message";
import Cookies from "universal-cookie";

var passwordSchema = Joi.object().keys({
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .options({ language: { any: { allowOnly: "must match password" } } }),
});

function AccountChangePassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  const {
    value: oldPassword,
    bind: oldPasswordChange,
    reset: resetOldPassword,
  } = useInput("");
  const {
    value: newPassword,
    bind: newPasswordChange,
    reset: resetNewPassword,
  } = useInput("");
  const {
    value: confirmNewPassword,
    bind: confirmNewPasswordChange,
    reset: resetConfirmNewPassword,
  } = useInput("");

  const handleSubmit = (event) => {
    event.preventDefault();
    passwordSchema.validate(
      {
        password: newPassword,
        confirmPassword: confirmNewPassword,
      },
      (err, res) => {
        if (err) {
          setErrorMessage(err.details[0].message);
          setsuccessMessage("");
          console.log(err);
        } else {
          setErrorMessage("");
          sendRequest();
        }
      }
    );
    resetOldPassword();
    resetNewPassword();
    resetConfirmNewPassword();
  };

  function sendRequest() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .put(
        "http://46.41.142.44:8080/user",
        {
          oldPassword: oldPassword,
          user: {
            password: newPassword,
          },
        },
        config
      )
      .then((response) => {
        setsuccessMessage("Your password has been changed");
      })
      .catch((error) => {
        if (error.request.status === 401) setErrorMessage("Wrong password");
      });
  }

  return (
    <div className="elementContainer">
      <div className="w-100 section-header font-weight-bold">
        Change password
        <hr />
      </div>

      <div className="w-75 account-section">
        <form id="changePassword" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="password"
              id="oldPassword"
              placeholder="Type old password"
              className="account-input"
              {...oldPasswordChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="newPassword"
              placeholder="Type new password"
              className="account-input"
              {...newPasswordChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="confirmNewPassword"
              placeholder="Confirm new password"
              className="account-input"
              {...confirmNewPasswordChange}
            />
          </div>
          <div className="form-group">
            <Message text={errorMessage} />
            <Message text={successMessage} type="success" />
          </div>
          <button type="submit" className="account-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default AccountChangePassword;
