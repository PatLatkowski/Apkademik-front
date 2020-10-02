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
import "../../CSS/appAdminPanel.css";
import Message from "../Message";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    "& .MuiButton-root": {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    width: "25ch",
  },
}));

export default function AppAdminPanelWashingMachines(props) {
  const classes = useStyles();
  const initialState = "";
  const [washingMachineNumber, setwashingMachineNumber] = useState(
    initialState
  );
  const [washingMachineStatus, setwashingMachineStatus] = useState(
    initialState
  );
  const [editWashingMachineNumber, seteditWashingMachineNumber] = useState(
    initialState
  );
  const [editWashingMachineStatus, seteditWashingMachineStatus] = useState(
    initialState
  );
  const [dorm, setdorm] = useState(initialState);
  const [dormsArray, setdormsArray] = useState([]);
  const [floor, setfloor] = useState(initialState);
  const [floorsArray, setfloorsArray] = useState([]);
  const [commonSpace, setcommonSpace] = useState(initialState);
  const [commonSpacesArray, setcommonSpacesArray] = useState([]);
  const [washingMachinesArray, setwashingMachinesArray] = useState([]);
  const [deleteDialogOpen, setdeleteDialogOpen] = React.useState(false);
  const [
    selectedWashingMachineToDelete,
    setselectedWashingMachineToDelete,
  ] = useState(initialState);
  const [editDialogOpen, seteditDialogOpen] = React.useState(false);
  const [
    selectedWashingMachineToEdit,
    setselectedWashingMachineToEdit,
  ] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");

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

  function getCommonSpaces() {
    if (floor) {
      const cookies = new Cookies();
      const token = cookies.get("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get(serverUrl + "/floor/" + floor.id + "/commonSpaces", config)
        .then((response) => {
          setcommonSpacesArray(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function getWashingMachines() {
    if (commonSpace) {
      const cookies = new Cookies();
      const token = cookies.get("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get(
          serverUrl + "/commonSpace/" + commonSpace.id + "/washingMachines",
          config
        )
        .then((response) => {
          setwashingMachinesArray(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    getDorms();
  }, []);

  useEffect(getFloors, [dorm]);

  useEffect(getCommonSpaces, [floor]);

  useEffect(getWashingMachines, [commonSpace]);

  function handleSubmit(event) {
    event.preventDefault();
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(
        serverUrl + "/washingMachine",
        {
          commonSpaceId: commonSpace.id,
          number: washingMachineNumber,
          status: washingMachineStatus,
        },
        config
      )
      .then((response) => {
        setwashingMachineNumber();
        setwashingMachineStatus(initialState);
        getWashingMachines();
        setErrorMessage("");
      })
      .catch((error) => {
        if (error.request.status === 409)
          setErrorMessage(
            "Washing Machine with given number already exists in this common space"
          );
      });
  }

  const deleteRecord = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .delete(
        serverUrl + "/washingMachine/" + selectedWashingMachineToDelete.id,
        config
      )
      .then(() => {
        getWashingMachines();
      })
      .catch((error) => {
        console.log(error);
      });
    handleDeleteDialogClose();
  };

  const handleDeleteDialogClose = () => {
    setdeleteDialogOpen(false);
  };

  const handleDeleteDialogClick = (row) => {
    setselectedWashingMachineToDelete(row);
  };

  useEffect(() => {
    if (selectedWashingMachineToDelete) setdeleteDialogOpen(true);
  }, [selectedWashingMachineToDelete]);

  const editRecord = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .put(
        serverUrl + "/washingMachine/" + selectedWashingMachineToEdit.id,
        {
          number: editWashingMachineNumber,
          status: editWashingMachineStatus,
        },
        config
      )
      .then((response) => {
        getWashingMachines();
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
    seteditWashingMachineNumber(row.number);
    seteditWashingMachineStatus(row.status);
    setselectedWashingMachineToEdit(row);
  };

  useEffect(() => {
    if (selectedWashingMachineToEdit) seteditDialogOpen(true);
  }, [selectedWashingMachineToEdit]);

  return (
    <div className="appAdminPanelFormContainer ">
      <form className={classes.root} onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <TextField
            required
            id="number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => setwashingMachineNumber(event.target.value)}
          />
          <FormControl required className={classes.formControl}>
            <InputLabel>Status</InputLabel>
            <Select
              value={washingMachineStatus}
              onChange={(event) => {
                setwashingMachineStatus(event.target.value);
              }}
            >
              <MenuItem value={"FREE"}>FREE</MenuItem>
              <MenuItem value={"NOTWORKING"}>NOTWORKING</MenuItem>
            </Select>
          </FormControl>
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
          <FormControl required className={classes.formControl}>
            <InputLabel>Common Space</InputLabel>
            <Select
              value={commonSpace}
              onChange={(event) => {
                setcommonSpace(event.target.value);
              }}
            >
              {commonSpacesArray.map((record) => (
                <MenuItem key={record.id} value={record}>
                  {record.number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" type="submit">
            {" "}
            Add new Washing Machine
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
            Washing Machine ID: {selectedWashingMachineToDelete.id} <br />
            Washing Machine Number: {selectedWashingMachineToDelete.number}{" "}
            <br />
            Washing Machine Status: {selectedWashingMachineToDelete.status}{" "}
            <br />
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
          <div className="row">
            <DialogContentText>
              Record with ID: {selectedWashingMachineToEdit.id} will be edited
              with these values:
            </DialogContentText>
          </div>
          <div className="row">
            <TextField
              required
              id="number"
              label="Number"
              type="number"
              value={editWashingMachineNumber}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) =>
                seteditWashingMachineNumber(event.target.value)
              }
            />
          </div>
          <div className="row">
            <FormControl required className={classes.formControl}>
              <InputLabel>Status</InputLabel>
              <Select
                value={editWashingMachineStatus}
                onChange={(event) => {
                  seteditWashingMachineStatus(event.target.value);
                }}
              >
                <MenuItem value={"FREE"}>FREE</MenuItem>
                <MenuItem value={"NOTWORKING"}>NOTWORKING</MenuItem>
              </Select>
            </FormControl>
          </div>
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
            <TableCell align="left">Number</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Common Space</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {washingMachinesArray.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.number}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">{commonSpace.name}</TableCell>
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
