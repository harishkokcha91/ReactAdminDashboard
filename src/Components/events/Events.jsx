import React from "react";
import { Link } from "react-router-dom";
import EventList from "../EventList/EventList"; // Ensure this component exists
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

import "./events.scss";

function Events() {
    return (
        <div className="events">
            {/* Sidebar Section */}
            <div className="events_sidebar">
                <Sidebar />
            </div>

            {/* Main Section */}
            <div className="events_main">
                <Navbar />
                <div className="events_content">
                    <h2 className="events_title">Community Events</h2>
                    <div className="btnn">
                    <Link to="/events/addnew" style={{ textDecoration: "none" }}>
                    <button type="button">Add New Events</button>
                    </Link>
                </div> 
                    <EventList />
                </div>
            </div>
        </div>
    );
}

export default Events;
