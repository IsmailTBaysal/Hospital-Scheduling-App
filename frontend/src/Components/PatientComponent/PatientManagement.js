// PatientManagement.js
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

import { useTheme } from "@mui/material/styles";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import SearchBar from "./SearchBar";

function TablePaginationActions(props) {
  // For pagination
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const PatientManagement = () => {
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

  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    pFName: "",
    pLName: "",
    birthday: "",
    phoneNumber: "",
    insuranceProvider: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedPatient, setEditedPatient] = useState({
    pid: "",
    pFName: "",
    pLName: "",
    birthday: "",
    phoneNumber: "",
    insuranceProvider: "",
  });
  const [searchResults, setSearchResults] = useState(patients);
  const [userHasSearched, setUserHasSearched] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const phoneRegex = /\d\d\d-\d\d\d-\d\d\d\d/i;
  const [phoneMatch, setPhoneMatch] = useState(false);

  const openModal = (patient) => {
    setEditedPatient(patient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditedPatient({
      pid: "",
      pFName: "",
      pLName: "",
      birthday: "",
      phoneNumber: "",
      insuranceProvider: "",
    });
  };

  // Fetch patients from backend
  const fetchPatients = async () => {
    const token = localStorage.getItem("jwt_token");

    try {
      const response = await fetch("http://localhost:8080/patients", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error.message);
    }
  };

  // Call fetchPatients when the component mounts
  useEffect(() => {
    fetchPatients();
  }, []);

  function filterPatientData(searchTerm) {
    setUserHasSearched(true);
    let filteredResults;

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    if (lowerCaseSearchTerm === "") {
      filteredResults = patients;
      setUserHasSearched(false);
    } else {
      filteredResults = patients.filter((patient) => {
        const lowerCaseFirstName = patient.pFName.toLowerCase();
        const lowerCaseLastName = patient.pLName.toLowerCase();

        return (
          lowerCaseFirstName.includes(lowerCaseSearchTerm) ||
          lowerCaseLastName.includes(lowerCaseSearchTerm)
        );
      });
    }

    setSearchResults(filteredResults);
  }

  const handleAddPatient = async () => {
    const token = localStorage.getItem("jwt_token");

    try {
      const response = await fetch("http://localhost:8080/addPatient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPatient),
      });

      if (!response.ok) {
        throw new Error("Failed to add patient");
      }

      const addedPatient = await response.json();

      if (addedPatient.error === null) {
        setPatients([...patients, addedPatient]);
        setNewPatient({
          pFName: "",
          pLName: "",
          birthday: "",
          phoneNumber: "",
          insuranceProvider: "",
        });
      } else if (addedPatient.error.length > 0) {
        alert(addedPatient.error);
      }

      // Reset the newPatient state
    } catch (error) {
      console.error("Error adding patient:", error.message);
    }
  };

  const handleEditPatient = async () => {
    const token = localStorage.getItem("jwt_token");

    try {
      const response = await fetch(
        `http://localhost:8080/updatePatient/${editedPatient.pid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedPatient),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit patient");
      }

      const updatedPatient = await response.json();

      if (updatedPatient.error === null) {
        // Update the patients state
        setPatients((prevPatients) =>
          prevPatients.map((patient) =>
            patient.pid === editedPatient.pid ? updatedPatient : patient
          )
        );
      } else if (updatedPatient.error.length > 0) {
        alert(updatedPatient.error);
      }

      // Close the modal after successful edit
      closeModal();
    } catch (error) {
      console.error("Error editing patient:", error.message);
    }
  };

  const handleRemovePatient = async (id) => {
    const token = localStorage.getItem("jwt_token");

    try {
      const response = await fetch(
        `http://localhost:8080/deletePatient/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove patient");
      }

      // Update the patients state
      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient.pid !== id)
      );
    } catch (error) {
      console.error("Error removing patient:", error.message);
    }
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewPatient({
      pFName: "",
      pLName: "",
      birthday: "",
      phoneNumber: "",
      insuranceProvider: "",
    });
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - patients.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: "25px",
        marginTop: "16px",
        height: "700px",
        overflowY: "auto",
      }}
      sx={{ backgroundColor: "#f7f7f7" }}
    >
      <Grid container alignItems="center">
        <Grid item>
          <Typography
            variant="h5"
            sx={{ color: "black", marginTop: "15px" }}
            gutterBottom
          >
            Patient Management
          </Typography>
        </Grid>
        <Grid item>
          {/* Search Bar */}
          <SearchBar searchValueFunction={filterPatientData} />
        </Grid>
        <Grid item xs={12} sm={6}></Grid>{" "}
        {/* Empty Grid item to push next content to the right */}
        <Grid item></Grid>
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

      <Divider style={{ marginBottom: "16px" }} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="right">
                Birthdate (yyyy-mm-dd)
              </StyledTableCell>
              <StyledTableCell align="right">Phone Number</StyledTableCell>
              <StyledTableCell align="right">
                Insurance Provider
              </StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(userHasSearched
              ? rowsPerPage > 0
                ? searchResults.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : searchResults
              : rowsPerPage > 0
              ? patients.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : patients
            ).map((patient) => (
              <StyledTableRow key={patient.pid}>
                <StyledTableCell component="th" scope="row">
                  {patient.pFName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {patient.pLName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {patient.birthday}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {patient.phoneNumber}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {patient.insuranceProvider}
                </StyledTableCell>

                <StyledTableCell align="right">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => openModal(patient)}
                    style={{ marginTop: "8px" }}
                  >
                    Edit
                  </Button>
                </StyledTableCell>

                <StyledTableCell align="right">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemovePatient(patient.pid)}
                    style={{ marginTop: "8px", marginLeft: "8px" }}
                  >
                    Remove
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={5}
                count={patients.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* Edit Patient Modal */}
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
            Edit Patient
          </Typography>
          <TextField
            label="First Name"
            value={editedPatient.pFName}
            onChange={(e) =>
              setEditedPatient({ ...editedPatient, pFName: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={editedPatient.pLName}
            onChange={(e) =>
              setEditedPatient({ ...editedPatient, pLName: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Birthday"
            value={editedPatient.birthday}
            onChange={(e) =>
              setEditedPatient({ ...editedPatient, birthday: e.target.value })
            }
            fullWidth
            margin="normal"
            helperText={"Must be YYYY-MM-DD"}
          />

          <TextField
            label="Phone Number"
            value={editedPatient.phoneNumber}
            onChange={(e) =>
              setEditedPatient({
                ...editedPatient,
                phoneNumber: e.target.value,
              })
            }
            fullWidth
            margin="normal"
            helperText={"Must be xxx-xxx-xxxx"}
          />

          <TextField
            label="InsuranceProvider"
            value={editedPatient.insuranceProvider}
            onChange={(e) =>
              setEditedPatient({
                ...editedPatient,
                insuranceProvider: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditPatient(editedPatient.pid)}
            style={{ marginTop: "8px" }}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>

      <Divider style={{ margin: "16px 0" }} />

      {/* Add Patient Modal */}
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
            Add New Patient
          </Typography>
          <TextField
            label="First Name"
            value={newPatient.pFName}
            onChange={(e) =>
              setNewPatient({ ...newPatient, pFName: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={newPatient.pLName}
            onChange={(e) =>
              setNewPatient({ ...newPatient, pLName: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            value={newPatient.phoneNumber}
            onChange={(e) => {
              setNewPatient({ ...newPatient, phoneNumber: e.target.value });
            }}
            fullWidth
            margin="normal"
            helperText={"Must be xxx-xxx-xxxx"}
          />

          <TextField
            label="Birthday (yyyy-mm-dd)"
            value={newPatient.birthday}
            onChange={(e) =>
              setNewPatient({ ...newPatient, birthday: e.target.value })
            }
            fullWidth
            margin="normal"
            helperText={"Must be YYYY-MM-DD"}
          />

          <TextField
            label="InsuranceProvider"
            value={newPatient.insuranceProvider}
            onChange={(e) =>
              setNewPatient({
                ...newPatient,
                insuranceProvider: e.target.value,
              })
            }
            fullWidth
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddPatient}
            style={{ marginTop: "8px", backgroundColor: "#4CAF50" }}
          >
            Add Patient
          </Button>
        </Box>
      </Modal>
    </Paper>
  );
};

export default PatientManagement;
