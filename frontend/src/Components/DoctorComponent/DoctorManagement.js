import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Grid,
  Divider,
  Button,
  TextField,
} from "@mui/material";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    dfname: "",
    dlname: "",
    specialty: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedDoctor, setEditedDoctor] = useState({
    dfname: "",
    dlname: "",
    specialty: "",
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const openModal = (doctor) => {
    setEditedDoctor(doctor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditedDoctor({
      dfname: "",
      dlname: "",
      specialty: "",
    });
    setErrorMessage1("");
  };

  // Fetch doctors from backend
  const fetchDoctors = async () => {
    const token = localStorage.getItem("jwt_token");

    try {
      const response = await fetch("http://localhost:8080/doctor/doctors", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error.message);
    }
  };

  // Call fetchDoctors when the component mounts
  useEffect(() => {
    fetchDoctors();
  }, []);

  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewDoctor({
      dfname: "",
      dlname: "",
      specialty: "",
    });
    setErrorMessage("");
  };

  const handleAddDoctor = async () => {
    const token = localStorage.getItem("jwt_token");

    // Check if any required field is empty
    if (!newDoctor.dfname || !newDoctor.dlname || !newDoctor.specialty) {
      setErrorMessage("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/doctor/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newDoctor),
      });

      if (!response.ok) {
        throw new Error("Failed to add doctor");
      }

      const addedDoctor = await response.json();
      setDoctors([...doctors, addedDoctor]);

      // Reset the newDoctor state and clear error message
      setNewDoctor({
        dfname: "",
        dlname: "",
        specialty: "",
      });
      setErrorMessage("");
    } catch (error) {
      // Set error message to be displayed on UI
      setErrorMessage("Error adding doctor. Please try again.");
    }
  };

  const handleEditDoctor = async () => {
    const token = localStorage.getItem("jwt_token");

    // Check if any required field is empty
    if (
      !editedDoctor.dfname ||
      !editedDoctor.dlname ||
      !editedDoctor.specialty
    ) {
      setErrorMessage1("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/doctor/${editedDoctor.did}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedDoctor),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit doctor");
      }

      const updatedDoctor = await response.json();

      // Update the doctors state
      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor.did === editedDoctor.did ? updatedDoctor : doctor
        )
      );

      // Close the modal after successful edit and clear error message
      closeModal();
      setErrorMessage1("");
    } catch (error) {
      // Set error message to be displayed on UI
      setErrorMessage1("Error editing doctor. Please try again.");
    }
  };

  const handleRemoveDoctor = async (id) => {
    const token = localStorage.getItem("jwt_token");

    try {
      const response = await fetch(`http://localhost:8080/doctor/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove doctor");
      }

      // Update the doctors state
      setDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor.did !== id)
      );
    } catch (error) {
      console.error("Error removing doctor:", error.message);
    }
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [searchInput, setSearchInput] = useState("");

  // Function to handle search
  const handleSearch = (searchQuery) => {
    const filtered = doctors.filter(
      (doctor) =>
        doctor.dfname.toLowerCase().includes(searchQuery) ||
        doctor.dlname.toLowerCase().includes(searchQuery)
    );
    setFilteredDoctors(filtered);
  };

  // Event handler for search input change
  const handleSearchInputChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchInput(searchQuery);
    handleSearch(searchQuery);
  };

  const [filteredDoctors, setFilteredDoctors] = useState([]);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "25px",
        marginTop: "16px",
        height: "700px",
        overflowY: "auto",
        backgroundColor: "#f7f7f7",
      }}
    >
      <Grid container alignItems="center">
        <Grid item>
          <Typography
            variant="h5"
            sx={{ color: "black", marginTop: "15px" }}
            gutterBottom
          >
            Provider Management
          </Typography>
        </Grid>
        <Grid item>
          {/* Search Bar */}
          <TextField
            label="Search Providers"
            value={searchInput}
            onChange={handleSearchInputChange}
            variant="outlined"
            margin="normal"
            sx={{
              width: "200px",
              marginLeft: "10px",
              "& .MuiOutlinedInput-input": {
                padding: "8px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}></Grid>{" "}
        {/* Empty Grid item to push next content to the right */}
        <Grid item>
          <IconButton
            color="primary"
            onClick={openAddModal}
            style={{ marginLeft: "50px" }}
          >
            <AddBoxIcon style={{ fontSize: 35, color: "#4CAF50" }} />
          </IconButton>
        </Grid>
      </Grid>

      <Divider style={{ marginBottom: "16px", backgroundColor: "white" }} />

      {/* Table for Provider Information */}
      <TableContainer component={Paper} style={{ marginBottom: "16px" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="right">Specialty</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Remove</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? (searchInput ? filteredDoctors : doctors).slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : searchInput
              ? filteredDoctors
              : doctors
            ).map((doctor) => (
              <StyledTableRow key={doctor.did}>
                <StyledTableCell component="th" scope="row">
                  {doctor.dfname}
                </StyledTableCell>
                <StyledTableCell align="right">{doctor.dlname}</StyledTableCell>
                <StyledTableCell align="right">
                  {doctor.specialty}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={() => openModal(doctor)}
                    style={{
                      marginTop: "8px",
                      color: "#24a0ed",
                      borderColor: "#24a0ed",
                    }}
                  >
                    Edit
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemoveDoctor(doctor.did)}
                    style={{
                      marginTop: "8px",
                      color: "red",
                      borderColor: "red",
                    }}
                  >
                    Remove
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={5}
            count={doctors.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { "aria-label": "rows per page" },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Table>
      </TableContainer>

      {/* Edit Doctor Modal */}
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Provider
          </Typography>
          <TextField
            label="First Name"
            value={editedDoctor.dfname}
            onChange={(e) =>
              setEditedDoctor({ ...editedDoctor, dfname: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={editedDoctor.dlname}
            onChange={(e) =>
              setEditedDoctor({ ...editedDoctor, dlname: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Specialty"
            value={editedDoctor.specialty}
            onChange={(e) =>
              setEditedDoctor({ ...editedDoctor, specialty: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <Typography
            variant="body2"
            color="error"
            style={{ marginTop: "8px" }}
          >
            {errorMessage1}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditDoctor(editedDoctor.did)}
            style={{ marginTop: "8px" }}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>

      {/* Add Provider Modal */}
      <Modal open={isAddModalOpen} onClose={closeAddModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Provider
          </Typography>
          <TextField
            label="First Name"
            value={newDoctor.dfname}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, dfname: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={newDoctor.dlname}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, dlname: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Specialty"
            value={newDoctor.specialty}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, specialty: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <Typography
            variant="body2"
            color="error"
            style={{ marginTop: "8px" }}
          >
            {errorMessage}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddDoctor}
            style={{ marginTop: "8px", backgroundColor: "#4CAF50" }}
          >
            Add Provider
          </Button>
        </Box>
      </Modal>
    </Paper>
  );
};

export default DoctorManagement;
