import ReactDOM from 'react-dom';
import React from 'react';
import logo from "./components/logo.png";
import Joi from '@hapi/joi';
import './index.css';

var schema = Joi.object().keys({
  login: Joi.string().required().email({ tlds: { allow: false } }),
  password: Joi.string().min(8).required()
});

class App extends React.Component{

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
    schema.validate({login: this.state.login}, function(err, res){
      if(err)
        console.log('Bad mail');
      else
        console.log('Ok mail');
    }

    )
    //alert(this.state.login +' '+ this.state.password);
    event.preventDefault();
  }

  render(){
    return(
      <div className="container">
        <div className="topBox">
          <div className="logo">
            <img src={logo} alt="logo"/>
          </div>
          <div className="loginInput">
            <form id='log' onSubmit={this.handleLogin}>
              <input type="text" name="login" id="login" value={this.state.value} onChange={this.handleChange} /><br/>
              <input type="password" name="password" id="password" value={this.state.value} onChange={this.handleChange}/>
            </form>
          </div>
        </div>
        <div className="botBox">
          <button form='log' type="submit">Login</button>
          <button>Register</button>
        </div>
      </div>

    );
  }
  
}

ReactDOM.render(<App />, document.getElementById('root'));