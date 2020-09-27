import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import "../../CSS/appAdminPanel.css";
import axios from "axios";
import Cookies from "universal-cookie";

function DormAdminPanelUser(props) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [users, setUsers] = useState(Array(1).fill(""));
  const [selected, setSelected] = useState(Array(1).fill(0));
  const [roleId, setRoleId] = useState(0);

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
      .get("http://46.41.142.44:8080/users/roles", options)
      .then((response) => {
        setUsers(response.data);
        setSelected(Array(response.data.lenght).fill(false));
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://46.41.142.44:8080/roles", options)
      .then((response) => {
        response.data.map((e) => {
          if (e.name === "USER") {
            setRoleId(e.id);
          }
        });

        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    console.log(roleId);
  }, [roleId]);

  function handleCheckBox(n) {
    const selected2 = selected.slice();
    selected2[n] = !selected2[n];
    console.log(selected2[n]);
    setSelected(selected2);
  }

  function handleSubmit() {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    users.forEach((e, index) => {
      if (selected[index]) {
        axios
          .post(
            "http://46.41.142.44:8080/user/" +
              users[index].id +
              "/role/" +
              roleId,
            null,
            options
          )
          .then((response) => {
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
    <div className="wrapper">
      <div className="row">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Add</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row, index) =>
              Array.isArray(row.roles) && !row.roles.length ? (
                <TableRow key={row.id}>
                  <TableCell key={"id" + row.id}>{row.id}</TableCell>
                  <TableCell key={"email" + row.id}>{row.email}</TableCell>
                  <TableCell key={"name" + row.id}>{row.name}</TableCell>
                  <TableCell key={"surname" + row.id}>{row.surname}</TableCell>
                  <TableCell key={"check" + row.id} padding="checkbox">
                    <Checkbox
                      key={"checkbox" + row.id}
                      onChange={(n) => handleCheckBox(index)}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow key={"empty" + row.id}></TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
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
export default DormAdminPanelUser;
