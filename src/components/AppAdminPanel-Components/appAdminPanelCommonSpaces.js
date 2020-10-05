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

export default function AppAdminPanelCommonSpaces(props) {
  const classes = useStyles();
  const initialState = "";
  const [commonSpaceName, setcommonSpaceName] = useState(initialState);
  const [commonSpaceNumber, setcommonSpaceNumber] = useState(initialState);
  const [commonSpaceSize, setcommonSpaceSize] = useState(initialState);
  const [commonSpaceType, setcommonSpaceType] = useState(initialState);
  const [editCommonSpaceName, seteditCommonSpaceName] = useState(initialState);
  const [editCommonSpaceNumber, seteditCommonSpaceNumber] = useState(
    initialState
  );
  const [editCommonSpaceSize, seteditCommonSpaceSize] = useState(initialState);
  const [editCommonSpaceType, seteditCommonSpaceType] = useState(initialState);
  const [dorm, setdorm] = useState(initialState);
  const [dormsArray, setdormsArray] = useState([]);
  const [floor, setfloor] = useState(initialState);
  const [floorsArray, setfloorsArray] = useState([]);
  const [commonSpacesArray, setcommonSpacesArray] = useState([]);
  const [deleteDialogOpen, setdeleteDialogOpen] = React.useState(false);
  const [
    selectedCommonSpaceToDelete,
    setselectedCommonSpaceToDelete,
  ] = useState("");
  const [editDialogOpen, seteditDialogOpen] = React.useState(false);
  const [selectedCommonSpaceToEdit, setselectedCommonSpaceToEdit] = useState(
    ""
  );
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
        serverUrl + "/commonSpace",
        {
          floorId: floor.id,
          name: commonSpaceName,
          number: commonSpaceNumber,
          size: commonSpaceSize,
          type: commonSpaceType,
        },
        config
      )
      .then((response) => {
        setcommonSpaceName(initialState);
        setcommonSpaceNumber(initialState);
        setcommonSpaceSize(initialState);
        setcommonSpaceType(initialState);
        getCommonSpaces();
        setErrorMessage("");
      })
      .catch((error) => {
        if (error.request.status === 409)
          setErrorMessage(
            "Common Space with given number already exists on this floor"
          );
      });
  }

  useEffect(() => {
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
    getDorms();
  }, []);

  useEffect(() => {
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
    getFloors();
  }, [dorm]);

  useEffect(getCommonSpaces, [floor]);

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

  const deleteRecord = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .delete(
        serverUrl + "/commonSpace/" + selectedCommonSpaceToDelete.id,
        config
      )
      .then((response) => {
        getCommonSpaces();
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
    setselectedCommonSpaceToDelete(row);
  };

  useEffect(() => {
    if (selectedCommonSpaceToDelete) setdeleteDialogOpen(true);
  }, [selectedCommonSpaceToDelete]);

  const editRecord = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .put(
        serverUrl + "/commonSpace/" + selectedCommonSpaceToEdit.id,
        {
          name: editCommonSpaceName,
          number: editCommonSpaceNumber,
          size: editCommonSpaceSize,
          type: editCommonSpaceType,
        },
        config
      )
      .then((response) => {
        getCommonSpaces();
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
    seteditCommonSpaceName(row.name);
    seteditCommonSpaceNumber(row.number);
    seteditCommonSpaceSize(row.size);
    seteditCommonSpaceType(row.type);
    setselectedCommonSpaceToEdit(row);
  };

  useEffect(() => {
    if (selectedCommonSpaceToEdit) seteditDialogOpen(true);
  }, [selectedCommonSpaceToEdit]);

  return (
    <div className="appAdminPanelFormContainer ">
      <form className={classes.root} onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <TextField
            required
            id="name"
            value={commonSpaceName}
            label="Name"
            onChange={(event) => setcommonSpaceName(event.target.value)}
          />
          <TextField
            required
            id="number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => setcommonSpaceNumber(event.target.value)}
          />
          <TextField
            required
            id="size"
            label="Size"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => setcommonSpaceSize(event.target.value)}
          />
          <FormControl required className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select
              value={commonSpaceType}
              onChange={(event) => {
                setcommonSpaceType(event.target.value);
              }}
            >
              <MenuItem value={"LAUNDRY"}>LAUNDRY</MenuItem>
              <MenuItem value={"GYM"}>GYM</MenuItem>
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
          <Button variant="contained" type="submit">
            {" "}
            Add new Common Space
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
            Common Space ID: {selectedCommonSpaceToDelete.id} <br />
            Common Space Name: {selectedCommonSpaceToDelete.name} <br />
            Common Space Number: {selectedCommonSpaceToDelete.number} <br />
            Common Space Size: {selectedCommonSpaceToDelete.size} <br />
            Common Space Type: {selectedCommonSpaceToDelete.type} <br />
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
            Record with ID: {selectedCommonSpaceToEdit.id} will be edited with
            these values:
          </DialogContentText>
          <TextField
            required
            id="name"
            value={editCommonSpaceName}
            label="Name"
            onChange={(event) => seteditCommonSpaceName(event.target.value)}
          />
          <TextField
            required
            id="number"
            label="Number"
            type="number"
            value={editCommonSpaceNumber}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => seteditCommonSpaceNumber(event.target.value)}
          />
          <TextField
            required
            id="size"
            label="Size"
            type="number"
            value={editCommonSpaceSize}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => seteditCommonSpaceSize(event.target.value)}
          />
          <FormControl required className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select
              value={editCommonSpaceType}
              onChange={(event) => {
                seteditCommonSpaceType(event.target.value);
              }}
            >
              <MenuItem value={"LAUNDRY"}>LAUNDRY</MenuItem>
              <MenuItem value={"GYM"}>GYM</MenuItem>
            </Select>
          </FormControl>
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
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Number</TableCell>
            <TableCell align="left">Size</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">Floor</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commonSpacesArray.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.number}</TableCell>
              <TableCell align="left">{row.size}</TableCell>
              <TableCell align="left">{row.type}</TableCell>
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
