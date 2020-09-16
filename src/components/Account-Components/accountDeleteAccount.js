import React, { useState } from "react";
import axios from "axios";
import { useInput } from "../useInput";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

function AccountDeleteAccount() {
  const history = useHistory();
  const {
    value: password,
    bind: passwordChange,
    reset: resetPassword,
  } = useInput("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .put(
        "http://46.41.142.44:8080/user",
        {
          oldPassword: password,
          user: {},
        },
        config
      )
      .then((response) => {
        console.log(response);
        axios
          .delete("http://46.41.142.44:8080/user", config)
          .then((response) => {
            console.log(response);
            cookies.remove("token");
            history.push("/login");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="elementContainer">
      <div className="w-100 section-header font-weight-bold">
        Delete Account
        <hr />
      </div>
      <div className="w-75 account-section">
        <form id="deleteAccount" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="Type password"
              className="account-input"
              {...passwordChange}
            />
          </div>
          <button type="submit" className="account-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default AccountDeleteAccount;
