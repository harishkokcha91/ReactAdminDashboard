import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import "./AddNewBusiness.scss";
import CategorySelectionBusiness from "./CategorySelectionBusiness";

const AddNewBusiness = () => {
    const [businessData, setBusinessData] = useState({
        name: "",
        description: "",
        category: "",
        owner: "",
        email: "",
        phone: "",
        location: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        website: "",
        image: "",
        status: "Active",
        is_verified: false,
    });

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBusinessData({ ...businessData, [name]: type === "checkbox" ? checked : value });
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
            let imageUrl = businessData.image;
            if (file) imageUrl = await handleImageUpload();

            const finalBusinessData = { ...businessData, image: imageUrl };

            await axios.post("http://localhost:8084/namdevbusinesses/businesses/", finalBusinessData);
            alert("Business added successfully!");

            setBusinessData({
                name: "",
                description: "",
                category: "",
                owner: "",
                email: "",
                phone: "",
                location: "",
                address: "",
                city: "",
                state: "",
                zip_code: "",
                country: "",
                website: "",
                image: "",
                status: "Active",
                is_verified: false,
            });
            setFile(null);
        } catch (error) {
            console.error("Error saving business:", error);
            alert("Failed to save business!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add_new_business">
            <h2>Add New Business</h2>
            <form onSubmit={handleSubmit} className="form">
                <TextField label="Business Name" name="name" value={businessData.name} onChange={handleChange} required fullWidth />
                <TextField label="Description" name="description" value={businessData.description} onChange={handleChange} multiline rows={3} fullWidth />
                
                <CategorySelectionBusiness businessData={businessData} handleChange={handleChange} />

                <TextField label="Owner Name" name="owner" value={businessData.owner} onChange={handleChange} required fullWidth />
                <TextField type="email" label="Email" name="email" value={businessData.email} onChange={handleChange} fullWidth />
                <TextField label="Phone" name="phone" value={businessData.phone} onChange={handleChange} fullWidth />

                <TextField label="Location" name="location" value={businessData.location} onChange={handleChange} fullWidth />
                <TextField label="Address" name="address" value={businessData.address} onChange={handleChange} fullWidth />
                <TextField label="City" name="city" value={businessData.city} onChange={handleChange} fullWidth />
                <TextField label="State" name="state" value={businessData.state} onChange={handleChange} fullWidth />
                <TextField label="Zip Code" name="zip_code" value={businessData.zip_code} onChange={handleChange} fullWidth />
                <TextField label="Country" name="country" value={businessData.country} onChange={handleChange} fullWidth />
                <TextField label="Website" name="website" value={businessData.website} onChange={handleChange} fullWidth />

                <FormControlLabel control={<Checkbox name="is_verified" checked={businessData.is_verified} onChange={handleChange} />} label="Verified Business" />

                <label>Upload Business Logo:</label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />

                <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                    {loading ? "Saving..." : "Submit Business"}
                </Button>
            </form>
        </div>
    );
};

export default AddNewBusiness;
