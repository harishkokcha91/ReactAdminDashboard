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

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await fetch(`http://localhost:8084/user/users/?page=1&limit=10`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const result = await response.json();
                    // Map API data to match DataGrid requirements
                    const formattedData = result.map((user, index) => ({
                        id: user.user_id, // Map user_id to id for DataGrid
                        username: user.name,
                        email: user.email,
                        age: user.age,
                        status: user.status,
                        // Assign default images based on index
                        image: [man1, man2, man3, man4, woman1, woman2][index % 6], 
                    }));
                    setData(formattedData);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDlt = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

   
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 310,
            renderCell: (param) => (
                <div className="userr">
                    <img src={param.row.image} alt="User" className="userr_image" />
                    {param.row.id}
                </div>
            ),
        },
        {
            field: 'username',
            headerName: 'Username',
            width: 180,
        },
        { field: 'email', headerName: 'Email', width: 280 },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (param) => (
                <div className={`status ${param.row.status}`}>{param.row.status}</div>
            ),
        },
        { field: 'age', headerName: 'Age', width: 120 },
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
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
        </div>
    );
}

export default DataTable;
