import React, { useEffect, useState } from "react";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";

import { findAllByTestId } from "@testing-library/react";
function Roompicker(props) {
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

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{props.name}</InputLabel>
      <Select value={props.current} onChange={props.onChange}>
        {props.items.map((val) => (
          <MenuItem key={val.id} value={val.id}>
            {val.number}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
export default Roompicker;
