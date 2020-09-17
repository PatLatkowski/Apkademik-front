import React, { useEffect, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import "../CSS/components/schedule.css";
import MachinePicker from "./Schedule-Components/MachinePicker";
import Roompicker from "./Schedule-Components/Roompicker";
import ScheduleTable from "./Schedule-Components/ScheduleTable";
import axios from "axios";
import Message from "./Message";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Cookies from "universal-cookie";

import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";

import { findAllByTestId } from "@testing-library/react";

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

function Schedule() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

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
    scheduleUpdate();
  }, [selectedDate, currentMachine, currentRoom]);

  useEffect(() => {
    setStartParameters();
  }, []);

  function setStartParameters() {
    const options = {
      params: {
        date:
          selectedDate.getFullYear() +
          "-" +
          (selectedDate.getMonth() < 9
            ? "0" + (selectedDate.getMonth() + 1)
            : selectedDate.getMonth() + 1) +
          "-" +
          (selectedDate.getDate() < 10
            ? "0" + selectedDate.getDate()
            : selectedDate.getDate()),
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("http://46.41.142.44:8080/commonSpace/washingReservations", options)
      .then((response) => {
        var tempMachine = [];
        var tempRooms = [];
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
        setCurrentRoom(tempRooms[0]);
        setCurrentMachine(tempMachine[0][0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function scheduleUpdate() {
    const reservationColor2 = Array(numOfHours * numOfDays).fill("white");
    const reservationState2 = Array(numOfHours * numOfDays).fill(1);
    const validateHours2 = Array(5).fill(0);
    const options = {
      params: {
        commonSpaceNumber: currentRoom,
        date:
          selectedDate.getFullYear() +
          "-" +
          (selectedDate.getMonth() < 9
            ? "0" + (selectedDate.getMonth() + 1)
            : selectedDate.getMonth() + 1) +
          "-" +
          (selectedDate.getDate() < 10
            ? "0" + selectedDate.getDate()
            : selectedDate.getDate()),
        washingMachineNumber: currentMachine,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(
        "http://46.41.142.44:8080/commonSpace/washingReservations/fiveDays",
        options
      )
      .then((response) => {
        var i = 0;
        response.data.forEach((element) => {
          element.startingHours.forEach((e) => {
            reservationColor2[i + (parseInt(e.substring(0, 2)) - 7) * 5] =
              "gray";
            reservationState2[i + (parseInt(e.substring(0, 2)) - 7) * 5] =
              rstate.RESERVED;
            validateHours2[i % numOfDays]++;
          });
          i++;
        });
        setValidateHours(validateHours2);
        setReservationState(reservationState2);
        setReservationColor(reservationColor2);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSubmit() {
    const mydate = new Date(selectedDate);
    var op;
    var body = [];
    //return result.getDate() + "." + (result.getMonth() + 1);

    if (Math.max.apply(null, validateHours) > 3)
      setErrorMessage("You can reserve max 3 hour in single day");
    else {
      setErrorMessage("");

      var i = 0;
      reservationState.forEach((e) => {
        var dateOffset = 24 * 60 * 60 * 1000 * ((i % 5) - 2);
        mydate.setTime(selectedDate.getTime() + dateOffset);

        if (e == rstate.HOVER) {
          console.log((i % 5) - 2);
          console.log(mydate);
          body.push({
            date:
              mydate.getFullYear() +
              "-" +
              (mydate.getMonth() < 9
                ? "0" + (mydate.getMonth() + 1)
                : mydate.getMonth() + 1) +
              "-" +
              (mydate.getDate() < 10
                ? "0" + mydate.getDate()
                : mydate.getDate()),
            end:
              7 + Math.floor(i / 5) + 1 < 10
                ? "0" + (7 + Math.floor(i / 5) + 1) + ":00"
                : 7 + Math.floor(i / 5) + 1 + ":00",
            id: 0,
            start:
              7 + Math.floor(i / 5) < 10
                ? "0" + (7 + Math.floor(i / 5)) + ":00"
                : 7 + Math.floor(i / 5) + ":00",
            status: "OK",
          });
        }
        i++;
      });

      op = {
        params: {
          commonSpaceNumber: currentRoom,
          washingMachineNumber: currentMachine,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
    const options = op;
    const bd = body;

    console.log(bd);

    axios
      .post("http://46.41.142.44:8080/washingReservation", bd, options)
      .then((response) => {
        scheduleUpdate();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
        validateHours2[i % numOfDays]++;
        setValidateHours(validateHours2);
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

  return (
    <div class="wrapper" className="schedule-box">
      <div class="row">
        <div class="col scroll">
          <ScheduleTable
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
              <MachinePicker
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
            <Message text={errorMessage} />
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
