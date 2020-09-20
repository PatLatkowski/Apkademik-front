import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../../CSS/appAdminPanel.css";
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
}));

function AppAdminPanelDorms(props) {
  const classes = useStyles();
  const [dormsArray, setDormsArray] = useState([]);
  const [dormName, setDormName] = useState("");
  const [dormAddress, setDormAddress] = useState("");
  const [floorCount, setFloorCount] = useState(0);
  const [editDormName, seteditDormName] = useState("");
  const [editDormAddress, seteditDormAddress] = useState("");
  const [editFloorCount, seteditFloorCount] = useState(0);
  const [deleteDialogOpen, setdeleteDialogOpen] = React.useState(false);
  const [editDialogOpen, seteditDialogOpen] = React.useState(false);
  const [selectedDormToDelete, setselectedDormToDelete] = useState("");
  const [selectedDormToEdit, setselectedDormToEdit] = useState("");

  useEffect(() => {
    getDorms();
  }, []);

  function getDorms() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(serverUrl + "/dorms", config)
      .then((response) => {
        setDormsArray(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(
        serverUrl + "/dorm",
        {
          name: dormName,
          address: dormAddress,
          floorCount: floorCount,
        },
        config
      )
      .then((response) => {
        console.log(response);
        setDormName("");
        setDormAddress("");
        setFloorCount(0);
        getDorms();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteRecord = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .delete(serverUrl + "/dorm/" + selectedDormToDelete.id, config)
      .then((response) => {
        console.log(response);
        getDorms();
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
    console.log(row);
    setselectedDormToDelete(row);
    console.log(selectedDormToDelete);
  };

  useEffect(() => {
    if (selectedDormToDelete) setdeleteDialogOpen(true);
  }, [selectedDormToDelete]);

  const editRecord = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .put(
        serverUrl + "/dorm/" + selectedDormToEdit.id,
        {
          name: editDormName,
          address: editDormAddress,
          floorCount: editFloorCount,
        },
        config
      )
      .then((response) => {
        console.log(response);
        getDorms();
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
    seteditDormName(row.name);
    seteditDormAddress(row.address);
    seteditFloorCount(row.floorCount);
    setselectedDormToEdit(row);
  };

  useEffect(() => {
    if (selectedDormToEdit) seteditDialogOpen(true);
  }, [selectedDormToEdit]);

  return (
    <div className="appAdminPanelFormContainer ">
      <form className={classes.root} onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <TextField
            required
            id="dormName"
            value={dormName}
            label="Dorm Name"
            onChange={(event) => setDormName(event.target.value)}
          />
          <TextField
            required
            id="dormAddress"
            value={dormAddress}
            label="Address"
            onChange={(event) => setDormAddress(event.target.value)}
          />
          <TextField
            required
            id="floors"
            value={floorCount}
            label="Floors"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => setFloorCount(event.target.value)}
          />
          <Button variant="contained" type="submit">
            {" "}
            Add new dorm
          </Button>
        </div>
      </form>

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
            Dorm ID: {selectedDormToDelete.id} <br />
            Dorm name: {selectedDormToDelete.name} <br />
            Dorm floors count: {selectedDormToDelete.floorCount} <br />
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
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit record</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Record with ID: {selectedDormToEdit.id} will be edited with these
            values:
          </DialogContentText>
          <TextField
            required
            id="editDormName"
            value={editDormName}
            label="Dorm Name"
            onChange={(event) => seteditDormName(event.target.value)}
          />
          <TextField
            required
            id="editDormAddress"
            value={editDormAddress}
            label="Address"
            onChange={(event) => seteditDormAddress(event.target.value)}
          />
          <TextField
            required
            id="editFloors"
            value={editFloorCount}
            label="Floors"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => seteditFloorCount(event.target.value)}
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
            <TableCell>Id</TableCell>
            <TableCell>Dorm Name</TableCell>
            <TableCell>Dorm Address</TableCell>
            <TableCell>Floors</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dormsArray.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.floorCount}</TableCell>
              <TableCell>
                <Button>
                  <EditIcon
                    onClick={() => handleEditDialogClick(row)}
                  ></EditIcon>
                </Button>
              </TableCell>
              <TableCell>
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
export default AppAdminPanelDorms;
