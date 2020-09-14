import React from "react";
import TopBar from "./components/top-bar";

function AppAdminPanel() {
  return (
    <div className="container">
      <div className="row">
        <TopBar />
      </div>
      <div className="row">Panel administratora aplikacji</div>
    </div>
  );
}
export default AppAdminPanel;
