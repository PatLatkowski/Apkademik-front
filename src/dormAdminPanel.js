import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core/styles";
import TopBar from "./components/top-bar";
import DormAdminPanelPost from "./components/DormAdminPanel-Components/DormAdminPanelPost";
import DormAdminPanelUser from "./components/DormAdminPanel-Components/DormAdminPanelUser";
import DormAdminPanelNoticeBoard from "./components/DormAdminPanel-Components/DormAdminPanelNoticeBoard";

const useStyles = makeStyles({
  root: { backgroundColor: "#ffffff" },
});

const useStylesAction = makeStyles({
  root: { backgroundColor: "#eeeeee" },
  selected: { backgroundColor: "#15c31e", color: "#111111" },
});

function DormAdminPanel() {
  const navClasses = useStyles();
  const navActionClasses = useStylesAction();
  const [value, setValue] = React.useState(0);

  const OPTIONS = {
    0: <DormAdminPanelUser />,
    1: <DormAdminPanelPost />,
    2: <DormAdminPanelNoticeBoard />,
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
              label="User Acceptance"
              classes={{
                root: navActionClasses.root,
                selected: navActionClasses.selected,
              }}
            />
            <BottomNavigationAction
              label="Post Acceptance"
              classes={{
                root: navActionClasses.root,
                selected: navActionClasses.selected,
              }}
            />
            <BottomNavigationAction
              label="Notice Boards Management"
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
export default DormAdminPanel;
