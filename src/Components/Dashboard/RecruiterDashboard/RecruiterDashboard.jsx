import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet} from "react-router-dom"
import "./RecruiterDashboard.css";
const RecruiterDashboard = () => {
  return (
    <>
     
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <Sidebar />
        </div>
        <div className="dashboard-content">
          <h1>Recruiter Dashboard</h1>
     
          <Outlet/>
        </div>
      </div>
    </>
  );
};

export default RecruiterDashboard;
