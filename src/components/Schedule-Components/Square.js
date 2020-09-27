import React from "react";

function Square(props) {
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
