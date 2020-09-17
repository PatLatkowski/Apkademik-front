import React, { useEffect, useState } from "react";

function Square(props) {
  const [color, setColor] = useState(props.value);

  return (
    <div
      onClick={() => props.onClick()}
      class="col"
      className="schedule-button"
      style={{ background: props.value }}
    >
      {props.number}
    </div>
  );
}
export default Square;
