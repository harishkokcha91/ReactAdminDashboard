import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import userPic from "../../Images/man2.jpg"; // Default profile image
import "./Detail.scss";

function ProfileDetails() {
    const { productId } = useParams(); // Get productId from URL params
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost:8084/profile/matrimonialProfiles/${productId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer {{token}}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch profile data");
                }

                const data = await response.json();
                console.log("Profile Data:", data);
                setProfile(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [productId]);

    if (loading) return <p>Loading profile details...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="details">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="detail_page_main">
                <Navbar />

                <div className="profile_info">
                    <div className="profile_detail">
                        <img src={profile.imageUrl || userPic} alt="Profile" className="profile_image" />

                        <div className="profile_details">
                            <p className="name">Name: {profile.name}</p>
                            <p>Date of Birth: {profile.dateOfBirth}</p>
                            <p>Height: {profile.height} cm</p>
                            <p>Annual Income: {profile.annualIncome}</p>
                            <p>Location: {profile.currentLocation}</p>
                            <p>Phone: {profile.phoneNumbers}</p>
                            <p>Status: {profile.status}</p>
                        </div>
                    </div>
                </div>
{/* 
                <div className="table">
                    <div className="title">Related Profiles</div>
                    <TableList productId={profile.id} />
                </div> */}
            </div>
        </div>
    );
}

export default ProfileDetails;
