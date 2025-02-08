import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./achievementsTable.scss";

const API_URL = "http://localhost:8084/brilliantstudent/achievements/"; // Adjust API URL
const DEFAULT_IMAGE = "https://via.placeholder.com/50"; // Placeholder for missing images

function AchievementsTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_URL}?page=${page}&limit=10`);

        if (Array.isArray(response.data.data)) {
          setData(response.data.data);
          setTotalPages(response.data.totalPages || 1);
        } else {
          setError("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  if (loading) return <p>Loading achievements...</p>;
  if (error) return <p>Error: {error}</p>;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="achievements table">
          <TableHead>
            <TableRow>
              <TableCell className="table_cell">Image</TableCell>
              <TableCell className="table_cell">Name</TableCell>
              <TableCell className="table_cell">Type</TableCell>
              <TableCell className="table_cell">Description</TableCell>
              <TableCell className="table_cell">Date</TableCell>
              <TableCell className="table_cell">Status</TableCell>
              <TableCell className="table_cell">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: "center" }}>
                  No achievements found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="table_cell">
                    <img
                      src={row.image ? `${row.image}` : DEFAULT_IMAGE}
                      alt="Achievement"
                      style={{ width: 50, height: 50, borderRadius: "50%" }}
                    />
                  </TableCell>
                  <TableCell className="table_cell">{row.name}</TableCell>
                  <TableCell className="table_cell">{row.achievement_type}</TableCell>
                  <TableCell className="table_cell">{row.description}</TableCell>
                  <TableCell className="table_cell">{row.date_of_achievement}</TableCell>
                  <TableCell className="table_cell">
                    <span className={`status ${row.status}`}>{row.status || "NA"}</span>
                  </TableCell>
                  {/* Action Buttons */}
                  <TableCell className="table_cell">
                    <div className="action_buttons">
                      <Link to={`/achievements/${row.id}`}>
                        <button type="button" className="view_btn">
                          View
                        </button>
                      </Link>
                      <button type="button" className="delete_btn">
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

export default AchievementsTable;
