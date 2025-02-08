import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import man1 from '../../Images/man1.jpg';
import man2 from '../../Images/man2.jpg';
import man3 from '../../Images/man3.jpg';
import man4 from '../../Images/man4.jpg';
import woman1 from '../../Images/woman1.jpg';
import woman2 from '../../Images/woman2.jpg';
import './datatable.scss';

function DataTable() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    
    useEffect(() => {
        fetchUsers(page, pageSize);
    }, [page, pageSize]);

    const fetchUsers = async (page, limit) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch(`http://localhost:8084/user/users/?page=${page}&limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const result = await response.json();
                
                // Map API response to DataGrid structure
                const formattedData = result.data.map((user, index) => ({
                    id: user.ID, 
                    username: user.name || 'Unknown',
                    email: user.email,
                    age: user.age,
                    phoneNumbers:user.phoneNumbers,
                    status: user.status || 'N/A',
                    image: [man1, man2, man3, man4, woman1, woman2][index % 6],
                }));

                setData(formattedData);
                setTotalPages(result.totalPages);
                setTotalRecords(result.totalRecords);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDlt = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 100,
            renderCell: (param) => (
                <div className="userr">
                    <img src={param.row.image} alt="User" className="userr_image" />
                    {param.row.id}
                </div>
            ),
        },
        { field: 'username', headerName: 'Username', width: 180 },
        { field: 'email', headerName: 'Email', width: 280 },
        { field: 'age', headerName: 'Age', width: 120 },
        { field: 'phoneNumbers', headerName: 'Phone Number', width: 150 },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (param) => (
                <div className={`status ${param.row.status}`}>{param.row.status}</div>
            ),
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 170,
            renderCell: (params) => (
                <div className="actionn">
                    <Link to={`/users/${params.row.id}`}>
                        <button type="button" className="view_btn">
                            View {params.row.id}
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
            ),
        },
    ];

    return (
        <div className="data_table">
            <DataGrid
                className="data_grid"
                rows={data}
                columns={columns}
                paginationMode="server"
                rowCount={totalRecords}
                pageSize={pageSize}
                rowsPerPageOptions={[5, 10, 20]}
                page={page - 1} // MUI uses zero-based indexing
                onPageChange={(newPage) => setPage(newPage + 1)} // Convert back to one-based index
                onPageSizeChange={(newSize) => setPageSize(newSize)}
                checkboxSelection
            />
        </div>
    );
}

export default DataTable;
