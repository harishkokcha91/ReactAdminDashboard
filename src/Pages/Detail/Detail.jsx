import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "../../Components/Chart/Chart";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import userPic from "../../Images/man2.jpg";
import "./Detail.scss";

function Detail() {
    const { userId } = useParams(); // Get userId from URL params
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8084/user/users/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer {{token}}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const data = await response.json();
                console.log(data)
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) return <p>Loading user details...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="details">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="detail_page_main">
                <Navbar />

                <div className="user_info">
                <div className="user_detail">
                    <img 
                        src={user.image || userPic} 
                        alt="user" 
                        className="user_image" 
                    />

                    <div className="user_detailss">
                        <p className="name">Name: {user.name || "N/A"}</p>
                        <p>Email: {user.email || "N/A"}</p>
                        <p>Age: {user.age || "N/A"}</p>
                        <p>Phone: {user.phoneNumbers || "N/A"}</p>
                        <p>Status: {user.status || "N/A"}</p>
                    </div>
                </div>

                <div className="user_chart">
                    <Chart height={390} title="User spending" />
                </div>
            </div>


                <div className="table">
                    <div className="title">Child Profile</div>
                        <ProfileList userId={user.ID} />
                </div>
            </div>
        </div>
    );
}

export default Detail;
