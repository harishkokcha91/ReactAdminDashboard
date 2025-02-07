import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import basestyle from "../Base.module.css";

const Profile = ({ setUserState, username }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage, if not redirect to login
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    console.log("Logging out...");  
    // Clear user state and token, then redirect to login page
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    // setUserState(null);  // Clear user state

    // Redirect to login page after logout
    navigate("/login", { replace: true });
  };

  return (
    <div className="profile">
      <h1 style={{ color: "white" }}>Welcome {username} !!</h1>
      <button
        className={basestyle.button_common}
        onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
