import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Joi from "@hapi/joi";
import { useInput } from "../useInput";
import ErrorMessage from "../ErrorMessage";
import Cookies from "universal-cookie";
import { serverUrl } from "../../consts";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "20ch",
    },
    "& .MuiButton-root": {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    width: "20ch",
  },
}));
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
});

function AccountChangePersonalData(props) {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("");
  const { value: email, bind: emailChange, reset: resetEmail } = useInput("");
  const { value: name, bind: nameChange, reset: resetName } = useInput("");
  const { value: surname, bind: surnameChange, reset: resetSurname } = useInput(
    ""
  );
  const {
    value: password,
    bind: passwordChange,
    reset: resetPassword,
  } = useInput("");
  const [dorm, setdorm] = useState("");
  const [dormsArray, setdormsArray] = useState([]);
  const [floor, setfloor] = useState("");
  const [floorsArray, setfloorsArray] = useState([]);
  const [room, setroom] = useState("");
  const [roomsArray, setroomsArray] = useState([]);

  useEffect(() => {
    getDorms();
  }, []);

  useEffect(getFloors, [dorm]);

  useEffect(getRooms, [floor]);

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
    if (dorm !== "" && room !== "") {
      body.user.dormId = dorm.id;
      body.user.roomId = room.id;
    }
    axios
      .put("http://46.41.142.44:8080/user", body, config)
      .then((response) => {
        props.refreshAccountDetails();
        setroom("");
        setfloor("");
        setdorm("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getDorms() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(serverUrl + "/dorms", config)
      .then((response) => {
        setdormsArray(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getFloors() {
    if (dorm) {
      const cookies = new Cookies();
      const token = cookies.get("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get(serverUrl + "/dorm/" + dorm.id + "/floors", config)
        .then((response) => {
          setfloorsArray(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function getRooms() {
    if (floor) {
      const cookies = new Cookies();
      const token = cookies.get("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get(serverUrl + "/floor/" + floor.id + "/rooms", config)
        .then((response) => {
          setroomsArray(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    schema.validate(
      {
        email: email,
        name: name,
        surname: surname,
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
          <FormControl className={classes.formControl}>
            <InputLabel>Dorm</InputLabel>
            <Select
              value={dorm}
              onChange={(event) => {
                setdorm(event.target.value);
              }}
            >
              {dormsArray.map((record) => (
                <MenuItem key={record.id} value={record}>
                  {record.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Floor</InputLabel>
            <Select
              value={floor}
              onChange={(event) => {
                setfloor(event.target.value);
              }}
            >
              {floorsArray.map((record) => (
                <MenuItem key={record.id} value={record}>
                  {record.number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Room</InputLabel>
            <Select
              value={room}
              onChange={(event) => {
                setroom(event.target.value);
              }}
            >
              {roomsArray.map((record) => (
                <MenuItem key={record.id} value={record}>
                  {record.number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
