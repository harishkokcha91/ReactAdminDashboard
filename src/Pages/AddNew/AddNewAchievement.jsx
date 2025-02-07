import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import InfoIcon from '@mui/icons-material/Info'; // Info icon for popup
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Select } from '@mui/material';
import axios from "axios";
import React, { useState } from 'react';
import Input from '../../Components/Input/Input';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import noImage from '../../Images/photo-camera.png';
import './New.scss';

const achievementTypes = [
    { type: 'Academic', description: 'Excellence in studies, scholarships, Olympiads, etc.' },
    { type: 'Sports', description: 'Winning tournaments, medals, or records in athletics.' },
    { type: 'Cultural', description: 'Achievements in art, music, dance, or literature.' },
    { type: 'Professional', description: 'Work-related recognition, promotions, or patents.' },
    { type: 'Social Service', description: 'Contributions to NGOs, volunteering, or community service.' },
    { type: 'Innovation & Research', description: 'Discoveries, inventions, or published papers.' },
    { type: 'Entrepreneurship', description: 'Startups, business excellence, or awards.' },
    { type: 'Leadership', description: 'Holding key positions, influencing change, or mentoring.' },
    { type: 'Technology', description: 'Software development, hackathons, coding competitions.' },
    { type: 'Medical & Healthcare', description: 'Contributions in medicine, surgeries, discoveries.' },
    { type: 'Environmental & Sustainability', description: 'Green initiatives, conservation efforts.' },
    { type: 'Military & Defense', description: 'Recognition in armed forces, bravery awards.' },
    { type:'Government & Administration',description:'Civil services, governance excellence.'},
    { type:'Media & Entertainment' , description:'Acting, filmmaking, broadcasting.'},
    { type:'Personal Milestones',description: ' Completing marathons, personal achievements.'}
];

function AddNewAchievement() {
    const [achievementData, setAchievementData] = useState({
        name: '',
        achievement_type: '',
        achievement: '',
        description: '',
        date_of_achievement: '',
        image: ''
    });

    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false); // Popup state

    const handleChange = (e) => {
        setAchievementData({ ...achievementData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = achievementData.image;
            
            // If a new file is uploaded, send it to the server
            if (file) {
                const formData = new FormData();
                formData.append('file', file);

                const imageUploadRes = await axios.post('https://api.example.com/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                imageUrl = imageUploadRes.data.imageUrl; // Assuming API returns the image URL
            }

            const payload = {
                ...achievementData,
                image: imageUrl,
            };

            const response = await axios.post('http://localhost:8084/brilliantstudent/achievements/', payload);
            console.log('Saved Successfully:', response.data);

            alert('Achievement added successfully!');
            setAchievementData({
                name: '',
                achievement_type: '',
                achievement: '',
                description: '',
                date_of_achievement: '',
                image: '',
                status: '',
            });
            setFile(null);
        } catch (error) {
            console.error('Error saving achievement:', error);
            alert('Failed to save achievement!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add_new">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="new_page">
                <Navbar />

                <div className="new_page_main">
                    <div className="new_page_content">
                        <div className="image">
                            <p className="add_new_user">Add New Achievement</p>
                            <img src={file ? URL.createObjectURL(file) : noImage} alt="" />
                        </div>

                        <form onSubmit={handleSubmit} className="form">
                            <div className="form_inp">
                                <label htmlFor="file">
                                    Upload: <DriveFolderUploadIcon className="file_icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>

                            {/* Achievement Type Dropdown with Info Icon */}
                            <div className="form_group">
                                <label>Achievement Type</label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Select
                                        name="achievement_type"
                                        value={achievementData.achievement_type}
                                        onChange={handleChange}
                                        displayEmpty
                                        style={{ flex: 1 }}
                                    >
                                        <MenuItem value="" disabled>Select Achievement Type</MenuItem>
                                        {achievementTypes.map((item) => (
                                            <MenuItem key={item.type} value={item.type}>
                                                {item.type}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                    {/* Info Icon Button */}
                                    <IconButton onClick={() => setOpen(true)} style={{ marginLeft: '8px' }}>
                                        <InfoIcon color="primary" />
                                    </IconButton>
                                </div>
                            </div>

                            <Input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={achievementData.name}
                                onChange={handleChange}
                            />
                            <Input
                                type="text"
                                name="achievement"
                                placeholder="Achievement"
                                value={achievementData.achievement}
                                onChange={handleChange}
                            />
                            <Input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={achievementData.description}
                                onChange={handleChange}
                            />
                            <Input
                                type="date"
                                name="date_of_achievement"
                                placeholder="Date of Achievement"
                                value={achievementData.date_of_achievement}
                                onChange={handleChange}
                            />

                            <button type="submit" className="submit_btn">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Popup Window for Achievement Descriptions */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Achievement Types</DialogTitle>
                <DialogContent>
                    {achievementTypes.map((item) => (
                        <p key={item.type}>
                            <strong>{item.type}:</strong> {item.description}
                        </p>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddNewAchievement;
