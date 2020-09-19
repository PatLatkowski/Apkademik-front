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

function AppAdminPanelFloors(props) {
  const classes = useStyles();
  const [floorNumber, setfloorNumber] = useState(0);
  const [dorm, setdorm] = useState("");
  const [dormsArray, setdormsArray] = useState([]);
  useEffect(() => {
    getDorms();
  }, []);
  const [floorsArray, setfloorsArray] = useState([]);
  useEffect(() => {
    getFloors();
  }, [dorm]);

  function handleSubmit(event) {
    event.preventDefault();
    /*const cookies = new Cookies();
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
      });*/
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

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Floor Number</TableCell>
            <TableCell>Dorm Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {floorsArray.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.number}</TableCell>
              <TableCell>{dorm.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export default AppAdminPanelFloors;
