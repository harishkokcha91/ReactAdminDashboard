import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import "./AddNewBusiness.scss"; // you can reuse same CSS

const AddNewProfile = () => {
    const [profileData, setProfileData] = useState({
        name: "",
        profileFor: "",
        dateOfBirth: "",
        birthPlace: "",
        currentLocation: "",
        annualIncome: "",
        occupation: "",
        qualification: "",
        maritalStatus: "",
        complexion: "",
        height: "",
        manglik: false,
        fatherName: "",
        fatherOccupation: "",
        motherName: "",
        motherOccupation: "",
        gotraSelf: "",
        gotraMother: "",
        gotraGrandMother: "",
        siblings: "",
        phoneNumbers: "",
        address: "",
        user_id: "",
    });

    const [loading, setLoading] = useState(false);

    // handle input
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfileData({ ...profileData, [name]: type === "checkbox" ? checked : value });
    };

    // submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post("http://localhost:8084/profile/matrimonialProfiles/profiles/", profileData);
            alert("Profile added successfully!");

            setProfileData({
                name: "",
                profileFor: "",
                dateOfBirth: "",
                birthPlace: "",
                currentLocation: "",
                annualIncome: "",
                occupation: "",
                qualification: "",
                maritalStatus: "",
                complexion: "",
                height: "",
                manglik: false,
                fatherName: "",
                fatherOccupation: "",
                motherName: "",
                motherOccupation: "",
                gotraSelf: "",
                gotraMother: "",
                gotraGrandMother: "",
                siblings: "",
                phoneNumbers: "",
                address: "",
                user_id: "",
            });

        } catch (error) {
            console.error("Error saving profile:", error);
            alert("Failed to save profile!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add_new_business">
            <h2>Add New Profile</h2>
            <form onSubmit={handleSubmit} className="form">

                <TextField label="Name" name="name" value={profileData.name} onChange={handleChange} required fullWidth />
                <TextField label="Profile For" name="profileFor" value={profileData.profileFor} onChange={handleChange} fullWidth />
                <TextField type="date" label="Date of Birth" name="dateOfBirth" InputLabelProps={{ shrink: true }} value={profileData.dateOfBirth} onChange={handleChange} fullWidth />
                <TextField label="Birth Place" name="birthPlace" value={profileData.birthPlace} onChange={handleChange} fullWidth />
                <TextField label="Current Location" name="currentLocation" value={profileData.currentLocation} onChange={handleChange} fullWidth />
                <TextField label="Annual Income" name="annualIncome" value={profileData.annualIncome} onChange={handleChange} fullWidth />
                <TextField label="Occupation" name="occupation" value={profileData.occupation} onChange={handleChange} fullWidth />
                <TextField label="Qualification" name="qualification" value={profileData.qualification} onChange={handleChange} fullWidth />
                <TextField label="Marital Status" name="maritalStatus" value={profileData.maritalStatus} onChange={handleChange} fullWidth />
                <TextField label="Complexion" name="complexion" value={profileData.complexion} onChange={handleChange} fullWidth />
                <TextField label="Height" name="height" value={profileData.height} onChange={handleChange} fullWidth />
                <FormControlLabel control={<Checkbox name="manglik" checked={profileData.manglik} onChange={handleChange} />} label="Manglik" />
                <TextField label="Father Name" name="fatherName" value={profileData.fatherName} onChange={handleChange} fullWidth />
                <TextField label="Father Occupation" name="fatherOccupation" value={profileData.fatherOccupation} onChange={handleChange} fullWidth />
                <TextField label="Mother Name" name="motherName" value={profileData.motherName} onChange={handleChange} fullWidth />
                <TextField label="Mother Occupation" name="motherOccupation" value={profileData.motherOccupation} onChange={handleChange} fullWidth />
                <TextField label="Gotra Self" name="gotraSelf" value={profileData.gotraSelf} onChange={handleChange} fullWidth />
                <TextField label="Gotra Mother" name="gotraMother" value={profileData.gotraMother} onChange={handleChange} fullWidth />
                <TextField label="Gotra Grand Mother" name="gotraGrandMother" value={profileData.gotraGrandMother} onChange={handleChange} fullWidth />
                <TextField label="Siblings" name="siblings" value={profileData.siblings} onChange={handleChange} fullWidth />
                <TextField label="Phone Numbers" name="phoneNumbers" value={profileData.phoneNumbers} onChange={handleChange} fullWidth />
                <TextField label="Address" name="address" value={profileData.address} onChange={handleChange} fullWidth />
                <TextField label="User ID" name="user_id" value={profileData.user_id} onChange={handleChange} fullWidth />

                <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                    {loading ? "Saving..." : "Submit Profile"}
                </Button>
            </form>
        </div>
    );
};

export default AddNewProfile;
