import React, { useState } from "react";
import axios from "axios";
import Joi from "@hapi/joi";
import { useInput } from "../useInput";
import Message from "../Message";

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

function AccountChangePersonalData() {
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
        }
      }
    );
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
            <Message text={errorMessage} />
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
