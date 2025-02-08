import axios from "axios";
import React, { useState } from "react";
import '../AddNew/New.scss';
import styles from "./ProfileForm.module.css";
const ProfileForm = () => {
  const resetForm = () => {
    setUserDetails({
      userId: "",
      name: "",
      age: 0,
      email: "",
      phoneNumbers: "",
      status: ""
    });
    
    setProfile({
      user_id: 0,
      name: "",
      dateOfBirth: "",
      birthPlace: "",
      height: "",
      complexion: "",
      gotraSelf: "",
      gotraMother: "",
      gotraGrandMother: "",
      manglik: false,
      fatherName: "",
      fatherOccupation: "",
      motherName: "",
      motherOccupation: "",
      siblings: "",
      qualification: "",
      occupation: "",
      annualIncome: "",
      maritalStatus: "",
      address: "",
      currentLocation: "",
      phoneNumbers: ""
    });
  
    setSelectedFile(null);
    setImagePreview(null);
  };
  const [userDetails, setUserDetails] = useState({
    userId: "",
    name: "",
    age: 0,
    email: "",
    phoneNumbers: "",
    status: ""
  });

  const [profile, setProfile] = useState({
    user_id:0,
    name: "",
    dateOfBirth: "",
    birthPlace: "",
    height: "",
    complexion: "",
    gotraSelf: "",
    gotraMother: "",
    gotraGrandMother: "",
    manglik: false,
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    siblings: "",
    qualification: "",
    occupation: "",
    annualIncome: "",
    maritalStatus: "",
    address: "",
    currentLocation: "",
    phoneNumbers: ""
  });
  const [imagePreview, setImagePreview] = useState(null);
  const handleUserDetailsChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const [selectedFile, setSelectedFile] = useState(null); // Add this line

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Store the file in state
      setImagePreview(URL.createObjectURL(file)); // Set image preview URL
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User Details:", userDetails);
    console.log("Profile Data:", profile);
  
    try {
      // **User Registration API Call**
      const userResponse = await axios.post(
        "http://localhost:8084/auth/registerOne",
        userDetails,
        {
          headers: { "Content-Type": "application/json" }
        }
      );
  
      console.log("User Registered:", userResponse.data);
  
      // Extract User ID from Response
      const user_id = userResponse.data.user.ID;
      setProfile((prevProfile) => ({ ...prevProfile, user_id }));
  
      let imageUrl = ""; // Store uploaded image URL
  
      // **Upload Image First if Selected**
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
  
        try {
          const uploadResponse = await axios.post(
            "http://localhost:8084/image/upload",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" }
            }
          );
          console.log("Image Uploaded:", uploadResponse.data);
          imageUrl = uploadResponse.data.image_url; // Set uploaded image URL
        } catch (uploadError) {
          console.error(
            "Image Upload Error:",
            uploadError.response?.data || uploadError.message
          );
          alert("Image upload failed! Profile not submitted.");
          return; // Stop execution if image upload fails
        }
      }
  
      // **Profile Creation API Call (With Image URL if Available)**
      const profileResponse = await axios.post(
        "http://localhost:8084/profile/matrimonialProfiles/",
        { ...profile, user_id, image: imageUrl }, // Attach image URL if available
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer {{token}}`
          }
        }
      );
  
      console.log("Profile Created:", profileResponse.data);
  
      // **Reset form after successful submission**
      resetForm();
      alert("Registration and Profile Creation Successful!");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Something went wrong. Please try again.");
    }
  };
  
  return (
    <div className={styles.container}>
      <h2>Profile Form</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.block}>
          <h3>User Details</h3>
          <label>Name:</label>
          <input type="text" name="name" value={userDetails.name} onChange={handleUserDetailsChange} required />
          <label>Age:</label>
          <input type="number" name="age" value={userDetails.age} onChange={(e) => setUserDetails({ ...userDetails, age: parseInt(e.target.value, 10) || 0 })} required />
          <label>Email:</label>
          <input type="email" name="email" value={userDetails.email} onChange={handleUserDetailsChange} required />
          <label>Phone Numbers:</label>
          <input type="text" name="phoneNumbers" value={userDetails.phoneNumbers} onChange={handleUserDetailsChange} required />
        </div>
        <div className={styles.block}>
          <h3>Profile Details</h3>
          <label>Profile For:</label>
          <select name="profileFor" value={profile.profileFor} onChange={handleProfileChange} required>
            <option value="">Select Profile For</option>
            <option value="Myself">Myself</option>
            <option value="My Daughter">My Daughter</option>
            <option value="My Son">My Son</option>
          </select>
          <label>Profile Image:</label>
          <input 
            type="file" 
            name="image" 
            accept="image/*" 
            onChange={handleImageChange} 
          />
          {imagePreview && (
            <div className="image">
              <h4>Image Preview:</h4>
              <img src={imagePreview} alt="Profile Preview" className={styles.imagePreview}  />
              {/* className={styles.imagePreview */}
            </div>
          )}
          <label>Name:</label>
          <input type="text" name="name" value={profile.name} onChange={handleProfileChange} required />
          <label>Date of Birth:</label>
          <input type="date" name="dateOfBirth" value={profile.dateOfBirth} onChange={handleProfileChange} required />
          <label>Birth Place:</label>
          <input type="text" name="birthPlace" value={profile.birthPlace} onChange={handleProfileChange} required />
          <label>Height:</label>
          <input type="text" name="height" value={profile.height} onChange={handleProfileChange} required />
          <label>Complexion:</label>
          <select name="complexion" value={profile.complexion} onChange={handleProfileChange} required>
            <option value="">Select Complexion</option>
            <option value="fair">Fair</option>
            <option value="medium">Medium</option>
            <option value="dark">Dark</option>
          </select>
          <label>Gotra (Self):</label>
          <input type="text" name="gotraSelf" value={profile.gotraSelf} onChange={handleProfileChange} required />
          <label>Gotra (Mother):</label>
          <input type="text" name="gotraMother" value={profile.gotraMother} onChange={handleProfileChange} required />
          <label>Gotra (Grandmother):</label>
          <input type="text" name="gotraGrandMother" value={profile.gotraGrandMother} onChange={handleProfileChange} required />
          <label>Manglik:</label>
          <input type="checkbox" name="manglik" checked={profile.manglik} onChange={handleProfileChange} />
          <label>Father's Name:</label>
          <input type="text" name="fatherName" value={profile.fatherName} onChange={handleProfileChange} required />
          <label>Father's Occupation:</label>
          <input type="text" name="fatherOccupation" value={profile.fatherOccupation} onChange={handleProfileChange} required />
          <label>Mother's Name:</label>
          <input type="text" name="motherName" value={profile.motherName} onChange={handleProfileChange} required />
          <label>Mother's Occupation:</label>
          <input type="text" name="motherOccupation" value={profile.motherOccupation} onChange={handleProfileChange} required />
          <label>Siblings:</label>
          <input type="text" name="siblings" value={profile.siblings} onChange={handleProfileChange} required />
          <label>Qualification:</label>
          <input type="text" name="qualification" value={profile.qualification} onChange={handleProfileChange} required />
          <label>Occupation:</label>
          <input type="text" name="occupation" value={profile.occupation} onChange={handleProfileChange} required />
          <label>Annual Income:</label>
          <input type="text" name="annualIncome" value={profile.annualIncome} onChange={handleProfileChange} required />
          <label>Marital Status:</label>
          <select name="maritalStatus" value={profile.maritalStatus} onChange={handleProfileChange} required>
            <option value="">Select Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
          <label>Address:</label>
          <input type="text" name="address" value={profile.address} onChange={handleProfileChange} required />
          <label>Current Location:</label>
          <input type="text" name="currentLocation" value={profile.currentLocation} onChange={handleProfileChange} required />
          <label>Phone Numbers:</label>
          <input type="text" name="phoneNumbers" value={profile.phoneNumbers} onChange={handleProfileChange} required />
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default ProfileForm;
