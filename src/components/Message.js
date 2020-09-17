import React, { useState } from "react";
import "../CSS/components/message.css";

function Message(props) {
  const [text, setText] = useState("");

  function formatMessage() {
    var result = props.text.replace(/"/g, "");

    for (var i = 0; i < result.length; i++) {
      if (result[i] === result[i].toUpperCase()) {
        result = result.replace(result[i], " " + result[i].toLowerCase());
        break;
      }
    }

    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
  }

  if (props.text === "") return <div></div>;
  else {
    if (props.type === "success")
      return <div className="success-message">{formatMessage()}</div>;
    else return <div className="error-message">{formatMessage()}</div>;
  }
}

export default Message;
