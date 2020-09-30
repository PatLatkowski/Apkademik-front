import React, { useEffect, useState } from "react";
import TreeView from "@material-ui/lab/TreeView";
import StyledTreeItem from "./StyledTreeItem";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { makeStyles } from "@material-ui/core/styles";
import HouseIcon from "@material-ui/icons/House";
import InfoIcon from "@material-ui/icons/Info";
import SubjectIcon from "@material-ui/icons/Subject";
import SpeakerIcon from "@material-ui/icons/Speaker";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import axios from "axios";
import { serverUrl } from "../consts";
import Cookies from "universal-cookie";

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const cookies = new Cookies();
const token = cookies.get("token");

function SideBar(props) {
  const classes = useStyles();
  const [noticeBoards, setNoticeBoards] = useState([]);

  useEffect(() => {
    axios
      .get(serverUrl + "/user/noticeBoards", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setNoticeBoards(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <TreeView
      className={classes.root}
      expanded={["2"]}
      defaultEndIcon={<div style={{ width: 24 }} />}
      onNodeSelect={(event, value) => props.onNodeSelect(event, value)}
    >
      <StyledTreeItem
        nodeId="0"
        name="Reservation"
        labelText="Reservations"
        labelIcon={CalendarTodayIcon}
      />

      {noticeBoards.map((noticeBoard) => (
        <StyledTreeItem
          key={noticeBoard.id}
          nodeId={noticeBoard.id + ""}
          labelText={noticeBoard.name}
          labelIcon={HouseIcon}
        />
      ))}
    </TreeView>
  );
}
export default SideBar;
