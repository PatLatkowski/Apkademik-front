import React, { useEffect, useState } from "react";

function Square(props) {
  const [color, setColor] = useState(props.value);

  return (
    <div
      key={"Square" + props.number.toString()}
      onClick={() => props.onClick()}
      className="col schedule-button"
      style={{ background: props.value }}
    >
      {props.reservationSlots[props.number]}/{props.maxSlots}
    </div>
  );
}
export default Square;
