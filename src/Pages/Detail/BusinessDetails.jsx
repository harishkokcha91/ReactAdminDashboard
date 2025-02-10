import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./BusinessDetails.scss";

function BusinessDetails() {
    const { businessId } = useParams(); // Get businessId from URL params
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const response = await fetch(`http://localhost:8084/namdevbusinesses/businesses/${businessId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer {{token}}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch business data");
                }

                const data = await response.json();
                console.log("Business Data:", data);
                setBusiness(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBusiness();
    }, [businessId]);

    const handleApproval = async (newStatus) => {
        if (!business) return;
        setUpdating(true);
        try {
            const updatedBusiness = { ...business, status: newStatus };

            const response = await fetch(`http://localhost:8084/namdevbusinesses/businesses/${businessId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer {{token}}`,
                },
                body: JSON.stringify(updatedBusiness),
            });

            if (!response.ok) {
                throw new Error(`Failed to update status to ${newStatus}`);
            }

            setBusiness(updatedBusiness);
        } catch (err) {
            alert(err.message);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <p>Loading business details...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="details">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="detail_page_main">
                <Navbar />

                <div className="business_info">
                    <div className="business_detail">
                        <img src={business.image || "https://via.placeholder.com/400"} alt="Business" className="business_image" />

                        <div className="business_details">
                            <h2 className="name">{business.name || "N/A"}</h2>
                            <p><strong>Description:</strong> {business.description || "N/A"}</p>
                            <p><strong>Business Type:</strong> {business.type || "N/A"}</p>
                            <p><strong>Location:</strong> {business.location || "N/A"}</p>
                            <p><strong>Owner:</strong> {business.owner || "N/A"}</p>
                            <p><strong>Email:</strong> {business.email || "N/A"}</p>
                            <p><strong>Phone:</strong> {business.phone || "N/A"}</p>
                            <p><strong>Website:</strong> <a href={business.website} target="_blank" rel="noopener noreferrer">{business.website || "N/A"}</a></p>
                            <p><strong>Rating:</strong> {business.rating || "N/A"} ⭐</p>
                            <p><strong>Status:</strong> <span className={`status ${business.status}`}>{business.status || "Pending"}</span></p>
                            <p><strong>Created Date:</strong> {business.CreatedAt|| "N/A"}</p>
                            <p><strong>Updated Date:</strong> {business.UpdatedAt || "N/A"}</p>
                        </div>

                        <div className="approval_buttons">
                            <button 
                                className="approve_btn" 
                                onClick={() => handleApproval("Approved")} 
                                disabled={updating || business.status === "Approved"}
                            >
                                {updating ? "Processing..." : "Approve"}
                            </button>

                            <button 
                                className="reject_btn" 
                                onClick={() => handleApproval("Rejected")} 
                                disabled={updating || business.status === "Rejected"}
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

export default BusinessDetails;
