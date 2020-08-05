import React from "react";
import logo from "./components/logo.png";
import Joi from '@hapi/joi';
import { Link } from "react-router-dom";
import "./login.css";

var schema = Joi.object().keys({
  login: Joi.string().required().email({ tlds: { allow: ['com', 'net', 'pl'] } }), //FIXME: allow: false always returns error for some reason
  password: Joi.string().min(8).required()
});


class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {login: ''};
    this.state = {password: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event) {    
    this.setState({[event.target.name]: event.target.value}); 
   }

  handleLogin(event){
    schema.validate({login: this.state.login, password: this.state.password}, (err, res) =>{
      if(err)
        console.log(err);
      else
        console.log('Ok');
    })
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className="topBox">
          <div className="logo">
            <img src={logo} alt="logo"/>
          </div>
          <div className="loginInput">
            <form id="log" onSubmit={this.handleLogin}>
              <input type="text" id="login" placeholder="Login" name="login" value={this.state.value} onChange={this.handleChange}/>
              <br />
              <br />
              <input type="password" id="password" placeholder="Password" name="password" value={this.state.value} onChange={this.handleChange}/>
            </form>
          </div>
        </div>
        <div className="bottomBox">
          <button form='log' type="submit" name="Submit">
            Login
          </button>
          <br />
          <br />
          <Link to="/register">
            <button type="submit" name="Register">
              Register
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
export default Login;
