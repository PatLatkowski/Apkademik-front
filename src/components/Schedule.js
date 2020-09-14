import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import "../CSS/components/schedule.css";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const serverUrl = "http://46.41.142.44:8080";

const rstate = {
  FREE: 1,
  HOVER: 2,
  RESERVED: 3,
};
const numOfHours = 15;
const numOfDays = 5;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 80,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

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

function Stable(props) {
  const [res, setRes] = useState(null);

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

function Roompicker(props) {
  const classes = useStyles();

  function menuItems() {
    var result = [];

    props.items.forEach((element) => {
      result.push(<MenuItem value={element}>{element}</MenuItem>);
    });

    return result;
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{props.name}</InputLabel>
      <Select value={props.current} onChange={props.onChange}>
        {menuItems()}
      </Select>
    </FormControl>
  );
}

function Floorpicker(props) {
  const classes = useStyles();

  function menuItems() {
    var result = [];
    var curroom = [];
    for (var x = 0; x < props.rooms.length; x++) {
      if (props.rooms[x] === props.room) curroom = props.items[x];
    }

    console.log(curroom);

    curroom.forEach((element) => {
      result.push(<MenuItem value={element}>{element}</MenuItem>);
    });

    return result;
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{props.name}</InputLabel>
      <Select value={props.current} onChange={props.onChange}>
        {menuItems()}
      </Select>
    </FormControl>
  );
}

function Schedule() {
  const [currentRoom, setCurrentRoom] = useState(1);
  const [currentMachine, setCurrentMachine] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [validateHours, setValidateHours] = useState(Array(5).fill(0));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [machine, setMachine] = useState(Array(1).fill(""));
  const [rooms, setRooms] = useState(Array(1).fill(""));
  const [reservationColor, setReservationColor] = useState(
    Array(numOfHours * numOfDays).fill("white")
  );
  const [reservationState, setReservationState] = useState(
    Array(numOfHours * numOfDays).fill(1)
  );

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  useEffect(() => {
    const reservationColor2 = Array(numOfHours * numOfDays).fill("white");
    const reservationState2 = Array(numOfHours * numOfDays).fill(1);
    setStartParameters(reservationColor2, reservationState2);
  }, [selectedDate, currentMachine, currentRoom]);

  function setStartParameters(reservationColor2, reservationState2) {
    const options = {
      params: {
        date:
          selectedDate.getFullYear() +
          "-" +
          (selectedDate.getMonth() < 9
            ? "0" + (selectedDate.getMonth() + 1)
            : selectedDate.getMonth() + 1) +
          "-" +
          (selectedDate.getDate() < 9
            ? "0" + selectedDate.getDate()
            : selectedDate.getDate()),
      },
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjekB3cC5wbCIsImV4cCI6MTYwMDEwOTAwMiwiaWF0IjoxNjAwMDkxMDAyfQ.LiCXoKkZA4Utdn_jiSk4oh6d6N9Eaqcjxy5NLFWMBTU5tkFcpu2p4O4jlkdg9IY9XOgkKvQVFjXr6vwxl00vyA`,
      },
    };

    axios
      .get("http://46.41.142.44:8080/commonSpace/washingReservation", options)
      .then((response) => {
        //console.log(response.data);
        //console.log(response.data[0].washingMachines[0].washingReservations);
        var tempMachine = [];
        var tempRooms = [];
        console.log(response.data);
        for (var i = 1; i <= response.data.length; i++) {
          tempRooms.push(response.data[i - 1].number);
          var temp = [];
          for (
            var j = 1;
            j <= response.data[i - 1].washingMachines.length;
            j++
          ) {
            temp.push(j);
          }
          tempMachine.push(temp);
        }

        setMachine(tempMachine);
        setRooms(tempRooms);
        response.data[0].washingMachines[0].washingReservations.forEach(
          (element) => {
            console.log(element);
            console.log(parseInt(element.start.substring(0, 2))); //hour
            reservationColor2[parseInt(element.start.substring(0, 2)) - 7] =
              "gray";
            reservationState2[parseInt(element.start.substring(0, 2)) - 7] =
              rstate.RESERVED;
          }
        );
        setReservationState(reservationState2);
        setReservationColor(reservationColor2);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSubmit() {
    if (Math.max.apply(null, validateHours) > 3)
      setErrorMessage("You can reserve max 3 hour in single day");
    else setErrorMessage("");
  }

  const handleChangeFloor = (event) => {
    setCurrentMachine(event.target.value);
  };
  const handleChangeRoom = (event) => {
    setCurrentRoom(event.target.value);
  };

  function handleClick(i) {
    const reservationColor2 = reservationColor.slice();
    const reservationState2 = reservationState.slice();
    const validateHours2 = validateHours.slice();
    switch (reservationState[i]) {
      case rstate.RESERVED:
        break;
      case rstate.FREE:
        reservationColor2[i] = "#25e81f";
        setReservationColor(reservationColor2);
        reservationState2[i] = rstate.HOVER;
        setReservationState(reservationState2);
        validateHours2[i % numOfDays]++;
        setValidateHours(validateHours2);
        break;
      case rstate.HOVER:
        reservationColor2[i] = "white";
        setReservationColor(reservationColor2);
        reservationState2[i] = rstate.FREE;
        setReservationState(reservationState2);
        validateHours2[i % numOfDays]--;
        setValidateHours(validateHours2);
        break;
    }
  }

  function handleReservation() {
    axios.post(serverUrl + "/authenticate", {});
  }

  return (
    <div class="wrapper" className="schedule-box">
      <div class="row">
        <div class="col scroll">
          <Stable
            selectedDate={selectedDate}
            reservationColor={reservationColor}
            onClick={(n) => handleClick(n)}
          />
        </div>
        <div class="col-2 rightcol">
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

          <div class="row">
            <div class="col mx-auto">
              <Roompicker
                name="Room"
                onChange={handleChangeRoom}
                items={rooms}
                current={currentRoom}
              />
            </div>
            <div class="col mx-auto">
              <Floorpicker
                name="Mashine"
                onChange={handleChangeFloor}
                room={currentRoom}
                items={machine}
                current={currentMachine}
                rooms={rooms}
              />
            </div>
          </div>
          <div className="row mx-auto p-3">
            <ErrorMessage text={errorMessage} />
          </div>
          <div class="row" class="position-relative">
            <div class="col mx-auto">
              <button
                type="submit"
                name="Register"
                className="submit-button"
                onClick={handleSubmit}
              >
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
