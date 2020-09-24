import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core/styles";
import TopBar from "./components/top-bar";
import AppAdminPanelDorms from "./components/AppAdminPanel-Components/appAdminPanelDorms";
import "./CSS/appAdminPanel.css";
import AppAdminPanelRooms from "./components/AppAdminPanel-Components/appAdminPanelRooms";
import AppAdminPanelFloors from "./components/AppAdminPanel-Components/appAdminPanelFloors";
import AppAdminPanelCommonSpaces from "./components/AppAdminPanel-Components/appAdminPanelCommonSpaces";
import AppAdminPanelWashingMachines from "./components/AppAdminPanel-Components/appAdminPanelWashingMachines";

const useStyles = makeStyles({
  root: { backgroundColor: "#ffffff" },
});

const useStylesAction = makeStyles({
  root: { backgroundColor: "#eeeeee" },
  selected: { backgroundColor: "#f6f6f6", color: "#111111" },
});

function AppAdminPanel() {
  const navClasses = useStyles();
  const navActionClasses = useStylesAction();
  const [value, setValue] = React.useState(0);

  const OPTIONS = {
    0: <AppAdminPanelDorms />,
    1: <AppAdminPanelFloors />,
    2: <AppAdminPanelRooms />,
    3: <AppAdminPanelCommonSpaces />,
    4: <AppAdminPanelWashingMachines />,
  };

  return (
    <div className="container">
      <div className="row">
        <TopBar />
      </div>
      <div className="row m-2 justify-content-center">
        <div className=" w-50">
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabels
            className={navClasses.root}
          >
            <BottomNavigationAction
              label="Dorms"
              classes={{
                root: navActionClasses.root,
                selected: navActionClasses.selected,
              }}
            />
            <BottomNavigationAction
              label="Floors"
              classes={{
                root: navActionClasses.root,
                selected: navActionClasses.selected,
              }}
            />
            <BottomNavigationAction
              label="Rooms"
              classes={{
                root: navActionClasses.root,
                selected: navActionClasses.selected,
              }}
            />
            <BottomNavigationAction
              label="Common Spaces"
              classes={{
                root: navActionClasses.root,
                selected: navActionClasses.selected,
              }}
            />
            <BottomNavigationAction
              label="Washing Machines"
              classes={{
                root: navActionClasses.root,
                selected: navActionClasses.selected,
              }}
            />
          </BottomNavigation>
          <div>{OPTIONS[value]}</div>
        </div>
      </div>
    </div>
  );
}
export default AppAdminPanel;
