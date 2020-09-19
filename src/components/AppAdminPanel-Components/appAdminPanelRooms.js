import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../../CSS/appAdminPanel.css";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import axios from "axios";
import Cookies from "universal-cookie";
import { serverUrl } from "../../consts";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "20ch",
    },
    "& .MuiButton-root": {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    width: "20ch",
  },
}));

function AppAdminPanelRooms(props) {
  const classes = useStyles();
  const [roomName, setroomName] = useState();
  const [roomSize, setroomSize] = useState();
  const [dorm, setdorm] = useState("");
  const [dormsArray, setdormsArray] = useState([]);
  const [floor, setfloor] = useState("");
  const [floorsArray, setfloorArrays] = useState([]);

  useEffect(() => {
    getDorms();
    getFloors();
  }, [dorm]);

  function handleSubmit(event) {
    event.preventDefault();
    console.log("data: " + roomName + " " + roomSize + " " + dorm);
  }

  function getDorms() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(serverUrl + "/dorms", config)
      .then((response) => {
        setdormsArray(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getFloors() {
    if (dorm !== "") {
      console.log("dorm is set");
    } else {
      console.log("dorm is not set");
    }
  }

  return (
    <div className="appAdminPanelFormContainer ">
      <form className={classes.root} onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <TextField
            required
            id="room"
            value={roomName}
            label="Room name"
            onChange={(event) => setroomName(event.target.value)}
          />
          <TextField
            required
            id="size"
            label="Room size"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => setroomSize(event.target.value)}
          />
          <FormControl required className={classes.formControl}>
            <InputLabel>Dorm</InputLabel>
            <Select
              value={dorm}
              onChange={(event) => {
                setdorm(event.target.value);
              }}
            >
              {dormsArray.map((record) => (
                <MenuItem key={record.id} value={record.id}>
                  {record.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required className={classes.formControl}>
            <InputLabel>Floor</InputLabel>
            <Select
              value={floor}
              onChange={(event) => {
                setfloor(event.target.value);
              }}
            >
              {floorsArray.map((record) => (
                <MenuItem key={record.id} value={record.id}>
                  {record.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" type="submit">
            {" "}
            Add new room
          </Button>
        </div>
      </form>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Room Number</TableCell>
            <TableCell>Room Size</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </div>
  );
}
export default AppAdminPanelRooms;
