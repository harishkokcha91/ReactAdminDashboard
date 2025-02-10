import React from "react";
import { Link } from "react-router-dom";
import BusinessList from "../BusinessList/BusinessList"; // Ensure this component exists
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

import "./businesses.scss"; // Updated the SCSS file accordingly

function Businesses() {
    return (
        <div className="businesses">
            {/* Sidebar Section */}
            <div className="businesses_sidebar">
                <Sidebar />
            </div>

            {/* Main Section */}
            <div className="businesses_main">
                <Navbar />
                <div className="businesses_content">
                    <h2 className="businesses_title">Community Businesses</h2>
                    <div className="btnn">
                        <Link to="/business/addnew" style={{ textDecoration: "none" }}>
                            <button type="button">Add New Business</button>
                        </Link>
                    </div> 
                    <BusinessList />
                </div>
            </div>
        </div>
    );
}

export default Businesses;
