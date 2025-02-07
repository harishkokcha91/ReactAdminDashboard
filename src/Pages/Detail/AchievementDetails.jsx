import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./AchievementDetails.scss";

function AchievementDetails() {
    const { achievementId } = useParams(); // Get achievementId from URL params
    const [achievement, setAchievement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchAchievement = async () => {
            try {
                const response = await fetch(`http://localhost:8084/brilliantstudent/achievements/${achievementId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer {{token}}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch achievement details");
                }

                const data = await response.json();
                console.log("Achievement Data:", data);
                setAchievement(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAchievement();
    }, [achievementId]);

    const handleApproval = async (newStatus) => {
        if (!achievement) return;
        setUpdating(true);
        try {
            const updatedAchievement = { ...achievement, status: newStatus };

            const response = await fetch(`http://localhost:8084/brilliantstudent/achievements/${achievementId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer {{token}}`,
                },
                body: JSON.stringify(updatedAchievement),
            });

            if (!response.ok) {
                throw new Error(`Failed to update status to ${newStatus}`);
            }

            setAchievement(updatedAchievement);
        } catch (err) {
            alert(err.message);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <p>Loading achievement details...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="details">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="detail_page_main">
                <Navbar />

                <div className="achievement_info">
                    <div className="achievement_detail">
                    <img src={"http://localhost:8084/profile/" + achievement.image  || userPic} alt="Profile" className="achievement_image" />

                        <h2>{achievement.achievement || "Untitled Achievement"}</h2>
                        <p><strong>Description:</strong> {achievement.description || "No description provided"}</p>
                        <p><strong>Date:</strong> {achievement.date_of_achievement || "N/A"}</p>
                        <p><strong>Category:</strong> {achievement.achievement_type || "N/A"}</p>
                        <p><strong>Organizer:</strong> {achievement.organizer || "N/A"}</p>
                        <p><strong>Status:</strong> <span className={`status ${achievement.status}`}>{achievement.status || "Pending"}</span></p>

                        <div className="approval_buttons">
                            <button 
                                className="approve_btn" 
                                onClick={() => handleApproval("Approved")} 
                                disabled={updating || achievement.status === "Approved"}
                            >
                                {updating ? "Processing..." : "Approve"}
                            </button>

                            <button 
                                className="reject_btn" 
                                onClick={() => handleApproval("Rejected")} 
                                disabled={updating || achievement.status === "Rejected"}
                            >
                                {updating ? "Processing..." : "Reject"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AchievementDetails;
