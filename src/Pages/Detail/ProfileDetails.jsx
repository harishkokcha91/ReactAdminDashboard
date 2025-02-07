import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import userPic from "../../Images/man2.jpg"; // Default profile image
import "./ProfileDetails.scss";

function ProfileDetails() {
    const { productId } = useParams(); // Get productId from URL params
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updating, setUpdating] = useState(false);

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

   
    const handleApproval = async (newStatus) => {
        if (!profile) return;
        setUpdating(true);
        try {
            const updatedProfile = { ...profile, status: newStatus };

            const response = await fetch(`http://localhost:8084/profile/matrimonialProfiles/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer {{token}}`,
                },
                body: JSON.stringify(updatedProfile),
            });

            if (!response.ok) {
                throw new Error(`Failed to update status to ${newStatus}`);
            }

            setProfile(updatedProfile);
        } catch (err) {
            alert(err.message);
        } finally {
            setUpdating(false);
        }
    };
    
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
                        <img src={"http://localhost:8084/profile/" + profile.image  || userPic} alt="Profile" className="profile_image" />

                        <div className="profile_details">
                            <p className="name"><strong>Name:</strong> {profile.name || "N/A"}</p>
                            <p><strong>Profile For:</strong> {profile.profileFor || "N/A"}</p>
                            <p><strong>Date of Birth:</strong> {profile.dateOfBirth || "N/A"}</p>
                            <p><strong>Birth Place:</strong> {profile.birthPlace || "N/A"}</p>
                            <p><strong>Height:</strong> {profile.height ? `${profile.height} cm` : "N/A"}</p>
                            <p><strong>Complexion:</strong> {profile.complexion || "N/A"}</p>
                            <p><strong>Gotra (Self):</strong> {profile.gotraSelf || "N/A"}</p>
                            <p><strong>Gotra (Mother):</strong> {profile.gotraMother || "N/A"}</p>
                            <p><strong>Gotra (Grandmother):</strong> {profile.gotraGrandMother || "N/A"}</p>
                            <p><strong>Manglik:</strong> {profile.manglik ? "Yes" : "No"}</p>
                            <p><strong>Father's Name:</strong> {profile.fatherName || "N/A"}</p>
                            <p><strong>Father's Occupation:</strong> {profile.fatherOccupation || "N/A"}</p>
                            <p><strong>Mother's Name:</strong> {profile.motherName || "N/A"}</p>
                            <p><strong>Mother's Occupation:</strong> {profile.motherOccupation || "N/A"}</p>
                            <p><strong>Siblings:</strong> {profile.siblings || "N/A"}</p>
                            <p><strong>Qualification:</strong> {profile.qualification || "N/A"}</p>
                            <p><strong>Occupation:</strong> {profile.occupation || "N/A"}</p>
                            <p><strong>Annual Income:</strong> {profile.annualIncome || "N/A"}</p>
                            <p><strong>Marital Status:</strong> {profile.maritalStatus || "N/A"}</p>
                            <p><strong>Address:</strong> {profile.address || "N/A"}</p>
                            <p><strong>Current Location:</strong> {profile.currentLocation || "N/A"}</p>
                            <p><strong>Status:</strong> <span className={`status ${profile.status}`}>{profile.status || "Pending"}</span></p>
                            <p><strong>Phone Numbers:</strong> {profile.phoneNumbers || "N/A"}</p>
                        </div>

                        <div className="approval_buttons">
                            <button 
                                className="viewF_btn" 
                                onClick={() => handleApproval("Approved")} 
                                disabled={updating || profile.status === "Approved"}
                            >
                                {updating ? "Processing..." : "Approve"}
                            </button>

                            <button 
                                className="delete_btn" 
                                onClick={() => handleApproval("Rejected")} 
                                disabled={updating || profile.status === "Rejected"}
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

export default ProfileDetails;
