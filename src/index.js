import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";

import Login from "./login";
import Register from "./register";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    );
  }
  
}
ReactDOM.render(<App />, document.getElementById("root"));
