import ReactDOM from "react-dom";
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./CSS/index.css";
import Login from "./login";
import Register from "./register";
import MainPage from "./main-layout";
import Account from "./account";
import { checkIfTokenExists } from "./functions";
import AppAdminPanel from "./appAdminPanel";

const contextData = {
  userData: {
    user: "User Name",
  },
};

export const UserContext = createContext(contextData.userData);

function App() {
  const [userName, setUserName] = useState("User");
  function changeUserContextData(userName) {
    setUserName(userName);
  }

  return (
    <UserContext.Provider value={{ userName, changeUserContextData }}>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => {
              if (checkIfTokenExists()) {
                return <MainPage {...props} />;
              } else {
                return <Redirect to={"/login"} />;
              }
            }}
          />
          <Route
            path="/register"
            render={(props) => {
              if (checkIfTokenExists()) {
                return <Redirect to={"/"} />;
              } else {
                return <Register {...props} />;
              }
            }}
          />
          <Route
            path="/login"
            render={(props) => {
              if (checkIfTokenExists()) {
                return <Redirect to={"/"} />;
              } else {
                return <Login {...props} />;
              }
            }}
          />
          <Route
            path="/account"
            render={(props) => {
              if (checkIfTokenExists()) {
                return <Account {...props} />;
              } else {
                return <Redirect to={"/login"} />;
              }
            }}
          />
          <Route
            path="/appAdminPanel"
            render={(props) => {
              if (checkIfTokenExists()) {
                return <AppAdminPanel {...props} />;
              } else {
                return <Redirect to={"/login"} />;
              }
            }}
          />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
