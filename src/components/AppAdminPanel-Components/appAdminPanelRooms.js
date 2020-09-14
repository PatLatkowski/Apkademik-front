import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../../CSS/appAdminPanel.css";

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

function AppAdminPanelRooms(props) {
  const classes = useStyles();

  return (
    <div className="appAdminPanelFormContainer ">
      <form className={classes.root}>
        <div className="row justify-content-center">
          <TextField
            required
            id="room"
            label="Room number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            id="size"
            label="Room size"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant="contained"> Add new room</Button>
        </div>
      </form>

      <Table>
        <TableHead>
          <TableCell>Id</TableCell>
          <TableCell>Room Number</TableCell>
          <TableCell>Room Size</TableCell>
        </TableHead>
      </Table>
    </div>
  );
}
export default AppAdminPanelRooms;
