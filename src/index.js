import ReactDOM from 'react-dom';
import React from 'react';
import logo from "./components/logo.png";
import './index.css';

class App extends React.Component{

  render(){
    return(
      <div className="container">
        <div className="topBox">
          <div className="logo">
            <img src={logo}/>
          </div>
          <div className="loginInput">
            <form>
              <input type="text" id="login" value="Login"/><br/>
              <input type="text" id="password" value="Password"/>
            </form>
          </div>
        </div>
        <div className="botBox">
          Bottom
        </div>
      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));