import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './tableList.scss';

const TOKEN = '{{token}}';
const DEFAULT_IMAGE = "https://via.placeholder.com/50";

function EventList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError(null);

            const API_URL = `http://localhost:8084/namdevevents/events/?page=${page}&limit=10`;

            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });

                if (Array.isArray(response.data.data)) {
                    setEvents(response.data.data);
                    setTotalPages(response.data.totalPages || 1);
                } else {
                    setError('Invalid response format');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [page]);

    if (loading) return <p>Loading events...</p>;
    if (error) return <p>Error: {error}</p>;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleDelete = (id) => {
        setEvents(events.filter((event) => event.id !== id));
    };

    return (
        <div className="table_list">
            <TableContainer component={Paper} className="table_container">
                <Table sx={{ minWidth: 650 }} aria-label="event table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table_cell">Image</TableCell>
                            <TableCell className="table_cell">Name</TableCell>
                            <TableCell className="table_cell">Date</TableCell>
                            <TableCell className="table_cell">Venue</TableCell>
                            <TableCell className="table_cell">City</TableCell>
                            <TableCell className="table_cell">Organizer</TableCell>
                            <TableCell className="table_cell">Phone</TableCell>
                            <TableCell className="table_cell">Status</TableCell>
                            <TableCell className="table_cell">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} style={{ textAlign: 'center' }}>
                                    No events found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            events.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell className="table_cell">
                                        <img
                                            src={event.image || DEFAULT_IMAGE}
                                            alt="Event"
                                            className="profile_image"
                                        />
                                    </TableCell>
                                    <TableCell className="table_cell">{event.name}</TableCell>
                                    <TableCell className="table_cell">{new Date(event.event_date).toLocaleDateString()}</TableCell>
                                    <TableCell className="table_cell">{event.venue}</TableCell>
                                    <TableCell className="table_cell">{event.city}</TableCell>
                                    <TableCell className="table_cell">{event.organizer}</TableCell>
                                    <TableCell className="table_cell">{event.phone}</TableCell>
                                    <TableCell className="table_cell">
                                        <span className={`status ${event.status?.toLowerCase() || "pending"}`}>
                                            {event.status || "Pending"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="table_cell">
                                        <div className="actionn">
                                            <Link to={`/events/${event.id}`}>
                                                <button type="button" className="viewF_btn">
                                                    View
                                                </button>
                                            </Link>
                                            <button
                                                type="button"
                                                className="delete_btn"
                                                onClick={() => handleDelete(event.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Controls */}
            <div className="pagination_container">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    siblingCount={1}
                    boundaryCount={1}
                    showFirstButton
                    showLastButton
                />
            </div>
        </div>
    );
}

export default EventList;
