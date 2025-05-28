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
import styles from './ProfileList.scss';

const TOKEN = '{{token}}';
const DEFAULT_IMAGE = "https://via.placeholder.com/50"; // Placeholder for missing images

function ProfileList({ userId }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            console.log(userId)
            const API_URL = userId
                ? `http://localhost:8084/profile/matrimonialProfiles/byuserId/${userId}?page=${page}&limit=10`
                : `http://localhost:8084/profile/matrimonialProfiles/?page=${page}&limit=10`;
                console.log(API_URL)
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });

                if (Array.isArray(response.data.data)) {
                    setData(response.data.data);
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

        fetchData();
    }, [userId, page]);

    if (loading) return <p>Loading profiles...</p>;
    if (error) return <p>Error: {error}</p>;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const getStatusClass = (status) => {
        console.log(status)
        switch (status.toLowerCase()) {
          case "pending":
            return styles.pending;
          case "approved":
            return styles.approved;
          case "rejected":
            return styles.rejected;
          default:
            return "";
        }
      };

    return (
        <div>
            <TableContainer component={Paper} className="table_list">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table_cell">Image</TableCell>
                            <TableCell className="table_cell">Name</TableCell>
                            <TableCell className="table_cell">Date of Birth</TableCell>
                            <TableCell className="table_cell">Height</TableCell>
                            <TableCell className="table_cell">Annual Income</TableCell>
                            <TableCell className="table_cell">Location</TableCell>
                            <TableCell className="table_cell">Phone</TableCell>
                            <TableCell className="table_cell">Status</TableCell>
                            <TableCell className="table_cell">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={15} style={{ textAlign: 'center' }}>
                                    No profiles found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell className="table_cell">
                                        <img 
                                            src={"http://localhost:8084/profile/"+row.image || DEFAULT_IMAGE} 
                                            alt="Profile" 
                                            style={{ width: 50, height: 50, borderRadius: "50%" }} 
                                        />
                                    </TableCell>
                                    <TableCell className="table_cell">{row.name}</TableCell>
                                    <TableCell className="table_cell">{row.dateOfBirth}</TableCell>
                                    <TableCell className="table_cell">{row.height}</TableCell>
                                    <TableCell className="table_cell">{row.annualIncome}</TableCell>
                                    <TableCell className="table_cell">{row.currentLocation}</TableCell>
                                    <TableCell className="table_cell">{row.phoneNumbers}</TableCell>
                                    <TableCell className="table_cell">
                                    <span className={`status ${row.status}`}>{row.status || "Pending"}</span>
                                    </TableCell>
                                    
                                    {/* Action Buttons */}
                                    <TableCell className="table_cell">
                                        <div className="actionn">
                                            
                                            <Link to={`/profiles/${row.id}`}>
                                                <button type="button" className="viewF_btn">
                                                    View {row.id}
                                                </button>
                                            </Link>
                                            <button
                                                type="button"
                                                className="delete_btn"
                                                onClick={() => handleDlt(params.row.id)}
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
    );
}

export default ProfileList;
