import React, { useState } from "react";
import axios from "axios";

function AccountDeleteAccount() {
  return (
    <div className="elementContainer">
      <div className="w-100 section-header font-weight-bold">
        Delete Account
        <hr />
      </div>
      <div className="w-75 account-section">
        <form id="deleteAccount">
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="Type password"
              className="account-input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              className="account-input"
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
