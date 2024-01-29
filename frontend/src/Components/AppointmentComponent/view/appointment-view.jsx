import { useEffect, useState } from "react";
import fetchAppointments from "../appointment-data-fetch";
import { fetchPatients, fetchDoctors } from "../appointment-data-fetch";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import Iconify from "../../AppointmentStyle/iconify";
import TableEmptyRows from "../table-emty-rows";
import TableNoData from "../table-no-data";
import AppointmentTableRow from "../appointment-table-row";
import AppointmentTableHead from "../appointment-table-head";
import AppointmentTableToolbar from "../appointment-table-toolbar";
import { emptyRows, applyFilter, getComparator } from "../utils";

import * as React from "react";
import DialogContentText from "@mui/material/DialogContentText";

export default function AppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("appointmentId");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openNewAppointmentDialog, setOpenNewAppointmentDialog] =
    useState(false);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    note: "",
    hasPaid: "no",
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const patients = await fetchPatients();
        const doctors = await fetchDoctors();
        setPatients(patients);
        setDoctors(doctors);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const appointments = await fetchAppointments();
        setAppointments(appointments);
      } catch (error) {
        console.error(error);
      }
    };
    getAppointments();
  }, []);

  const refreshAppointmentsList = async () => {
    try {
      const appointments = await fetchAppointments();
      setAppointments(appointments);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = appointments.map((n) => n.appointmentId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleSubmitNewAppointment = async (event) => {
    event.preventDefault();
    const appointmentDateTime = `${newAppointment.date}T${newAppointment.time}:00`;
    const appointmentData = {
      patientId: newAppointment.patientId,
      doctorId: newAppointment.doctorId,
      appointmentDateTime,
      status: "Scheduled",
      note: newAppointment.note,
      hasPaid: newAppointment.hasPaid === "yes",
    };
    const token = localStorage.getItem("jwt_token");

    try {
      const response = await fetch("http://localhost:8080/appointment/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create appointment: ${errorText}`);
      }
      setOpenNewAppointmentDialog(false);
      refreshAppointmentsList();
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  const handleNewAppointmentChange = (event) => {
    setNewAppointment({
      ...newAppointment,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: appointments,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const handleDeleteSelected = () => {
    setOpenDeleteDialog(true); // Open the confirmation dialog
  };

  const confirmDeleteSelected = async () => {
    const token = localStorage.getItem("jwt_token");

    try {
      for (let id of selected) {
        await fetch(`http://localhost:8080/appointment/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      // Refresh the appointments list after deletion
      const updatedAppointments = await fetchAppointments();
      setAppointments(updatedAppointments);
      setSelected([]); // Clear the selection
    } catch (error) {
      console.error("Error deleting appointments:", error);
    }
    setOpenDeleteDialog(false);
  };

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Appointments</Typography>

        <Button
          variant="contained"
          style={{ backgroundColor: "#4CAF50" }}
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setOpenNewAppointmentDialog(true)}
        >
          New Appointment
        </Button>
      </Stack>

      <Card>
        <AppointmentTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          handleDeleteSelected={handleDeleteSelected}
        />

        {/* Replace Scrollbar with a div */}
        <div style={{ overflow: "auto", maxHeight: "600px" }}>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <AppointmentTableHead
                order={order}
                orderBy={orderBy}
                rowCount={appointments.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: "appointmentId", label: "ID" },
                  { id: "patientName", label: "Patient" },
                  { id: "doctorName", label: "Provider" },
                  { id: "appointmentDate", label: "Appointment Date" },
                  { id: "appointmentTime", label: "Appointment Time" },
                  { id: "status", label: "Appointment Status" },
                  { id: "note", label: "Appointment Note" },
                  { id: "hasPaid", label: "Payment", align: "center" },
                  { id: "" },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <AppointmentTableRow
                      key={row.appointmentId}
                      appointmentId={row.appointmentId}
                      patientName={row.patientName}
                      doctorName={row.doctorName}
                      appointmentDate={row.appointmentDateTime}
                      appointmentTime={row.appointmentDateTime}
                      status={row.status}
                      note={row.note}
                      hasPaid={row.hasPaid}
                      doctorId={row.doctorId}
                      patientId={row.patientId}
                      selected={selected.indexOf(row.appointmentId) !== -1}
                      handleClick={(event) =>
                        handleClick(event, row.appointmentId)
                      }
                      refreshAppointments={refreshAppointmentsList}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, appointments.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirm Deletion"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete the selected appointments?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDeleteSelected} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openNewAppointmentDialog}
          onClose={() => setOpenNewAppointmentDialog(false)}
        >
          <DialogTitle>Create New Appointment</DialogTitle>
          <form onSubmit={handleSubmitNewAppointment}>
            <DialogContent>
              {/* Patient Selection */}

              <FormControl fullWidth margin="normal">
                <InputLabel>Patient</InputLabel>
                <Select
                  value={newAppointment.patientId}
                  onChange={handleNewAppointmentChange}
                  name="patientId"
                  label="Patient"
                >
                  {patients.map((patient) => (
                    <MenuItem key={patient.pid} value={patient.pid}>
                      {`${patient.pid} - ${patient.pFName} ${patient.pLName}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Doctor Selection */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Doctor</InputLabel>
                <Select
                  value={newAppointment.doctorId}
                  onChange={handleNewAppointmentChange}
                  name="doctorId"
                  label="Doctor"
                >
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor.did} value={doctor.did}>
                      {`${doctor.did} - ${doctor.dfname} ${doctor.dlname}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Date and Time Selection */}
              <Box display="block">
                <TextField
                  fullWidth
                  margin="dense"
                  type="date"
                  name="date"
                  label="Date"
                  value={newAppointment.date}
                  onChange={handleNewAppointmentChange}
                  sx={{ marginRight: 3 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  type="time"
                  name="time"
                  label="Time"
                  value={newAppointment.time}
                  onChange={handleNewAppointmentChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>

              {/* Note Section */}
              <TextField
                fullWidth
                margin="normal"
                multiline
                rows={4}
                name="note"
                label="Note"
                value={newAppointment.note}
                onChange={handleNewAppointmentChange}
              />

              {/* Payment Status */}
              <Typography marginY={2}>Payment Status:</Typography>
              <RadioGroup
                row
                name="hasPaid"
                value={newAppointment.hasPaid}
                onChange={handleNewAppointmentChange}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="Paid"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label="Not Paid"
                />
              </RadioGroup>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenNewAppointmentDialog(false)}
                color="secondary"
              >
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Create Appointment
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <TablePagination
          page={page}
          component="div"
          count={appointments.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
