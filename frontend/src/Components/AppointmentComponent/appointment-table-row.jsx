import { useState } from 'react';
import PropTypes from 'prop-types';
import React from 'react';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Snackbar, Alert, Select, MenuItem, RadioGroup, FormControlLabel, Radio } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Iconify from '../AppointmentStyle/iconify/iconify';
import Label from '../AppointmentStyle/label/label';


// ----------------------------------------------------------------------

export default function AppointmentTableRow({
  selected,
  appointmentId,
  patientName,
  doctorName,
  appointmentDate,
  appointmentTime,
  status,
  note,
  hasPaid,
  doctorId,
  patientId,
  handleClick,
  refreshAppointments
}) {
  const [open, setOpen] = useState(null);

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    setOpenDeleteDialog(true);

  };
  const handleDeleteConfirm = async () => {
    const token = localStorage.getItem('jwt_token');
    try {
      const response = await fetch(`http://localhost:8080/appointment/${appointmentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete appointment');
      }

      // Close the dialog and menu
      setOpenDeleteDialog(false);
      handleCloseMenu();

      // to refresh the appointments list
      refreshAppointments();
    } catch (error) {
      console.error('Error during the appointment deletion:', error);
    }
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };


  const getColor = (status) => {
    if (typeof status === 'boolean') {
      status = status ? 'Yes' : 'No';
    }

    if (status === 'Completed' || status === 'Yes') {
      return 'success';
    } else if (status === 'Canceled' || status === 'No') {
      return 'error';
    }
    switch (status) {
      case 'Scheduled':
        return 'info';
      default:
        return 'default';
    }
  };

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newDetails, setNewDetails] = useState({
    newDate: appointmentDate,
    newTime: appointmentTime,
    newStatus: status,
    newNote: note,
    newHasPaid: hasPaid,
    doctorId: doctorId,
    patientId: patientId,
    appointmentId: appointmentId,
  });

  const handleEditChange = (e) => {
    setNewDetails({ ...newDetails, [e.target.name]: e.target.value });
  };

  const handleEditConfirm = async () => {
    const token = localStorage.getItem('jwt_token');

    const combinedDateTime = `${newDetails.newDate}T${newDetails.newTime}:00`;

    if (!newDetails.doctorId || isNaN(newDetails.doctorId) || newDetails.doctorId <= 0) {
      alert('Invalid doctor ID. Please enter a valid ID.');
      return;
    }

    try {
      const updateResponse = await fetch(`http://localhost:8080/appointment/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'

        },
        body: JSON.stringify({
          appointmentId: appointmentId,
          patientId: newDetails.patientId,
          doctorId: newDetails.doctorId,
          appointmentDateTime: combinedDateTime,
          status: newDetails.newStatus,
          note: newDetails.newNote,
          hasPaid: newDetails.newHasPaid,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update appointment');
      }

      refreshAppointments();
      setIsEditMode(false);
      setUpdateSuccess(true);

    } catch (error) {
      console.error('Error during the appointment update:', error);
    }
  };


  const handleStatusChange = (event) => {
    setNewDetails({ ...newDetails, newStatus: event.target.value });
  };

  const handlePaymentChange = (event) => {
    setNewDetails({ ...newDetails, newHasPaid: event.target.value === 'Yes' });
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString();
  };

  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };


  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {appointmentId}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{patientName}</TableCell>
        <TableCell>{doctorName}</TableCell>
        <TableCell>{formatDate(appointmentDate)}</TableCell>
        <TableCell>{formatTime(appointmentDate)}</TableCell>

        <TableCell>
          <Label color={getColor(status)}>{status}</Label>
        </TableCell>
        <TableCell>{note}</TableCell>
        <TableCell align="center">
          <Label color={getColor(hasPaid)}>{hasPaid ? 'Yes' : 'No'}</Label>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={() => { handleCloseMenu(); setIsEditMode(true); }}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          <Button onClick={handleDeleteClick}>Delete</Button>
        </MenuItem>
      </Popover>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this appointment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isEditMode} onClose={() => setIsEditMode(false)}>
        <DialogTitle>Edit Appointment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="newDate"
            label="New Date"
            type="date"
            fullWidth
            value={newDetails.newDate}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="newTime"
            label="New Time"
            type="time"
            fullWidth
            value={newDetails.newTime}
            onChange={handleEditChange}
          />
          <Select
            name="newStatus"
            fullWidth
            value={newDetails.newStatus}
            onChange={handleStatusChange}
            margin="dense"
          >
            <MenuItem value="Scheduled">Scheduled</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Canceled">Canceled</MenuItem>
          </Select>
          <TextField
            margin="dense"
            name="newNote"
            label="New Note"
            fullWidth
            value={newDetails.newNote}
            onChange={handleEditChange}
          />
          <RadioGroup
            name="newHasPaid"
            value={newDetails.newHasPaid ? 'Yes' : 'No'}
            onChange={handlePaymentChange}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Paid" />
            <FormControlLabel value="No" control={<Radio />} label="Not Paid" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditMode(false)}>Cancel</Button>
          <Button onClick={handleEditConfirm}>Update</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={updateSuccess}
        autoHideDuration={6000}
        onClose={() => setUpdateSuccess(false)}
      >
        <Alert onClose={() => setUpdateSuccess(false)} severity="success">
          Appointment updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

AppointmentTableRow.propTypes = {
  handleClick: PropTypes.func,
  hasPaid: PropTypes.any,
  appointmentId: PropTypes.any,
  patientName: PropTypes.any,
  doctorName: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  note: PropTypes.string,
  appointmentDate: PropTypes.any,
  appointmentTime: PropTypes.any,
};