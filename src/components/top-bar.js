import ReactDOM from "react-dom";
import React from "react";

import "../CSS/components/top-bar.css";

class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="container">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </div>
    );
  }
}
export default TopBar;
