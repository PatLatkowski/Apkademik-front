import React, { useEffect, useState } from "react";

import Square from "./Square";

function ScheduleTable(props) {
  const numOfHours = 15;
  const numOfDays = 5;

  function renderSquare(n) {
    return (
      <Square
        key={n.toString()}
        value={props.reservationColor[n]}
        onClick={() => props.onClick(n)}
        number={n}
        reservationSlots={props.reservationSlots}
        maxSlots={props.maxSlots}
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
    result.push(
      <div key={"hourtop"} className="row sticky-top">
        {generateDays()}
      </div>
    );
    for (var i = 0; i < numOfHours; i++) {
      result.push(
        <div key={i} className="row">
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
      <div key={"hour" + startHour + i} className="col hour">
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
      <div key="GMT" className="col hour">
        GMT{" "}
        {props.selectedDate.getTimezoneOffset() / 60 > 0
          ? "-" + props.selectedDate.getTimezoneOffset() / 60
          : "+" + (props.selectedDate.getTimezoneOffset() / 60) * -1}
      </div>
    );
    for (var i = 0; i < 5; i++) {
      result.push(
        <div key={"date" + i} className="col, date">
          {placeDate(i - 2)}
        </div>
      );
    }
    return result;
  }

  return generateTable();
}
export default ScheduleTable;
