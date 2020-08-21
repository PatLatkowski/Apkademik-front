import React, { Component } from "react";

class ErrorMessage extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  componentDidUpdate(prevProps) {
    if (this.props.text !== prevProps.text) {
      this.setState({ text: this.props.text });
      this.render();
    }
  }

  formatMessage() {
    var result = this.state.text.replace(/"/g, "");

    for (var i = 0; i < result.length; i++) {
      if (result[i] === result[i].toUpperCase()) {
        result = result.replace(result[i], " " + result[i].toLowerCase());
        break;
      }
    }

    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
  }

  render() {
    if (this.state.text === "") return <div></div>;
    else return <div className="error-message">{this.formatMessage()}</div>;
  }
}

export default ErrorMessage;
