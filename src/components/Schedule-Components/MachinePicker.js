import React, { useEffect, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";

import { findAllByTestId } from "@testing-library/react";

function MachinePicker(props) {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 80,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  function menuItems() {
    var result = [];
    var curroom = [];
    for (var x = 0; x < props.rooms.length; x++) {
      if (props.rooms[x] === props.room) curroom = props.items[x];
    }

    console.log(curroom);

    curroom.forEach((element) => {
      result.push(<MenuItem value={element}>{element}</MenuItem>);
    });

    return result;
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{props.name}</InputLabel>
      <Select value={props.current} onChange={props.onChange}>
        {menuItems()}
      </Select>
    </FormControl>
  );
}
export default MachinePicker;
