import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./CSS/index.css";
import Login from "./login";
import Register from "./register";
import MainPage from "./main-layout";
import Account from "./account";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/main-page" component={MainPage} />
          <Route path="/account" component={Account} />
        </Switch>
      </Router>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
