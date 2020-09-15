import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

function AccountDetails() {
  const [name, setName] = useState("null");
  const [surname, setSurname] = useState("null");
  const [email, setEmail] = useState("null");
  const [dormNum, setDormNum] = useState("1");
  const [roomNum, setRoomNum] = useState("1");

  function getAccountInfo() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      axios
        .get("http://46.41.142.44:8080/user", config)
        .then((response) => {
          setName(response.data.name);
          setSurname(response.data.surname);
          setEmail(response.data.email);
          setName(response.data.name);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      const {
        response: { data },
      } = e;
      console.log(e);
    }
  }

  getAccountInfo();

  return (
    <div className="elementContainer">
      <div className="w-100 section-header font-weight-bold">
        My Account
        <hr />
      </div>
      <div className="row account-data-section">
        <div className="col">
          <div className="w-100">Email:</div>
          <div className="w-100">Name:</div>
          <div className="w-100">Surname:</div>
          <div className="w-100">Dorm Number:</div>
          <div className="w-100">Room Number:</div>
        </div>
        <div className="col">
          <div className="w-100">{email}</div>
          <div className="w-100">{name}</div>
          <div className="w-100">{surname}</div>
          <div className="w-100">{dormNum}</div>
          <div className="w-100">{roomNum}</div>
        </div>
      </div>
    </div>
  );
}
export default AccountDetails;
