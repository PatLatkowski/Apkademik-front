import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import "../CSS/components/schedule.css";
import MachinePicker from "./Schedule-Components/MachinePicker";
import FloorPicker from "./Schedule-Components/FloorPicker";
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
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
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

  const [currentDorm, setCurrentDorm] = useState(6);
  const [maxSlots, setMaxSlots] = useState(0);
  const [currentFloor, setCurrentFloor] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [currentMachine, setCurrentMachine] = useState("");
  const [machines, setMachines] = useState(Array(0));
  const [rooms, setRooms] = useState(Array(0));
  const [floors, setFloors] = useState(Array(0));
  const [roomType, setRoomType] = useState("");
  const [currentRoomType, setCurrentRoomType] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [validateHours, setValidateHours] = useState(Array(5).fill(0));
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [reservationColor, setReservationColor] = useState(
    Array(numOfHours * numOfDays).fill("white")
  );
  const [reservationState, setReservationState] = useState(
    Array(numOfHours * numOfDays).fill(1)
  );
  const [reservationSlots, setReservationSlots] = useState(
    Array(numOfHours * numOfDays).fill(0)
  );

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  const handleChangeMachine = (event) => {
    setCurrentMachine(event.target.value);
  };
  const handleChangeRoom = (event) => {
    setCurrentRoom(event.target.value);
  };
  const handleChangeFloor = (event) => {
    setCurrentFloor(event.target.value);
  };

  //selectedDate
  useEffect(() => {
    console.log(currentRoomType);
    switch (currentRoomType) {
      case "LAUNDRY":
        scheduleUpdateLaundry();
        break;
      case "GYM":
        scheduleUpdateGym();
        break;
    }
  }, [selectedDate]);
  //currentMachine
  useEffect(() => {
    scheduleUpdateLaundry();
  }, [currentMachine]);
  //
  useEffect(() => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("http://46.41.142.44:8080/user", options)
      .then((response) => {
        setCurrentDorm(6);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //currentDorm
  useEffect(() => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get("http://46.41.142.44:8080/dorm/" + currentDorm + "/floors", options)
      .then((response) => {
        //console.log(response.data);
        setFloors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentDorm]);
  //currentFloor
  useEffect(() => {
    if (currentFloor !== "") {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .get(
          "http://46.41.142.44:8080/floor/" + currentFloor + "/commonSpaces",
          options
        )
        .then((response) => {
          setCurrentRoom("");
          setCurrentMachine("");
          setMaxSlots(0);
          setReservationSlots(Array(numOfHours * numOfDays).fill(0));
          setRooms(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentFloor]);
  //currentRoom, maxSlots
  useEffect(() => {
    if (currentRoom != "") {
      console.log(true);
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .get("http://46.41.142.44:8080/commonSpace/" + currentRoom, options)
        .then((response) => {
          setRoomType(response.data.type);
          if (response.data.type === "GYM") {
            setMaxSlots(response.data.size);
            setMachines(Array(0));
            setCurrentMachine("");
            scheduleUpdateGym();
            setRoomType("GYM");
            setCurrentRoomType("GYM");
          }
          if (response.data.type === "LAUNDRY") {
            setCurrentMachine("");
            setValidateHours(Array(5).fill(0));
            setReservationColor(Array(numOfHours * numOfDays).fill("white"));
            setReservationState(Array(numOfHours * numOfDays).fill(1));
            setRoomType("LAUNDRY");
            setCurrentRoomType("LAUNDRY");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setCurrentMachine("");
      setValidateHours(Array(5).fill(0));
      setReservationColor(Array(numOfHours * numOfDays).fill("white"));
      setReservationState(Array(numOfHours * numOfDays).fill(1));
    }
  }, [currentRoom, maxSlots]);
  //roomType
  useEffect(() => {
    const reservationSlots2 = Array(numOfHours * numOfDays).fill(0);
    switch (roomType) {
      case "":
        break;
      case "LAUNDRY":
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .get(
            "http://46.41.142.44:8080/commonSpace/" +
              currentRoom +
              "/washingMachines",
            options
          )
          .then((response) => {
            setRoomType("");
            setMachines(response.data);
            setReservationSlots(reservationSlots2);
            setMaxSlots(1);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case "GYM":
        break;
    }
  }, [roomType]);

  function scheduleUpdateGym() {
    if (currentRoom !== "") {
      const optionsgym = {
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
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .get(
          "http://46.41.142.44:8080/commonSpace/" +
            currentRoom +
            "/commonSpaceReservations/fiveDays",
          optionsgym
        )
        .then((response) => {
          const reservationColor2 = Array(numOfHours * numOfDays).fill("white");
          const reservationState2 = Array(numOfHours * numOfDays).fill(1);
          const validateHours2 = Array(5).fill(0);
          const reservationSlots2 = Array(numOfHours * numOfDays).fill(0);
          var i = 0;
          response.data.forEach((element) => {
            element.reservations.forEach((e) => {
              if (e.mine) {
                validateHours2[i % numOfDays]++;
                reservationColor2[
                  i + (parseInt(e.start.substring(0, 2)) - 7) * 5
                ] = "#1e6e28";
                reservationState2[
                  i + (parseInt(e.start.substring(0, 2)) - 7) * 5
                ] = rstate.RESERVED;
              } else {
                if (e.reservationCounter == maxSlots) {
                  reservationColor2[
                    i + (parseInt(e.start.substring(0, 2)) - 7) * 5
                  ] = "gray";
                  reservationState2[
                    i + (parseInt(e.start.substring(0, 2)) - 7) * 5
                  ] = rstate.RESERVED;
                }
              }
              reservationSlots2[
                i + (parseInt(e.start.substring(0, 2)) - 7) * 5
              ] = e.reservationCounter;
            });
            i++;
          });
          setValidateHours(validateHours2);
          setReservationSlots(reservationSlots2);
          setReservationState(reservationState2);
          setReservationColor(reservationColor2);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function scheduleUpdateLaundry() {
    if (currentRoom !== "" && currentMachine !== "") {
      const reservationColor2 = Array(numOfHours * numOfDays).fill("white");
      const reservationState2 = Array(numOfHours * numOfDays).fill(1);
      const validateHours2 = Array(5).fill(0);
      const reservationSlots2 = Array(numOfHours * numOfDays).fill(0);

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
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get(
          "http://46.41.142.44:8080/washingMachine/" +
            currentMachine +
            "/washingReservations/fiveDays",
          options
        )
        .then((response) => {
          var i = 0;
          response.data.forEach((element) => {
            element.startingHours.forEach((e) => {
              reservationState2[
                i + (parseInt(e.startingHour.substring(0, 2)) - 7) * 5
              ] = rstate.RESERVED;
              reservationSlots2[
                i + (parseInt(e.startingHour.substring(0, 2)) - 7) * 5
              ] = 1;
              if (e.mine) {
                validateHours2[i % numOfDays]++;
                reservationColor2[
                  i + (parseInt(e.startingHour.substring(0, 2)) - 7) * 5
                ] = "#1e6e28";
              } else {
                reservationColor2[
                  i + (parseInt(e.startingHour.substring(0, 2)) - 7) * 5
                ] = "gray";
              }
            });
            i++;
          });
          setValidateHours(validateHours2);
          setReservationSlots(reservationSlots2);
          setReservationState(reservationState2);
          setReservationColor(reservationColor2);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleSubmit() {
    if (currentFloor !== "" && currentRoom !== "") {
      setErrorMessage("");
      const mydate = new Date(selectedDate);
      var op;
      var body = [];

      if (Math.max.apply(null, validateHours) > 3)
        setErrorMessage("You can reserve max 3 hour in single day");
      else {
        setErrorMessage("");

        var i = 0;
        reservationState.forEach((e) => {
          var dateOffset = 24 * 60 * 60 * 1000 * ((i % 5) - 2);
          mydate.setTime(selectedDate.getTime() + dateOffset);

          if (e == rstate.HOVER) {
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
            commonSpaceNumber: currentMachine,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      }
      if (currentRoomType === "LAUNDRY" && currentMachine !== "") {
        const options = op;
        const bd = {
          washingMachineId: currentMachine,
          washingReservations: body,
        };

        axios
          .post("http://46.41.142.44:8080/washingReservation", bd, options)
          .then((response) => {
            scheduleUpdateLaundry();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const options = op;
        const bd = {
          commonSpaceId: currentRoom,
          commonSpaceReservations: body,
        };

        axios
          .post("http://46.41.142.44:8080/commonSpaceReservation", bd, options)
          .then((response) => {
            scheduleUpdateGym();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      setErrorMessage(" You have to choose machine or common space");
    }
  }

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
    <div className="wrapper, schedule-box">
      <div className="row">
        <div className="col scroll">
          <ScheduleTable
            selectedDate={selectedDate}
            reservationColor={reservationColor}
            onClick={(n) => handleClick(n)}
            reservationSlots={reservationSlots}
            maxSlots={maxSlots}
          />
        </div>
        <div className="col-2 rightcol">
          <div className="row">
            <div className="col mx-auto">
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

          <div className="row">
            <div className="col mx-auto">
              <FloorPicker
                name="Floor"
                onChange={handleChangeFloor}
                items={floors}
                current={currentFloor}
              />
            </div>
            <div className="col mx-auto">
              <Roompicker
                name="Room"
                onChange={handleChangeRoom}
                items={rooms}
                current={currentRoom}
              />
            </div>
            <div className="col mx-auto">
              {Array.isArray(machines) && machines.length ? (
                <MachinePicker
                  name="Mashine"
                  onChange={handleChangeMachine}
                  room={currentRoom}
                  items={machines}
                  current={currentMachine}
                  rooms={rooms}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="row mx-auto p-3">
            <Message text={errorMessage} />
          </div>
          <div className="row, position-relative">
            <div className="col mx-auto">
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
