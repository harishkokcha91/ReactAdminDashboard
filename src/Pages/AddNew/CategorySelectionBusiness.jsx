import InfoIcon from "@mui/icons-material/Info";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import React, { useState } from "react";

// Event categories with descriptions for the popup
const businessCategories = [
    { type: "Retail & E-commerce", description: "Shops, online stores, supermarkets, and wholesale businesses." },
    { type: "Food & Hospitality", description: "Restaurants, catering services, hotels, and event management." },
    { type: "Healthcare & Wellness", description: "Hospitals, clinics, pharmacies, yoga centers, and fitness studios." },
    { type: "Education & Coaching", description: "Schools, coaching institutes, online courses, and skill development centers." },
    { type: "Technology & IT Services", description: "Software companies, IT consultants, web development, and digital marketing agencies." },
    { type: "Finance & Legal", description: "Banks, insurance firms, financial advisors, and legal consultancy services." },
    { type: "Real Estate & Construction", description: "Property dealers, builders, architects, and interior designers." },
    { type: "Manufacturing & Industrial", description: "Factories, production units, export/import businesses, and engineering firms." },
    { type: "Entertainment & Media", description: "Photography, videography, music production, and advertising agencies." },
    { type: "Automobile & Transportation", description: "Car dealerships, repair services, logistics, and travel agencies." },
    { type: "Fashion & Lifestyle", description: "Boutiques, salons, jewelry stores, and handmade products." },
    { type: "Agriculture & Farming", description: "Dairy farms, organic farming, fertilizers, and agricultural machinery." },
    { type: "Handicrafts & Small Businesses", description: "Local artisans, handmade products, and small-scale businesses." }
];


const CategorySelection = ({ businessData, handleChange }) => {
    const [open, setOpen] = useState(false);

    return (
        <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Select 
                    name="category" 
                    value={businessData.category} 
                    onChange={handleChange} 
                    displayEmpty
                    style={{ flex: 1 }}
                >
                    <MenuItem value="" disabled>Select Category</MenuItem>
                    {businessCategories.map((item) => (
                        <MenuItem key={item.type} value={item.type}>
                            {item.type}
                        </MenuItem>
                    ))}
                </Select>
                {/* Info Icon Button */}
                <IconButton onClick={() => setOpen(true)} style={{ marginLeft: "8px" }}>
                    <InfoIcon color="primary" />
                </IconButton>
            </div>

            {/* Popup Dialog for Category Descriptions */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Event Categories</DialogTitle>
                <DialogContent>
                    {businessCategories.map((item) => (
                        <p key={item.type}>
                            <strong>{item.type}:</strong> {item.description}
                        </p>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </FormControl>
    );
};

export default CategorySelection;
