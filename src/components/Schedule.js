import React, { useState, useEffect, useRef } from "react";
import DateFnsUtils from "@date-io/date-fns";
import "../CSS/components/schedule.css";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { nb } from "date-fns/locale";

const rstate = {
  FREE: 1,
  HOVER: 2,
  RESERVED: 3,
};

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

function Schedule() {
  const numOfHours = 15;
  const numOfDays = 5;
  const [reservationColor, setReservationColor] = useState(
    Array(numOfHours * numOfDays).fill("white")
  );
  const [reservationState, setReservationState] = useState(
    Array(numOfHours * numOfDays).fill(1)
  );
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  function handleClick(i) {
    const reservationColor2 = reservationColor.slice();
    const reservationState2 = reservationState.slice();
    switch (reservationState[i]) {
      case rstate.RESERVED:
        break;
      case rstate.FREE:
        reservationColor2[i] = "lightgray";
        setReservationColor(reservationColor2);
        reservationState2[i] = rstate.HOVER;
        setReservationState(reservationState2);
        break;
      case rstate.HOVER:
        reservationColor2[i] = "white";
        setReservationColor(reservationColor2);
        reservationState2[i] = rstate.FREE;
        setReservationState(reservationState2);
        break;
    }
  }

  function renderSquare(n) {
    return (
      <Square
        value={reservationColor[n]}
        onClick={() => handleClick(n)}
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
    for (var i = 0; i < numOfHours; i++) {
      result.push(<div class="row">{createHours(i)}</div>);
    }
    return result;
  }

  function generateHours() {
    var result = [];
    var startHour = 7;
    for (var i = 0; i < numOfHours; i++) {
      result.push(
        <div calss="row" className="hour">
          {startHour + i}:00
        </div>
      );
    }
    return result;
  }

  function placeDate(i) {
    var result = new Date(selectedDate);
    result.setDate(selectedDate.getDate() + i);

    return result.getDate() + "." + (result.getMonth() + 1);
  }

  function generateDays() {
    var result = [];
    for (var i = 0; i < 5; i++) {
      result.push(
        <div calss="col" className="date">
          {placeDate(i - 2)}
        </div>
      );
    }
    return result;
  }

  return (
    <div class="wrapper" className="schedule-box">
      <div class="row">
        <div class="col-1"></div>
        <div class="col">
          <div class="row">{generateDays()}</div>
        </div>
        <div class="col-2"></div>
      </div>
      <div class="row">
        <div class="col-1">{generateHours()}</div>
        <div class="col">{generateTable()}</div>
        <div class="col-2">
          <div class="row">
            <div class="col mx-auto">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  label="Date"
                  format="dd/MM/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>{" "}
            </div>
          </div>
          <div class="row" class="position-relative">
            <div class="col mx-auto">
              <button type="submit" name="Register" className="submit-button">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Schedule;
