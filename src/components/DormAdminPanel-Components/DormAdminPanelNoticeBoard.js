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
}));

export default function DormAdminPanelNoticeBoard() {
  const [errorMessage, setErrorMessage] = useState("");
  const classes = useStyles();
  const [dorm, setdorm] = useState();
  const [noticeBoardName, setnoticeBoardName] = useState("");
  const [noticeBoardArray, setnoticeBoardArray] = useState([]);
  const [deleteDialogOpen, setdeleteDialogOpen] = React.useState(false);
  const [
    selectedNoticeBoardToDelete,
    setselectedNoticeBoardToDelete,
  ] = useState("");
  const [editNoticeBoardName, seteditNoticeBoardName] = useState("");
  const [editDialogOpen, seteditDialogOpen] = React.useState(false);
  const [selectedNoticeBoardToEdit, setselectedNoticeBoardToEdit] = useState(
    ""
  );

  useEffect(() => {
    getDorm();
  }, []);

  function getDorm() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(serverUrl + "/dorm", config)
      .then((response) => {
        setdorm(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getNoticeBoards() {
    if (dorm) {
      const cookies = new Cookies();
      const token = cookies.get("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get(serverUrl + "/dorm/" + dorm.id + "/noticeBoards", config)
        .then((response) => {
          setnoticeBoardArray(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(getNoticeBoards, [dorm]);

  function handleSubmit(event) {
    event.preventDefault();
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(
        serverUrl + "/noticeBoard",
        {
          dormId: dorm.id,
          name: noticeBoardName,
        },
        config
      )
      .then((response) => {
        setnoticeBoardName("");
        getNoticeBoards();
        setErrorMessage("");
      })
      .catch((error) => {
        if (error.request.status === 409)
          setErrorMessage(
            "Notice Board with given name already exists in this dorm"
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
        serverUrl + "/noticeBoard/" + selectedNoticeBoardToDelete.id,
        config
      )
      .then((response) => {
        getNoticeBoards();
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
    setselectedNoticeBoardToDelete(row);
  };

  useEffect(() => {
    if (selectedNoticeBoardToDelete) setdeleteDialogOpen(true);
  }, [selectedNoticeBoardToDelete]);

  const editRecord = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .put(
        serverUrl + "/noticeBoard/" + selectedNoticeBoardToEdit.id,
        {
          name: editNoticeBoardName,
        },
        config
      )
      .then((response) => {
        getNoticeBoards();
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
    seteditNoticeBoardName(row.name);
    setselectedNoticeBoardToEdit(row);
  };

  useEffect(() => {
    if (selectedNoticeBoardToEdit) seteditDialogOpen(true);
  }, [selectedNoticeBoardToEdit]);

  return (
    <div className="appAdminPanelFormContainer ">
      <form className={classes.root} onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <TextField
            required
            id="name"
            value={noticeBoardName}
            label="Notice Board Name"
            onChange={(event) => setnoticeBoardName(event.target.value)}
          />
          <Button variant="contained" type="submit">
            {" "}
            Add new notice board
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
            Notice Board ID: {selectedNoticeBoardToDelete.id} <br />
            Notice Board name: {selectedNoticeBoardToDelete.name} <br />
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
            Record with ID: {selectedNoticeBoardToEdit.id} will be edited with
            these values:
          </DialogContentText>
          <TextField
            required
            id="editNoticeBoardName"
            value={editNoticeBoardName}
            label="Notice Board Name"
            onChange={(event) => seteditNoticeBoardName(event.target.value)}
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
            <TableCell align="left">Notice Board Name</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {noticeBoardArray.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
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
