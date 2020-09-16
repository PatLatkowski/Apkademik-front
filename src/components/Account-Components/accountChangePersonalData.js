import React, { useState } from "react";
import axios from "axios";
import Joi from "@hapi/joi";
import { useInput } from "../useInput";
import ErrorMessage from "../ErrorMessage";
import Cookies from "universal-cookie";

var schema = Joi.object().keys({
  email: Joi.string()
    .required()
    .allow("")
    .email({ tlds: { allow: ["com", "net", "pl"] } }),
  name: Joi.string()
    .regex(new RegExp("[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*"))
    .required()
    .allow(""),
  surname: Joi.string()
    .regex(new RegExp("[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*"))
    .required()
    .allow(""),
  dormNumber: Joi.number().required().allow(""),
  roomNumber: Joi.number().required().allow(""),
});

function AccountChangePersonalData(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const { value: email, bind: emailChange, reset: resetEmail } = useInput("");
  const { value: name, bind: nameChange, reset: resetName } = useInput("");
  const { value: surname, bind: surnameChange, reset: resetSurname } = useInput(
    ""
  );
  const { value: dormNum, bind: dormNumChange, reset: resetDormNum } = useInput(
    ""
  );
  const { value: roomNum, bind: roomNumChange, reset: resetRoomNum } = useInput(
    ""
  );
  const {
    value: password,
    bind: passwordChange,
    reset: resetPassword,
  } = useInput("");

  function sendRequest() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    let body = { oldPassword: password, user: {} };
    if (email !== "") body.user.email = email;
    if (name !== "") body.user.name = name;
    if (surname !== "") body.user.surname = surname;
    axios
      .put("http://46.41.142.44:8080/user", body, config)
      .then((response) => {
        console.log(response);
        props.refreshAccountDetails();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    schema.validate(
      {
        email: email,
        name: name,
        surname: surname,
        dormNumber: dormNum,
        roomNumber: roomNum,
      },
      (err, res) => {
        if (err) {
          setErrorMessage(err.details[0].message);
          console.log(err);
        } else {
          sendRequest();
        }
      }
    );
    resetPassword();
    resetEmail();
    resetName();
    resetSurname();
    resetDormNum();
    resetRoomNum();
  };

  return (
    <div className="elementContainer">
      <div className="w-100 section-header font-weight-bold">
        Change personal data <br /> (Require administrator's verification)
        <hr />
      </div>
      <div className="w-75 account-section">
        <form id="changePersonalData" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="password"
              id="Password"
              placeholder="Type your password"
              className="account-input"
              {...passwordChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="email"
              placeholder="Type new email"
              className="account-input"
              {...emailChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="name"
              placeholder="Type new name"
              className="account-input"
              {...nameChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="surname"
              placeholder="Type new surname"
              className="account-input"
              {...surnameChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="dromNum"
              placeholder="Type new drom number"
              className="account-input"
              {...dormNumChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="roomNum"
              placeholder="Type new room number"
              className="account-input"
              {...roomNumChange}
            />
          </div>
          <div class="form-group">
            <ErrorMessage text={errorMessage} />
          </div>
          <button type="submit" className="account-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default AccountChangePersonalData;
