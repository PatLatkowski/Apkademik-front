import React, { useEffect, useState } from "react";
import TreeView from "@material-ui/lab/TreeView";
import StyledTreeItem from "./StyledTreeItem";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { makeStyles } from "@material-ui/core/styles";
import HouseIcon from "@material-ui/icons/House";
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

function SideBar(props) {
  const classes = useStyles();
  const [noticeBoards, setNoticeBoards] = useState([]);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(serverUrl + "/dorm/noticeBoards", config)
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
      <a href="/mainPage/reservation">
        <StyledTreeItem
          nodeId="0"
          name="Reservation"
          labelText="Reservations"
          labelIcon={CalendarTodayIcon}
        />
      </a>

      {noticeBoards.map((noticeBoard) => (
        <a href={"/mainPage/" + noticeBoard.name} key={noticeBoard.id}>
          <StyledTreeItem
            nodeId={noticeBoard.id + ""}
            labelText={noticeBoard.name}
            labelIcon={HouseIcon}
          />
        </a>
      ))}
    </TreeView>
  );
}
export default SideBar;
