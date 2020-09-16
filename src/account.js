import React, { useState, useRef } from "react";
import TopBar from "./components/top-bar";
import axios from "axios";
import Cookies from "universal-cookie";
import "./CSS/account.css";

import AccountDetails from "./components/Account-Components/accountDetails";
import AccountChangePassword from "./components/Account-Components/accountChangePassword";
import AccountChangePersonalData from "./components/Account-Components/accountChangePersonalData";
import AccountDeleteAccount from "./components/Account-Components/accountDeleteAccount";

function Account() {
  const childRef = useRef();
  function refreshAccountDetails() {
    childRef.current.refreshData();
  }

  return (
    <div className="container">
      <div className="row">
        <TopBar />
      </div>
      <div className="row m-2 justify-content-center">
        <div className=" w-50">
          <AccountDetails ref={childRef} />
          <AccountChangePassword />
          <AccountChangePersonalData
            refreshAccountDetails={refreshAccountDetails}
          />
          <AccountDeleteAccount />
        </div>
      </div>
    </div>
  );
}
export default Account;
