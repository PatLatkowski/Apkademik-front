import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./login";
import Register from "./register";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Router>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
