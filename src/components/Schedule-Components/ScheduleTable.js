import React, { useEffect, useState } from "react";

import Square from "./Square";

function ScheduleTable(props) {
  const [res, setRes] = useState(null);

  const numOfHours = 15;
  const numOfDays = 5;

  function renderSquare(n) {
    return (
      <Square
        value={props.reservationColor[n]}
        onClick={() => props.onClick(n)}
        number={n}
      />
    );
  }

  function createHours(i) {
    var result = [];
    var n;
    for (var j = 0; j < numOfDays; j++) {
      n = j + i * numOfDays;
      result.push(renderSquare(n));
    }
    return result;
  }

  function generateTable() {
    var result = [];
    result.push(<div class="row sticky-top">{generateDays()}</div>);
    for (var i = 0; i < numOfHours; i++) {
      result.push(
        <div class="row">
          {generateHours(i)}
          {createHours(i)}
        </div>
      );
    }
    return result;
  }

  function generateHours(i) {
    var result = [];
    var startHour = 7;
    result.push(
      <div calss="col" className="hour">
        {startHour + i}:00
      </div>
    );
    return result;
  }

  function placeDate(i) {
    var result = new Date(props.selectedDate);
    result.setDate(props.selectedDate.getDate() + i);

    return result.getDate() + "." + (result.getMonth() + 1);
  }

  function generateDays() {
    var result = [];
    result.push(
      <div calss="col" className="hour">
        GMT{" "}
        {props.selectedDate.getTimezoneOffset() / 60 > 0
          ? "-" + props.selectedDate.getTimezoneOffset() / 60
          : "+" + (props.selectedDate.getTimezoneOffset() / 60) * -1}
      </div>
    );
    for (var i = 0; i < 5; i++) {
      result.push(
        <div calss="col" className="date">
          {placeDate(i - 2)}
        </div>
      );
    }
    return result;
  }

  return generateTable();
}
export default ScheduleTable;
