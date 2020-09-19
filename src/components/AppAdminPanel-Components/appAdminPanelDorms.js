import React, { useState } from "react";
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
  getDorms();

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
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Dorm Name</TableCell>
            <TableCell>Dorm Address</TableCell>
            <TableCell>Floors</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dormsArray.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.floorCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default AppAdminPanelDorms;
