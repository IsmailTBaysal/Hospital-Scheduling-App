import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PersonIcon from "@mui/icons-material/Person";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Link } from "@mui/material";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={RouterLink} to="/dashboard">
      <ListItemIcon>
        <DashboardIcon sx={{ fontSize: "35px", color: "#7637A0" }} />
      </ListItemIcon>
      <ListItemText>
        <Typography
          variant="h6"
          sx={{ color: "#000", textDecoration: "none" }} //
        >
          Dashboard
        </Typography>
      </ListItemText>
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/patient">
      <ListItemIcon>
        <PersonIcon sx={{ fontSize: "35px", color: "#EBB93E" }} />
      </ListItemIcon>
      <ListItemText>
        <Typography variant="h6" sx={{ color: "#000", textDecoration: "none" }}>
          Patients
        </Typography>
      </ListItemText>
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/doctor">
      <ListItemIcon>
        <Diversity1Icon sx={{ fontSize: "35px", color: "#98BC76" }} />
      </ListItemIcon>
      <ListItemText>
        <Typography variant="h6" sx={{ color: "#000", textDecoration: "none" }}>
          Providers
        </Typography>
      </ListItemText>
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/appointments">
      <ListItemIcon>
        <BookOnlineIcon sx={{ fontSize: "35px", color: "#710C10" }} />
      </ListItemIcon>
      <ListItemText>
        <Typography variant="h6" sx={{ color: "#000", textDecoration: "none" }}>
          Appointments
        </Typography>
      </ListItemText>
    </ListItemButton>
  </React.Fragment>
);
