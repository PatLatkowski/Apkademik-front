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

function AppAdminPanelFloors(props) {
  const classes = useStyles();
  const [floorNumber, setfloorNumber] = useState(0);
  const [dorm, setdorm] = useState("");
  const [editFloorNumber, seteditFloorNumber] = useState(0);
  const [deleteDialogOpen, setdeleteDialogOpen] = React.useState(false);
  const [editDialogOpen, seteditDialogOpen] = React.useState(false);
  const [selectedFloorToDelete, setselectedFloorToDelete] = useState("");
  const [selectedFloorToEdit, setselectedFloorToEdit] = useState("");
  const [dormsArray, setdormsArray] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getDorms();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(
        serverUrl + "/floor",
        {
          dormId: dorm.id,
          number: floorNumber,
        },
        config
      )
      .then((response) => {
        setfloorNumber();
        getFloors();
        setErrorMessage("");
      })
      .catch((error) => {
        if (error.request.status === 409)
          setErrorMessage(
            "Floor with given number already exists in this dorm"
          );
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
      const cookies = new Cookies();
      const token = cookies.get("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get(serverUrl + "/dorm/" + dorm.id + "/floors", config)
        .then((response) => {
          setfloorsArray(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const [floorsArray, setfloorsArray] = useState([]);

  useEffect(getFloors, [dorm]);

  const deleteRecord = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .delete(serverUrl + "/floor/" + selectedFloorToDelete.id, config)
      .then((response) => {
        getFloors();
      })
      .catch((error) => {
        console.log(error);
      });
    handleDeleteDialogClose();
    getFloors();
  };

  const handleDeleteDialogClose = () => {
    setdeleteDialogOpen(false);
  };

  const handleDeleteDialogClick = (row) => {
    setselectedFloorToDelete(row);
  };

  useEffect(() => {
    if (selectedFloorToDelete) setdeleteDialogOpen(true);
  }, [selectedFloorToDelete]);

  const editRecord = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .put(
        serverUrl + "/floor/" + selectedFloorToEdit.id,
        {
          number: editFloorNumber,
        },
        config
      )
      .then((response) => {
        getFloors();
      })
      .catch((error) => {
        console.log(error);
      });
    handleEditDialogClose();
    getFloors();
  };

  const handleEditDialogClose = () => {
    seteditDialogOpen(false);
  };

  const handleEditDialogClick = (row) => {
    seteditFloorNumber(row.number);
    setselectedFloorToEdit(row);
  };

  useEffect(() => {
    if (selectedFloorToEdit) seteditDialogOpen(true);
  }, [selectedFloorToEdit]);

  return (
    <div className="appAdminPanelFormContainer">
      <form className={classes.root} onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <TextField
            required
            id="floor"
            label="Floor number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => setfloorNumber(event.target.value)}
          />
          <FormControl className={classes.formControl}>
            <InputLabel>Dorm</InputLabel>
            <Select
              value={dorm}
              onChange={(event) => {
                setdorm(event.target.value);
              }}
            >
              {dormsArray.map((record) => (
                <MenuItem key={record.id} value={record}>
                  {record.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" type="submit">
            {" "}
            Add new floor
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
            Floor ID: {selectedFloorToDelete.id} <br />
            Floor number: {selectedFloorToDelete.number} <br />
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
            Record with ID: {selectedFloorToEdit.id} will be edited with these
            values:
          </DialogContentText>
          <TextField
            required
            id="editFloorNumber"
            value={editFloorNumber}
            label="Floor Number"
            onChange={(event) => seteditFloorNumber(event.target.value)}
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
            <TableCell align="left">Floor Number</TableCell>
            <TableCell align="left">Dorm Name</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {floorsArray.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.number}</TableCell>
              <TableCell align="left">{dorm.name}</TableCell>
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
export default AppAdminPanelFloors;
