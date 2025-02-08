import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import "./AddNewEvent.scss";
import CategorySelection from "./CategorySelection";

const AddNewEvent = () => {
    const [eventData, setEventData] = useState({
        name: "",
        description: "",
        event_date: "",
        venue: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        organizer: "",
        email: "",
        phone: "",
        category: "Cultural",
        capacity: "",
        attendees_registered: "",
        status: "Scheduled",
        image: "",
        registration_link: "",
        is_online: false,
        ticket_price: "",
    });

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEventData({ ...eventData, [name]: type === "checkbox" ? checked : value });
    };

    // Handle image upload
    const handleImageUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axios.post("http://localhost:8084/image/upload", formData);
            return response.data.image_url;
        } catch (error) {
            console.error("Image Upload Error:", error);
            alert("Image upload failed!");
            return "";
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = eventData.image;
            if (file) imageUrl = await handleImageUpload();

            
            // Convert event_date to proper format
            const formattedDate = new Date(eventData.event_date).toISOString(); 

            const finalEventData = { ...eventData, image: imageUrl, event_date: formattedDate };


            await axios.post("http://localhost:8084/namdevevents/events/", finalEventData);
            alert("Event added successfully!");

            setEventData({
                name: "",
                description: "",
                event_date: "",
                venue: "",
                address: "",
                city: "",
                state: "",
                zip_code: "",
                country: "",
                organizer: "",
                email: "",
                phone: "",
                category: "Cultural",
                capacity: "",
                attendees_registered: "",
                status: "Scheduled",
                image: "",
                registration_link: "",
                is_online: false,
                ticket_price: "",
            });
            setFile(null);
        } catch (error) {
            console.error("Error saving event:", error);
            alert("Failed to save event!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add_new_event">
            <h2>Add New Event</h2>
            <form onSubmit={handleSubmit} className="form">
                <TextField label="Event Name" name="name" value={eventData.name} onChange={handleChange} required fullWidth />
                <TextField label="Description" name="description" value={eventData.description} onChange={handleChange} multiline rows={3} fullWidth />
                <TextField type="datetime-local" name="event_date" value={eventData.event_date} onChange={handleChange} fullWidth required />
                <TextField label="Venue" name="venue" value={eventData.venue} onChange={handleChange} required fullWidth />
                <TextField label="Address" name="address" value={eventData.address} onChange={handleChange} fullWidth />
                <TextField label="City" name="city" value={eventData.city} onChange={handleChange} fullWidth />
                <TextField label="State" name="state" value={eventData.state} onChange={handleChange} fullWidth />
                <TextField label="Zip Code" name="zip_code" value={eventData.zip_code} onChange={handleChange} fullWidth />
                <TextField label="Country" name="country" value={eventData.country} onChange={handleChange} fullWidth />
                <TextField label="Organizer" name="organizer" value={eventData.organizer} onChange={handleChange} fullWidth />
                <TextField type="email" label="Email" name="email" value={eventData.email} onChange={handleChange} fullWidth />
                <TextField label="Phone" name="phone" value={eventData.phone} onChange={handleChange} fullWidth />
                
                <CategorySelection eventData={eventData} handleChange={handleChange} />

                <TextField type="number" label="Capacity" name="capacity" value={eventData.capacity} onChange={handleChange} fullWidth />
                <TextField type="number" label="Attendees Registered" name="attendees_registered" value={eventData.attendees_registered} onChange={handleChange} fullWidth />
                <TextField label="Registration Link" name="registration_link" value={eventData.registration_link} onChange={handleChange} fullWidth />
                
                <FormControlLabel control={<Checkbox name="is_online" checked={eventData.is_online} onChange={handleChange} />} label="Online Event" />

                <TextField type="number" label="Ticket Price" name="ticket_price" value={eventData.ticket_price} onChange={handleChange} fullWidth />

                <label>Upload Event Image:</label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />

                <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                    {loading ? "Saving..." : "Submit Event"}
                </Button>
            </form>
        </div>
    );
};

export default AddNewEvent;
