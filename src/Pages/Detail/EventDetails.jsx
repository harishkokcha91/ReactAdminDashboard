import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./EventDetails.scss";

function EventDetails() {
    const { eventId } = useParams(); // Get eventId from URL params
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`http://localhost:8084/namdevevents/events/${eventId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer {{token}}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch event data");
                }

                const data = await response.json();
                console.log("Event Data:", data);
                setEvent(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    if (loading) return <p>Loading event details...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="details">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="detail_page_main">
                <Navbar />

                <div className="event_info">
                    <div className="event_detail">
                        <img src={event.image || "https://via.placeholder.com/400"} alt="Event" className="event_image" />

                        <div className="event_details">
                            <h2 className="name">{event.name || "N/A"}</h2>
                            <p><strong>Description:</strong> {event.description || "N/A"}</p>
                            <p><strong>Date:</strong> {new Date(event.event_date).toLocaleString() || "N/A"}</p>
                            <p><strong>Venue:</strong> {event.venue || "N/A"}</p>
                            <p><strong>Address:</strong> {event.address}, {event.city}, {event.state}, {event.zip_code}, {event.country}</p>
                            <p><strong>Organizer:</strong> {event.organizer || "N/A"}</p>
                            <p><strong>Email:</strong> {event.email || "N/A"}</p>
                            <p><strong>Phone:</strong> {event.phone || "N/A"}</p>
                            <p><strong>Category:</strong> {event.category || "N/A"}</p>
                            <p><strong>Capacity:</strong> {event.capacity || "N/A"} people</p>
                            <p><strong>Registered Attendees:</strong> {event.attendees_registered || 0}</p>
                            <p><strong>Event Type:</strong> {event.is_online ? "Online" : "Offline"}</p>
                            <p><strong>Ticket Price:</strong> {event.ticket_price === 0 ? "Free" : `₹${event.ticket_price}`}</p>
                            <p><strong>Status:</strong> <span className={`status ${event.status}`}>{event.status || "Pending"}</span></p>
                            <p><strong>Registration:</strong> <a href={event.registration_link} target="_blank" rel="noopener noreferrer">Register Here</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventDetails;
