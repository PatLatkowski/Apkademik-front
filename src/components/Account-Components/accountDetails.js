import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { serverUrl } from "../../consts";

const AccountDetails = forwardRef((props, ref) => {
  const [name, setName] = useState("null");
  const [surname, setSurname] = useState("null");
  const [email, setEmail] = useState("null");
  const [dormNum, setDormNum] = useState("0");
  const [roomNum, setRoomNum] = useState("0");

  useImperativeHandle(ref, () => ({
    refreshData() {
      getAccountInfo();
      getUserDorm();
      getUserRoom();
    },
  }));

  function getAccountInfo() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      axios
        .get(serverUrl + "/user", config)
        .then((response) => {
          setName(response.data.name);
          setSurname(response.data.surname);
          setEmail(response.data.email);
          setName(response.data.name);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }

  function getUserDorm() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      axios
        .get(serverUrl + "/dorm", config)
        .then((response) => {
          console.log(response);
          setDormNum(response.data.name);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }

  function getUserRoom() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      axios
        .get(serverUrl + "/room", config)
        .then((response) => {
          console.log(response);
          setRoomNum(response.data.number);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getAccountInfo();
    getUserDorm();
    getUserRoom();
  }, []);

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
          <div className="w-100">Dorm Name:</div>
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
});
export default AccountDetails;
