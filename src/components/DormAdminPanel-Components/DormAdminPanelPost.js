import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import "../../CSS/appAdminPanel.css";
import axios from "axios";
import Cookies from "universal-cookie";

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

function DormAdminPanelPost(props) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [reports, setReports] = useState(Array(1).fill(""));
  const [selected, setSelected] = useState(Array(1).fill(0));
  const [selectedSolved, setSelectedSolved] = useState(Array(1).fill(0));
  const classes = useStyles();

  function handleInProgress(n) {
    const selected2 = selected.slice();
    selected2[n] = !selected2[n];
    console.log(selected2[n]);
    setSelected(selected2);
  }

  function handleSolved(n) {
    const selected2 = selectedSolved.slice();
    selected2[n] = !selected2[n];
    console.log(selected2[n]);
    setSelectedSolved(selected2);
  }

  useEffect(() => {
    loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadList() {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get("http://46.41.142.44:8080/washingMachineFailures", options)
      .then((response) => {
        setReports(response.data);
        setSelected(Array(response.data.lenght).fill(false));
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSubmit() {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    reports.forEach((e, index) => {
      if (selected[index] || selectedSolved[index]) {
        var failstatus;
        if (selected[index]) {
          failstatus = "IN_PROGRESS";
        } else {
          failstatus = "SOLVED";
        }

        axios
          .put(
            "http://46.41.142.44:8080/washingMachineFailure/" +
              reports[index].id,
            {
              description: "string",
              failureStatus: failstatus,
              washingMachineId: reports[index].washingMachine.id,
            },
            options
          )
          .then((response) => {
            setSelected(Array(1).fill(0));
            setSelectedSolved(Array(1).fill(0));
            loadList();
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  return (
    <div className="temp ">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>washingMachine</TableCell>
            <TableCell>Floors</TableCell>
            <TableCell>In progress</TableCell>
            <TableCell>Solved</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((row, index) =>
            row.failureStatus === "REPORTED" ||
            row.failureStatus === "IN_PROGRESS" ? (
              <TableRow key={row.id}>
                <TableCell key={"id" + row.id}>{row.id}</TableCell>
                <TableCell key={"Status" + row.id}>
                  {row.failureStatus}
                </TableCell>
                <TableCell key={"washingMachine" + row.id}>
                  {row.washingMachine.id}
                </TableCell>
                <TableCell key={"user" + row.id}>{row.userDao.email}</TableCell>
                <TableCell key={"progress" + row.id} padding="checkbox">
                  <Checkbox
                    checked={selected[index] ? true : false}
                    key={"checkbox" + row.id}
                    disabled={selectedSolved[index] ? true : false}
                    onChange={(n) => handleInProgress(index)}
                  />
                </TableCell>
                <TableCell key={"solved" + row.id} padding="checkbox">
                  <Checkbox
                    checked={selectedSolved[index] ? true : false}
                    key={"checkbox" + row.id}
                    disabled={selected[index] ? true : false}
                    onChange={(n) => handleSolved(index)}
                  />
                </TableCell>
              </TableRow>
            ) : (
              <TableRow key={"empty" + row.id}></TableRow>
            )
          )}
        </TableBody>
      </Table>
      <div className="row">
        <div className="col-3 mx-auto">
          <button
            type="submit"
            name="Register"
            className="submit-button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
export default DormAdminPanelPost;
