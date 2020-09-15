import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

function AppAdminPanelRooms(props) {
  return (
    <Table>
      <TableHead>
        <TableCell>Id</TableCell>
        <TableCell>Room Number</TableCell>
        <TableCell>Room Size</TableCell>
      </TableHead>
    </Table>
  );
}
export default AppAdminPanelRooms;
