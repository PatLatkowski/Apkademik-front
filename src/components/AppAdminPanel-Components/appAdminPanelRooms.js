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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Message from "../Message";

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
  const [roomName, setroomName] = useState(0);
  const [roomSize, setroomSize] = useState(0);
  const [editRoomName, seteditRoomName] = useState(0);
  const [editRoomSize, seteditRoomSize] = useState(0);
  const [dorm, setdorm] = useState("");
  const [dormsArray, setdormsArray] = useState([]);
  const [floor, setfloor] = useState("");
  const [floorsArray, setfloorsArray] = useState([]);
  const [roomsArray, setroomsArray] = useState([]);
  const [deleteDialogOpen, setdeleteDialogOpen] = React.useState(false);
  const [selectedRoomToDelete, setselectedRoomToDelete] = useState("");
  const [editDialogOpen, seteditDialogOpen] = React.useState(false);
  const [selectedRoomToEdit, setselectedRoomToEdit] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(
        serverUrl + "/room",
        {
          floorId: floor.id,
          number: roomName,
          size: roomSize,
        },
        config
      )
      .then((response) => {
        setroomName();
        setroomSize();
        getRooms();
        setErrorMessage("");
      })
      .catch((error) => {
        if (error.request.status === 409)
          setErrorMessage("Room with given name already exists on this floor");
      });
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
    if (dorm) {
      console.log("dorm: " + dorm);
      const cookies = new Cookies();
      const token = cookies.get("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get(serverUrl + "/dorm/" + dorm + "/floors", config)
        .then((response) => {
          setfloorsArray(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function getRooms() {
    if (floor) {
      const cookies = new Cookies();
      const token = cookies.get("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get(serverUrl + "/floor/" + floor.id + "/rooms", config)
        .then((response) => {
          setroomsArray(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const deleteRecord = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .delete(serverUrl + "/room/" + selectedRoomToDelete.id, config)
      .then(() => {
        //TO DO: success message
      })
      .catch((error) => {
        console.log(error);
      });
    handleDeleteDialogClose();
    getRooms();
  };

  const handleDeleteDialogClose = () => {
    setdeleteDialogOpen(false);
  };

  const handleDeleteDialogClick = (row) => {
    setselectedRoomToDelete(row);
  };

  useEffect(() => {
    if (selectedRoomToDelete) setdeleteDialogOpen(true);
  }, [selectedRoomToDelete]);

  const editRecord = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .put(
        serverUrl + "/room/" + selectedRoomToEdit.id,
        {
          number: editRoomName,
          size: editRoomSize,
        },
        config
      )
      .then((response) => {
        getRooms();
      })
      .catch((error) => {
        console.log(error);
      });
    handleEditDialogClose();
  };

  const handleEditDialogClose = () => {
    seteditDialogOpen(false);
  };

  const handleEditDialogClick = (row) => {
    seteditRoomName(row.number);
    seteditRoomSize(row.size);
    setselectedRoomToEdit(row);
  };

  useEffect(() => {
    if (selectedRoomToEdit) seteditDialogOpen(true);
  }, [selectedRoomToEdit]);

  useEffect(() => {
    getDorms();
  }, []);

  useEffect(getFloors, [dorm]);

  useEffect(getRooms, [floor]);

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
                <MenuItem key={record.id} value={record}>
                  {record.number}
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

      <Message text={errorMessage} />

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete this record?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Item with this properties will be removed: <br />
            Floor ID: {selectedRoomToDelete.id} <br />
            Floor number: {selectedRoomToDelete.number} <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteRecord} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        className={classes.root}
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit record</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Record with ID: {selectedRoomToEdit.id} will be edited with these
            values:
          </DialogContentText>
          <TextField
            required
            id="room"
            value={editRoomName}
            label="Room name"
            onChange={(event) => seteditRoomName(event.target.value)}
          />
          <TextField
            required
            id="size"
            label="Room size"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => seteditRoomSize(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editRecord} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Id</TableCell>
            <TableCell align="left">Room Number</TableCell>
            <TableCell align="left">Room Size</TableCell>
            <TableCell align="left">Floor number</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roomsArray.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.number}</TableCell>
              <TableCell align="left">{row.size}</TableCell>
              <TableCell align="left">{floor.number}</TableCell>
              <TableCell align="center">
                <Button>
                  <EditIcon
                    onClick={() => handleEditDialogClick(row)}
                  ></EditIcon>
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button>
                  <DeleteIcon
                    onClick={() => handleDeleteDialogClick(row)}
                  ></DeleteIcon>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default AppAdminPanelRooms;
