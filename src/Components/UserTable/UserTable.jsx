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
import './userTable.scss';

const DEFAULT_IMAGE = "https://via.placeholder.com/50";

function UserTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        fetchUsers(page, 10);
    }, [page]);

    const fetchUsers = async (page, limit) => {
        const token = localStorage.getItem('authToken');
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:8084/user/users/?page=${page}&limit=${limit}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.data) {
                setData(response.data.data);
                setTotalPages(response.data.totalPages || 1);
                setTotalRecords(response.data.totalRecords || 0);
            } else {
                setError("Invalid response format");
            }
        } catch (err) {
            console.error("Error fetching users:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        setData(data.filter((user) => user.ID !== id));
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <TableContainer component={Paper} className="table_list">
                <Table sx={{ minWidth: 650 }} aria-label="user table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table_cell">Image</TableCell>
                            <TableCell className="table_cell">Username</TableCell>
                            <TableCell className="table_cell">Email</TableCell>
                            <TableCell className="table_cell">Age</TableCell>
                            <TableCell className="table_cell">Phone</TableCell>
                            <TableCell className="table_cell">Status</TableCell>
                            <TableCell className="table_cell">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} style={{ textAlign: 'center' }}>No users found.</TableCell>
                            </TableRow>
                        ) : (
                            data.map((user, index) => (
                                <TableRow key={user.ID}>
                                    <TableCell className="table_cell">
                                        <img
                                            src={DEFAULT_IMAGE} 
                                            alt="User"
                                            style={{ width: 50, height: 50, borderRadius: "50%" }}
                                        />
                                    </TableCell>
                                    <TableCell className="table_cell">{user.name || 'Unknown'}</TableCell>
                                    <TableCell className="table_cell">{user.email}</TableCell>
                                    <TableCell className="table_cell">{user.age}</TableCell>
                                    <TableCell className="table_cell">{user.phoneNumbers}</TableCell>
                                    <TableCell className="table_cell">
                                        <span className={`status ${user.status}`}>{user.status || "N/A"}</span>
                                    </TableCell>
                                    <TableCell className="table_cell">
                                        <div className="actionn">
                                            <Link to={`/users/${user.ID}`}>
                                                <button type="button" className="viewF_btn">View</button>
                                            </Link>
                                            
                                            <button
                                                type="button"
                                                className="delete_btn"
                                                onClick={() => handleDelete(user.ID)}
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

export default UserTable;
