import React from "react";
import { Link } from "react-router-dom";
import AchievementsTable from "../AchievementsTable/AchievementsTable";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./achievements.scss";

function Achievements() {
  return (
    <div className="achievements">
      <div className="home_sidebar">
        <Sidebar />
      </div>

      <div className="achievements_main">
        <Navbar />

        {/* Add New Achievement Button */}
        <div className="btnn">
          <Link to="/achievements/addnew" style={{ textDecoration: "none" }}>
            <button type="button">Add New Achievement</button>
          </Link>
        </div>

        <AchievementsTable />
      </div>
    </div>
  );
}

export default Achievements;
