import React from "react";
import TreeView from "@material-ui/lab/TreeView";
import StyledTreeItem from "./StyledTreeItem";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import HouseIcon from "@material-ui/icons/House";
import InfoIcon from "@material-ui/icons/Info";
import SubjectIcon from "@material-ui/icons/Subject";
import SpeakerIcon from "@material-ui/icons/Speaker";
import LocationCityIcon from "@material-ui/icons/LocationCity";

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

function SideBar() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={["3"]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      <StyledTreeItem
        nodeId="1"
        labelText="Rezerwacje"
        labelIcon={CalendarTodayIcon}
      />
      <StyledTreeItem
        nodeId="2"
        labelText="Tablica ogłoszeń"
        labelIcon={HouseIcon}
      >
        <StyledTreeItem nodeId="3" labelText="Ogólne" labelIcon={SubjectIcon} />
        <StyledTreeItem nodeId="4" labelText="Inne" labelIcon={SpeakerIcon} />
        <StyledTreeItem
          nodeId="5"
          labelText="Administracyjne"
          labelIcon={InfoIcon}
        />
      </StyledTreeItem>
      <StyledTreeItem
        nodeId="6"
        labelText="Ogloszenia miedzyakademikowe"
        labelIcon={LocationCityIcon}
      />
    </TreeView>
  );
}
export default SideBar;
