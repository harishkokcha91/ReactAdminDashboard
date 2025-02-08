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
const eventCategories = [
    { type: "Religious & Spiritual", description: "Events like Jayanti celebrations, Bhajan Sandhya, Kirtan Mahotsav, and pilgrimages." },
    { type: "Educational & Career", description: "Includes scholarships, career guidance, entrepreneurship workshops, and skill development." },
    { type: "Social Welfare & Community", description: "Blood donation, food distribution, health checkups, and charity events." },
    { type: "Matrimonial & Networking", description: "Matrimonial meets, business networking, and mass marriage ceremonies." },
    { type: "Cultural & Traditional", description: "Annual community meets, folk dance/music festivals, and drama nights." },
    { type: "Youth & Sports", description: "Cricket, Kabaddi tournaments, marathons, and inter-community sports events." },
    { type: "Business & Tech", description: "Startup pitch competitions, business expos, and tech innovation meetups." }
];

const CategorySelection = ({ eventData, handleChange }) => {
    const [open, setOpen] = useState(false);

    return (
        <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Select 
                    name="category" 
                    value={eventData.category} 
                    onChange={handleChange} 
                    displayEmpty
                    style={{ flex: 1 }}
                >
                    <MenuItem value="" disabled>Select Category</MenuItem>
                    {eventCategories.map((item) => (
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
                    {eventCategories.map((item) => (
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
