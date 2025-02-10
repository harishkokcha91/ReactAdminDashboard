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

function BusinessList() {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchBusinesses = async () => {
            setLoading(true);
            setError(null);

            const API_URL = `http://localhost:8084/namdevbusinesses/businesses/?page=${page}&limit=10`;

            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });

                if (Array.isArray(response.data.data)) {
                    setBusinesses(response.data.data);
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

        fetchBusinesses();
    }, [page]);

    if (loading) return <p>Loading businesses...</p>;
    if (error) return <p>Error: {error}</p>;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleDelete = (id) => {
        setBusinesses(businesses.filter((business) => business.id !== id));
    };

    return (
        <div className="table_list">
            <TableContainer component={Paper} className="table_container">
                <Table sx={{ minWidth: 650 }} aria-label="business table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table_cell">Image</TableCell>
                            <TableCell className="table_cell">Name</TableCell>
                            <TableCell className="table_cell">Type</TableCell>
                            <TableCell className="table_cell">Location</TableCell>
                            <TableCell className="table_cell">Owner</TableCell>
                            <TableCell className="table_cell">Phone</TableCell>
                            <TableCell className="table_cell">Status</TableCell>
                            <TableCell className="table_cell">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {businesses.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} style={{ textAlign: 'center' }}>
                                    No businesses found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            businesses.map((business) => (
                                <TableRow key={business.id}>
                                    <TableCell className="table_cell">
                                        <img
                                            src={business.image || DEFAULT_IMAGE}
                                            alt="Business"
                                            className="profile_image"
                                        />
                                    </TableCell>
                                    <TableCell className="table_cell">{business.name}</TableCell>
                                    <TableCell className="table_cell">{business.category}</TableCell>
                                    <TableCell className="table_cell">{business.location}</TableCell>
                                    <TableCell className="table_cell">{business.owner}</TableCell>
                                    <TableCell className="table_cell">{business.phone}</TableCell>
                                    <TableCell className="table_cell">
                                        <span className={`status ${business.status?.toLowerCase() || "pending"}`}>
                                            {business.status || "Pending"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="table_cell">
                                        <div className="actionn">
                                            <Link to={`/business/${business.ID}`}>
                                                <button type="button" className="viewF_btn">
                                                    View
                                                </button>
                                            </Link>
                                            <button
                                                type="button"
                                                className="delete_btn"
                                                onClick={() => handleDelete(business.id)}
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

export default BusinessList;
