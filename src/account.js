import React from "react";
import TopBar from "./components/top-bar";
import axios from "axios";
import Cookies from "universal-cookie";
import "./CSS/account.css";

function Account() {
  const userDataMock = {
    name: "Janek",
    surname: "Ururarer",
    email: "ururarer@gmail.com",
    password: "password",
    dormNum: "3",
    roomNum: "123",
  };

  function getAccountInfo() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    console.log(cookies);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      axios
        .get("http://46.41.142.44:8080/user", options)
        .then((response) => {
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

  return (
    <div className="container">
      <div className="row">
        <TopBar />
      </div>
      <div className="row m-2 justify-content-center">
        <div className=" w-50">
          {/* Account Data Section*/}
          <div className="w-100 section-header font-weight-bold">
            My Account
            <hr />
          </div>
          <div className="w-100">Email: {userDataMock.email}</div>
          <div className="w-100">Name: {userDataMock.name}</div>
          <div className="w-100">Surname: {userDataMock.surname}</div>
          <div className="w-100">Dorm Number: {userDataMock.dormNum}</div>
          <div className="w-100">Room Number: {userDataMock.roomNum}</div>

          {/* Change Password Section*/}
          <div className="w-100 section-header font-weight-bold">
            Change password
            <hr />
          </div>

          <div className="w-100 account-section">
            <form id="changePassword">
              <div className="form-group">
                <input
                  type="password"
                  id="oldPassword"
                  placeholder="Type old password"
                  className="account-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="newPassword"
                  placeholder="Type new password"
                  className="account-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="confirmNewPassword"
                  placeholder="Confirm new password"
                  className="account-input"
                />
              </div>
              <button
                type="submit"
                class="account-button"
                onClick={getAccountInfo()}
              >
                Submit
              </button>
            </form>
          </div>

          {/* Change Personal Data Section*/}
          <div className="w-100 section-header font-weight-bold">
            Change personal data <br /> (Require administrator's verification)
            <hr />
          </div>
          <div className="w-100 account-section">
            <form id="changePersonalData">
              <div className="form-group">
                <input
                  type="text"
                  id="email"
                  placeholder="Type new email"
                  className="account-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  placeholder="Type new name"
                  className="account-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="surname"
                  placeholder="Type new surname"
                  className="account-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="dromNum"
                  placeholder="Type new drom number"
                  className="account-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="roomNum"
                  placeholder="Type new room number"
                  className="account-input"
                />
              </div>
              <button type="submit" class="account-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Account;
